import {ElementJSON} from '../../src/data/types'
import {fetchRebrickableCSVData, saveData} from '../rebrickable'
import elementCorrections from '../../src/data/element-corrections'
import {getInventories} from './inventories'
import {getInventoryParts} from './inventory-parts'

const cliProgress = require('cli-progress')

const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

let processedElements: ElementJSON[]

const elementsByPartColor : {[keys: string]: {[keys: string]: Element}} = {}

export const processElements = async () => {
  if(processedElements) return processedElements
  const elements: ElementJSON[] = (await fetchRebrickableCSVData('elements'))
    .map((e: any) => {
      elementsByPartColor[e.partNum] = elementsByPartColor[e.partNum] || {}
      elementsByPartColor[e.partNum][e.colorId] = Object.assign(e, {setNumbers: []})
      return elementsByPartColor[e.partNum][e.colorId]
    })
  const inventories = await getInventories(),
        inventoryParts = await getInventoryParts()
  console.log('Detecting element set usage ...')
  progress.start(inventories.length, 0)
  inventories.forEach(({id, setNum}: any, i: number) => {
    progress.update(i + 1)
    inventoryParts[id]?.forEach(({p, c}: {p: string, c: string}) => {
      const e: any = (elementsByPartColor[p] && elementsByPartColor[p][c])
      if(e && e.partNum == p && e.colorId == c && e.setNumbers.indexOf(setNum) < 0) {
        e.setNumbers.push(setNum)
      }
    })
  })
  progress.stop()
  saveData('elements', elements)
  processedElements = elements
  return elements
}

export const getElements = async () => processedElements || processElements()
