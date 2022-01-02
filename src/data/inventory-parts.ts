import {useMemo} from 'react'
import inventoryPartsData from './raw/inventory_parts.json'
import {useParts} from './parts'
import type {InventoryPart, InventoryParts} from './types'
import colors from './colors'
import {useGetElementByPartAndColor} from './elements'

type InventoryPartData = {
  p: string, // partNum
  c: string, // string
  q: number, // quantity
  s: number // isSpare
}

const data = inventoryPartsData as {[key: string]: InventoryPartData[]}

export const useInventoryParts = (inventoryId: string) => {
  const parts = useParts(),
        getElementByPartAndColor = useGetElementByPartAndColor()
  return useMemo(() => {
    return parts
      ? data[inventoryId]?.map(inventoryPartData => ({
        part: parts[inventoryPartData.p],
        color: colors[inventoryPartData.c],
        quantity: inventoryPartData.q,
        isSpare: inventoryPartData.s == 1,
        element: getElementByPartAndColor(inventoryPartData.p, inventoryPartData.c)
      }) as InventoryPart) || [] as InventoryParts
      : null
  }, [inventoryId, parts])
}
