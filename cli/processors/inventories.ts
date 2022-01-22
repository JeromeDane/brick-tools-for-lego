import {fetchRebrickableCSVData, saveData} from '../rebrickable'

let processedInventories: any // TODO: fix typing

export const processInventories = async () => {
  const inventories = await fetchRebrickableCSVData('inventories')
  processedInventories = inventories
  saveData('inventories', inventories)
  return inventories
}

export const getInventories = async () => processedInventories || await processInventories()
