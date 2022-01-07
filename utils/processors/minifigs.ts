import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processMinifigs = async () => {
  const minifigs = await fetchRebrickableCSVData('minifigs')
  saveData('minifigs', minifigs)
  return minifigs
}
