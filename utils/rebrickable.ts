import camelize from 'camelcase-keys'
import fetch from 'cross-fetch'
import {mkdirSync, rmSync, writeFile, writeFileSync} from 'fs'
import path from 'path';
import {promisify} from 'util'

const csv = require('csvtojson')
const gUnzip = require('gunzip-file')
const writeFilePromise = promisify(writeFile);

const csvDir = path.join(__dirname, '../data/rebrickable')
const dataDir = path.join(__dirname, '../app/data/raw')
const tmpDir = path.join(__dirname, 'tmp')
mkdirSync(csvDir, {recursive: true})
mkdirSync(dataDir, {recursive: true})
mkdirSync(tmpDir, {recursive: true})

const downloadGzAndExtract = async (url: string, ) =>
  new Promise(resolve => {
    const outFile = (url.match(/\/([^\/]+)\.gz/) || '')[1]
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

const saveData = (type: string, data: Object) => {
  process.stdout.write(`Saving ${type} ...`)
  writeFileSync(
    path.join(dataDir, type + '.json'),
    JSON.stringify(data, null, 2))
  process.stdout.write(` done.\n`)
}

const csvToJson = (type: string) =>
  csv()
    .fromFile(path.join(csvDir, type + '.csv'))
    .then(camelize)

const toKeyed = (input: any[], key: string) => input.reduce(
  (acc: any, element: any) => {
    acc[element[key]] = element
    return acc
  }, {})

export const buildJson = async () => {
  const themes = await csvToJson('themes'),
        colors = await csvToJson('colors'),
        colorDetails = await csvToJson('color-details'),
        partCategories = await csvToJson('part_categories'),
        parts = await csvToJson('parts'),
        partRelationships = await csvToJson('part_relationships'),
        elements = await csvToJson('elements'),
        sets = await csvToJson('sets'),
        minifigs = await csvToJson('minifigs'),
        inventories = await csvToJson('inventories'),
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

  themes.map((theme: any) => {
    theme.numSets = sets.reduce((num : number, set: any) =>
      num + (set.themeId == theme.id ? 1 : 0)
    , 0)
    return theme
  })

  saveData('themes', themes)
  saveData('themes-by-id', toKeyed(themes, 'id'))
  // Note: The normal colors.csv download lacks tons of details that
  // are in the table at https://rebrickable.com/colors/. To update,
  // copy and paste the table into a google spreadsheet, then delete
  // all fields except for ID,FirstYear,LastYear,LEGO,LDraw,BrickLink,BrickOwl
  // save as a CSV file in 'data/rebrickable/color-details.csv`
  // TODO: Automate scraping https://rebrickable.com/colors/
  saveData('colors', colors.map((color: any) => {
    const split = (input: string) => {
      const match = input && input.match(/^([^\[]+?)\s*\['(.+?)'/)
      return {
        id: match && match[1],
        name: match && match[2]
      }
    }
    const {
      firstYear,
      lastYear,
      lego,
      lDraw,
      brickLink,
      brickOwl
    } = colorDetails.find(({id}: any) => id == color.id) || {}
    return Object.assign(color, {
      firstYear: firstYear && parseInt(firstYear),
      lastYear: lastYear && parseInt(lastYear),
      lego: split(lego),
      lDraw: split(lDraw),
      brickLink: split(brickLink),
      brickOwl: split(brickOwl)
    })
  }))
  saveData('part_categories', partCategories)
  saveData('part_categories-by-id', toKeyed(partCategories, 'id'))
  saveData('parts', parts)
  saveData('part_relationships', partRelationships)
  saveData('elements', elements.map((e: any) => ({
    i: e.elementId,
    p: e.partNum,
    c: e.colorId
  })))
  saveData('sets', sets.map((set: any) => {
    const setNumSort = parseInt(set.setNum.replace(/-.+$/, ''))
    return Object.assign({}, set, {
      numParts: parseInt(set.numParts),
      year: parseInt(set.year),
      setNumSort: isNaN(setNumSort) ? Number.POSITIVE_INFINITY : setNumSort,
      inventories: inventories
        .filter(({setNum} : {setNum: string}) => setNum == set.setNum)
        .map(({id, version}: {id: string, version: string} ) => ({
          id,
          version,
          // parts: inventoryParts.filter(({inventoryId} : {inventoryId: string}) => inventoryId == id)
        }))
    })
  }))
  saveData('minifigs', minifigs)
  saveData('inventories', inventories)
  saveData('inventory_parts', inventoryParts)
  saveData('inventory_sets', inventorySets)
  saveData('inventory_minifigs', inventoryMinifigs)
}
