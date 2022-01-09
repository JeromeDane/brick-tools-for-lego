import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processInventorySets = async () => {
  const inventorySets = await fetchRebrickableCSVData('inventory_sets')
  saveData('inventory_sets', inventorySets)
  return inventorySets
}
