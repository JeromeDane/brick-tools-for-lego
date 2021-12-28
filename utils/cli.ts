import { json } from 'stream/consumers'
import {buildJson, updateCsvData} from './rebrickable'
import bricksetApi from './brickset-api'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const run = async () => {
  const usageResults = await bricksetApi('getKeyUsageStats')
  console.log(`Brickset API key usage: \n${JSON.stringify(usageResults.apiKeyUsage, null, 2)}\n`)
  if(argv.updateData) await updateCsvData()
  await buildJson()
}

run()
