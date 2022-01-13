import {fetchRebrickableCSVData, saveData} from '../rebrickable'

let processedElements: any

export const processElements = async () => {
  if(processedElements) return processElements
  const elements = await fetchRebrickableCSVData('elements')
  saveData('elements', elements)
  processedElements = elements
  return elements
}
