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
                           'inventory_parts' |
                           'minifigs' |
                           'parts' |
                           'part_categories' |
                           'part_relationships' |
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
  await downloadRebrickableCsv('elements')
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

export const buildJson = async () => {
  const elements = await csvToJson('elements'),
        inventorySets = await csvToJson('inventory_sets'),
        inventoryMinifigs = await csvToJson('inventory_minifigs')

  saveData('elements', elements.map((e: any) => ({
    i: e.elementId,
    p: e.partNum,
    c: e.colorId
  })))
  saveData('inventory_sets', inventorySets)
  saveData('inventory_minifigs', inventoryMinifigs)
}
