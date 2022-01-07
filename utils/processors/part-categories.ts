import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processPartCategories = async () => {
  const partCategories = await fetchRebrickableCSVData('part_categories')
  saveData('part_categories', partCategories)
  return partCategories
}
