import camelize from 'camelcase-keys'
import fetch from 'cross-fetch'
import {mkdirSync, rmSync, writeFile, writeFileSync} from 'fs'
import path from 'path'
import {promisify} from 'util'

// TODO: figure out why this can't be done as an import
const csv = require('csvtojson')
const gUnzip = require('gunzip-file')
const writeFilePromise = promisify(writeFile)

const csvDir = path.join(__dirname, '../src/data/rebrickable')
const dataDir = path.join(__dirname, '../src/data/raw')
const tmpDir = path.join(__dirname, 'tmp')
mkdirSync(csvDir, {recursive: true})
mkdirSync(dataDir, {recursive: true})
mkdirSync(tmpDir, {recursive: true})

type RebrickableDataType = 'colors' |
                           'inventories' |
                           'parts' |
                           'sets' |
                           'themes'

export const fetchRebrickableCSVData = async (type: RebrickableDataType) => {
  await downloadRebrickableCsv(type)
  return await csvToJson(type)
}

const downloadGzAndExtract = async (url: string) =>
  new Promise(resolve => {
    const outFile = (url.match(/\/([^/]+)\.gz/) || '')[1]
    const gZipDest = path.join(tmpDir, outFile + '.gz')
    process.stdout.write('Downloading ' + outFile + '...')
    fetch(url)
      .then(x => x.arrayBuffer())
      .then(x => writeFilePromise(gZipDest, Buffer.from(x)))
      .then(() => {
        process.stdout.write(' extracting...')
        gUnzip(
          gZipDest,
          path.join(csvDir, outFile),
          () => {
            process.stdout.write(' done.\n')
            resolve(null)
          }
        )
      })
  })

const downloadRebrickableCsv = (type: string) => downloadGzAndExtract(
  `https://cdn.rebrickable.com/media/downloads/${type}.csv.gz`)

export const updateCsvData = async () => {
  await downloadRebrickableCsv('part_categories')
  await downloadRebrickableCsv('part_relationships')
  await downloadRebrickableCsv('elements')
  await downloadRebrickableCsv('minifigs')
  await downloadRebrickableCsv('inventory_parts')
  await downloadRebrickableCsv('inventory_sets')
  await downloadRebrickableCsv('inventory_minifigs')
  rmSync(tmpDir, {recursive: true})
}

export const saveData = (type: string, data: any) => {
  process.stdout.write(`Saving ${type} ...`)
  writeFileSync(
    path.join(dataDir, type + '.json'),
    JSON.stringify(data, null, 2))
  process.stdout.write(' done.\n')
}

export const csvToJson = (type: string) => {
  const csvFilePath = path.join(csvDir, type + '.csv')
  process.stdout.write('Opening CSV ' + csvFilePath + '\n')
  return csv().fromFile(csvFilePath).then(camelize)
}

const toKeyed = (input: any[], key: string) => input.reduce(
  (acc: any, element: any) => {
    acc[element[key]] = element
    return acc
  }, {})

export const buildJson = async () => {
  const partCategories = await csvToJson('part_categories'),
        partRelationships = await csvToJson('part_relationships'),
        elements = await csvToJson('elements'),
        minifigs = await csvToJson('minifigs'),
        inventoryParts = await csvToJson('inventory_parts').reduce((acc: any, part: any) => {
          acc[part.inventoryId] = acc[part.inventoryId] || []
          acc[part.inventoryId].push({
            p: part.partNum,
            c: part.colorId,
            q: parseInt(part.quantity),
            s: part.isSpare == 't' ? 1 : 0
          })
          delete part.inventoryId
          return acc
        }, {}),
        inventorySets = await csvToJson('inventory_sets'),
        inventoryMinifigs = await csvToJson('inventory_minifigs')

  saveData('part_categories', partCategories)
  saveData('part_categories-by-id', toKeyed(partCategories, 'id'))
  saveData('part_relationships', partRelationships)
  saveData('elements', elements.map((e: any) => ({
    i: e.elementId,
    p: e.partNum,
    c: e.colorId
  })))
  saveData('minifigs', minifigs)
  saveData('inventory_parts', inventoryParts)
  saveData('inventory_sets', inventorySets)
  saveData('inventory_minifigs', inventoryMinifigs)
}
