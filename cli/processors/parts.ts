import {ElementJSON, PartJSON} from '../../src/data/types'
import {fetchRebrickableCSVData, saveData} from '../rebrickable'
import {getElements} from './elements'

export const processParts = async () => {
  const partColors = (await getElements()).reduce((acc, element: ElementJSON) => {
          acc[element.partNum] = acc[element.partNum] || []
          acc[element.partNum].push(element.colorId)
          return acc
        }, {} as {[key: string]: string[]}),
        parts: PartJSON[] = await fetchRebrickableCSVData('parts')
  saveData('parts', parts.map(part => {
    part.colorIds = partColors[part.partNum] || []
    return part
  }))
}
