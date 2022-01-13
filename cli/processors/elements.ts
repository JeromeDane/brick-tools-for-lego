import {fetchRebrickableCSVData, saveData} from '../rebrickable'

export const processElements = async () => {
  const elements = await fetchRebrickableCSVData('elements')
  saveData('elements', elements.map((e: any) => ({
    i: e.elementId,
    p: e.partNum,
    c: e.colorId
  })))
  return elements
}
