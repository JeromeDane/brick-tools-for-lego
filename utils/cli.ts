import bricksetApi from './brickset-api'
import {processColors} from './processors/colors'
import {processElements} from './processors/elements'
import {processInventoryMinifigs} from './processors/inventory-minifigs'
import {processInventorySets} from './processors/inventories-sets'
import {processInventoryParts} from './processors/inventory-parts'
import {processMinifigs} from './processors/minifigs'
import {processParts} from './processors/parts'
import {processPartCategories} from './processors/part-categories'
import {processPartRelationships} from './processors/part-relationships'
import {processSets} from './processors/sets'
import {processThemes} from './processors/themes'

const run = async () => {
  const usageResults = await bricksetApi('getKeyUsageStats')
  console.log(`Brickset API key usage today: ${usageResults.apiKeyUsage[0]}\n`)
  await processColors()
  await processElements()
  await processPartRelationships()
  await processPartCategories()
  await processParts()
  await processInventoryMinifigs()
  await processInventoryParts()
  await processInventorySets()
  await processMinifigs()
  await processSets()
  await processThemes()
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
  //     path.join(__dirname, '../src/data/brickset/sets.json'),
  //     JSON.stringify(bricksetSets, null, 2)
  //   )
  //   if(result.sets.length == 500 && pageNumber < 200) await getSets(pageNumber + 1)
  // }
  // await getSets(24)
}

run()
