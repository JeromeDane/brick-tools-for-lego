import {useContext, useEffect, useMemo} from 'react'
import elementsData from './raw/elements.json'
import colors from './colors'
import {getPart, useGetPart} from './parts'
import type {Element, Elements} from './types'
import elementCorrections from './element-corrections'
import {DataContext} from './DataProvider'

type ElementData = {
  i: string, // elementId
  p: string, // partNum
  c: string // colorId
}

const partColors : {[keys: string]: {[keys: string]: Element}} = {}

const parseElements = (): Elements => (elementsData as ElementData[]).reduce((acc, {i, p, c}) => {
  const part = getPart(p),
        color = colors[c]
  part.colors.push(color)
  const element = {
    id: i,
    part,
    color
  }
  acc[i] = element // TODO: do this without mutation
  partColors[p] = partColors[p] || {}
  partColors[p][c] = element
  return acc
}, {} as {[key: string]: Element})

let previousElements: Elements
export const useElements = () => {
  const context = useContext(DataContext)
  useEffect(() => {
    if(previousElements !== context.elements) {
      previousElements = parseElements()
      context.setElements(previousElements)
    }
  }, [])
  return context.elements
}

export const useElement = (id: string) => {
  const elementsFromContext = useElements()
  return elementsFromContext
    ? elementsFromContext[id]
    : undefined
}

export const useGetElementByPartAndColor = () => {
  const getPart = useGetPart(),
        elements = useElements()
  return useMemo(
    () => (partNum: string, colorId: string) =>
      (elementCorrections[partNum] &&
        elementCorrections[partNum][colorId] &&
        elements && elements[elementCorrections[partNum][colorId]]
      ) ||
      (partColors[partNum] && partColors[partNum][colorId]) ||
      {
        id: '-1', // element not found
        part: getPart(partNum),
        color: colors[colorId]
      },
    [getPart, elements]
  )
}
