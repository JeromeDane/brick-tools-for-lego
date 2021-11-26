import camelize from 'camelcase-keys'
import fetch from 'cross-fetch'
import {mkdirSync, rmSync, writeFile, writeFileSync} from 'fs'
import path from 'path';
import {promisify} from 'util'

const csv = require('csvtojson')
const gUnzip = require('gunzip-file')
const writeFilePromise = promisify(writeFile);

const dataDir = path.join(__dirname, '../data/rebrickable')
const tmpDir = path.join(__dirname, 'tmp')
mkdirSync(tmpDir, {recursive: true})
mkdirSync(dataDir, {recursive: true})

const downloadGzAndExtract = async (url: string, ) =>
  new Promise(resolve => {
    const gZipDest = path.join(tmpDir, 'parts.csv.gz')
    const outFile = (url.match(/\/([^\/]+)\.gz/) || '')[1]
    process.stdout.write('Downloading ' + outFile + '...')
    fetch(url)
      .then(x => x.arrayBuffer())
      .then(x => writeFilePromise(gZipDest, Buffer.from(x)))
      .then(() => {
        process.stdout.write(' extracting...')
        gUnzip(
          gZipDest,
          path.join(dataDir, outFile),
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
  await downloadRebrickableCsv('themes')
  await downloadRebrickableCsv('colors')
  await downloadRebrickableCsv('part_categories')
  await downloadRebrickableCsv('parts')
  await downloadRebrickableCsv('part_relationships')
  await downloadRebrickableCsv('elements')
  await downloadRebrickableCsv('sets')
  await downloadRebrickableCsv('minifigs')
  await downloadRebrickableCsv('inventories')
  await downloadRebrickableCsv('inventory_parts')
  await downloadRebrickableCsv('inventory_sets')
  await downloadRebrickableCsv('inventory_minifigs')
  rmSync(tmpDir, {recursive: true})
}

const saveData = (type: string, data: Object) =>
  writeFileSync(
    path.join(__dirname, `../app/data/${type}.json`),
    JSON.stringify(data, null, 2))

const csvToJson = (type: string) =>
  csv()
    .fromFile(path.join(dataDir, type + '.csv'))
    .then(camelize)

export const buildJson = async () => {
  const themes = await csvToJson('themes'),
        colors = await csvToJson('colors'),
        partCategories = await csvToJson('part_categories'),
        parts = await csvToJson('parts'),
        partRelationships = await csvToJson('part_relationships'),
        elements = await csvToJson('elements'),
        sets = await csvToJson('sets'),
        minifigs = await csvToJson('minifigs'),
        inventories = await csvToJson('inventories'),
        inventoryParts = await csvToJson('inventory_parts'),
        inventorySets = await csvToJson('inventory_sets'),
        inventoryMinifigs = await csvToJson('inventory_minifigs')

  themes.map((theme: any) => {
    theme.numSets = sets.reduce((num : number, set: any) =>
      num + (set.themeId == theme.id ? 1 : 0)
    , 0)
    return theme
  })

  saveData('themes', themes)
  saveData('colors', colors)
  saveData('part_categories', partCategories)
  saveData('parts', parts)
  saveData('part_relationships', partRelationships)
  saveData('elements', elements)
  saveData('sets', sets)
  saveData('minifigs', minifigs)
  saveData('inventories', inventories)
  saveData('inventory_parts', inventoryParts)
  saveData('inventory_sets', inventorySets)
  saveData('inventory_minifigs', inventoryMinifigs)
}
