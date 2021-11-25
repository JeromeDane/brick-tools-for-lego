import fetch from 'cross-fetch'
import {mkdirSync, rmSync, writeFile} from 'fs'
import path from 'path';
import {promisify} from 'util'

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
