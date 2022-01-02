import elementsData from './raw/elements.json'
import type {Color} from './colors'
import type {Part} from './parts'
import colors from './colors'
import {getPart} from './parts'
import elementCorrections from './element-corrections'

type ElementData = {
  i: string, // elementId
  p: string, // partNum
  c: string // colorId
}

export type Element = {
  id: string,
  part: Part,
  color: Color
}

const partColors : {[keys: string]: {[keys: string]: Element}} = {}

export const elements = (elementsData as ElementData[]).reduce((acc, {i, p, c}) => {
  const part = getPart(p),
        color = colors[c]
  part.colors.push(color)
  const element = {
    id: i,
    part,
    color
  }
  acc[i] = element
  partColors[p] = partColors[p] || {}
  partColors[p][c] = element
  return acc
}, {} as {[key: string]: Element})

export const getElementByPartAndColor = (partNum: string, colorId: string) =>
  (elementCorrections[partNum] && elementCorrections[partNum][colorId] && elements[elementCorrections[partNum][colorId]]) ||
  (partColors[partNum] && partColors[partNum][colorId]) ||
  {
    id: '-1', // element not found
    part: getPart(partNum),
    color: colors[colorId]
  }
