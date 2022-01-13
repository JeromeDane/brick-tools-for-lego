import {ElementJSON} from '../../src/data/types'
import {fetchRebrickableCSVData, saveData} from '../rebrickable'

let processedElements: ElementJSON[]

export const processElements = async () => {
  if(processedElements) return processedElements
  const elements: ElementJSON[] = await fetchRebrickableCSVData('elements')
  saveData('elements', elements)
  processedElements = elements
  return elements
}

export const getElements = async () => processedElements || processElements()
