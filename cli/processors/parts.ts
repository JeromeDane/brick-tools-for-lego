import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processParts = async () => {
  const parts = await fetchRebrickableCSVData('parts')
  saveData('parts', parts)
}
