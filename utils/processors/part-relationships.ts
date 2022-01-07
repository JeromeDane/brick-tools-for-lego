import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processPartRelationships = async () => {
  const partRelationships = await fetchRebrickableCSVData('part_relationships')
  saveData('part_relationships', partRelationships)
  return partRelationships
}
