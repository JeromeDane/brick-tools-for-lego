import {Element, PartJSON} from '../../src/data/types'
import {fetchRebrickableCSVData, saveData} from '../rebrickable'
import {getColors} from './colors'
import {getElements} from './elements'

export const processParts = async () => {
  const colorIds = getColors().map(({id}: {id: string}) => id),
        partColors = (await getElements()).reduce((acc, element: Element) => {
          acc[element.partNum] = acc[element.partNum] || []
          if(acc[element.partNum].indexOf(element.colorId) < 0)
            acc[element.partNum].push(element.colorId)
          return acc
        }, {} as {[key: string]: string[]}),
        parts: PartJSON[] = await fetchRebrickableCSVData('parts')
  saveData('parts', parts.map(part => {
    part.colorIds = (partColors[part.partNum] || [])
      .sort((a: string, b: string) =>
        colorIds.indexOf(a) > colorIds.indexOf(b)
          ? 1
          : colorIds.indexOf(a) < colorIds.indexOf(b)
            ? -1
            : 0
      )
    return part
  }))
}
