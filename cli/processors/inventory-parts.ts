import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processInventoryParts = async () => {
  const inventoryParts = (await fetchRebrickableCSVData('inventory_parts'))
    .reduce((acc: any, part: any) => { // TODO: type these 'any's
      acc[part.inventoryId] = acc[part.inventoryId] || []
      acc[part.inventoryId].push({
        p: part.partNum,
        c: part.colorId,
        q: parseInt(part.quantity),
        s: part.isSpare == 't' ? 1 : 0
      })
      delete part.inventoryId
      return acc
    }, {})
  saveData('inventory_parts', inventoryParts)
  return inventoryParts
}
