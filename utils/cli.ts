import {logTodaysAPIUsage, updateSetsData} from './brickset-api'
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
  await logTodaysAPIUsage()
  await updateSetsData()
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
}

run()
