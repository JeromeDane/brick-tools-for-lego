import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processInventories = async () => {
  const inventories = await fetchRebrickableCSVData('inventories')
  saveData('inventories', inventories)
  return inventories
}
