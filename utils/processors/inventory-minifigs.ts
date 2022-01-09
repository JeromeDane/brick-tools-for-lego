import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processInventoryMinifigs = async () => {
  const inventoryMinifigs = await fetchRebrickableCSVData('inventory_minifigs')
  saveData('inventory_minifigs', inventoryMinifigs)
  return inventoryMinifigs
}
