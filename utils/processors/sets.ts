import {fetchRebrickableCSVData, saveData} from '../rebrickable'
import {processInventories} from './inventories'
import type {Sets} from '../../src/data/types'

let processedSets: Sets

export const processSets = async (): Promise<Sets> => {
  const inventories = await processInventories(),
        sets = (await fetchRebrickableCSVData('sets'))
          .map((set: any) => {
            const setNumSort = parseInt(set.setNum.replace(/-.+$/, ''))
            return Object.assign({}, set, {
              numParts: parseInt(set.numParts),
              year: parseInt(set.year),
              setNumSort: isNaN(setNumSort) ? Number.POSITIVE_INFINITY : setNumSort,
              inventories: inventories
                .filter(({setNum} : {setNum: string}) => setNum == set.setNum)
                .map(({id, version}: {id: string, version: string}) => ({
                  id,
                  version
                  // parts: inventoryParts.filter(({inventoryId} : {inventoryId: string}) => inventoryId == id)
                }))
            })
          })
  saveData('sets', sets)
  processedSets = sets
  return sets
}

export const getSets = async () => processedSets || processSets()
