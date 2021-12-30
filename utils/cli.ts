import {buildJson, updateCsvData} from './rebrickable'
import {readFileSync} from 'fs'
import bricksetApi from './brickset-api'
import path from 'path'
import yargs from 'yargs/yargs'

// TODO: figure out why this can't be done as an import
const {hideBin} = require('yargs/helpers'),
      argv = yargs(hideBin(process.argv)).argv

const run = async () => {
  const usageResults = await bricksetApi('getKeyUsageStats')
  console.log(`Brickset API key usage: \n${JSON.stringify(usageResults.apiKeyUsage, null, 2)}\n`)
  // process.exit(0)
  if(argv.updateData) await updateCsvData()
  await buildJson()
  const bricksetSets = JSON.parse(
    readFileSync(path.join(__dirname, '../data/brickset/sets.json')).toString()
  )
  console.log(Object.keys(bricksetSets).length, 'sets currently loaded')
  // process.exit(0)
  // async function getSets(pageNumber: number) {
  //   console.log('Fetching Brickset sets page ' + pageNumber)
  //   const result = await bricksetApi('getSets', {
  //     params: JSON.stringify({
  //       year: (new Array((new Date()).getFullYear() + 1 - 1962)).fill(0).map((year, i) => (new Date()).getFullYear() + 1 - i).join(','),
  //       orderBy: 'yearFromDESC',
  //       extendedData: 1,
  //       pageSize: 500,
  //       pageNumber
  //     })
  //   })
  //   console.log('Loaded', result.sets.length, 'sets')
  //   result.sets.forEach((set: any) => {
  //     delete set.collection
  //     bricksetSets[set.number + '-' + set.numberVariant] = set
  //   })
  //   writeFileSync(
  //     path.join(__dirname, '../data/brickset/sets.json'),
  //     JSON.stringify(bricksetSets, null, 2)
  //   )
  //   if(result.sets.length == 500 && pageNumber < 200) await getSets(pageNumber + 1)
  // }
  // await getSets(24)
}

run()
