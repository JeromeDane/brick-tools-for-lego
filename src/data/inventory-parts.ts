import {useMemo} from 'react'
import inventoryPartsData from './raw/inventory_parts.json'
import {getPart} from './parts'
import type {Color} from './colors'
import type {Part, Element} from './types'
import colors from './colors'
import {getElementByPartAndColor} from './elements'

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

export const useInventoryParts = (inventoryId: string) => {
  return useMemo(() => {
    return data[inventoryId].map(inventoryPartData => ({
      part: getPart(inventoryPartData.p),
      color: colors[inventoryPartData.c],
      quantity: inventoryPartData.q,
      isSpare: inventoryPartData.s == 1,
      element: getElementByPartAndColor(inventoryPartData.p, inventoryPartData.c)
    }) as InventoryPart)
  }, [inventoryId])
}
