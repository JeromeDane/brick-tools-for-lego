import inventoryPartsData from './raw/inventory_parts.json'
import {getPart, Part} from './parts'
import type {Color} from './colors'
import colors from './colors'
import {getElementByPartAndColor, Element} from './elements'

type InventoryPartData = {
  p: string, // partNum
  c: string, // string
  q: number, // quantity
  s: number // isSpare
}

export type InventoryPart = {
  part: Part,
  color: Color,
  quantity: number,
  isSpare: boolean,
  element: Element
}

const data = inventoryPartsData as {[key: string]: InventoryPartData[]}

export default Object.keys(data).reduce((acc: {[id: string]: InventoryPart[]}, id: string) => {
  acc[id] = data[id].map(inventoryPartData => ({
    part: getPart(inventoryPartData.p),
    color: colors[inventoryPartData.c],
    quantity: inventoryPartData.q,
    isSpare: inventoryPartData.s == 1,
    element: getElementByPartAndColor(inventoryPartData.p, inventoryPartData.c)
  }) as InventoryPart)
  return acc
}, {})
