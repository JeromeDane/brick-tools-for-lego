import {useContext, useEffect} from 'react'
import elementsData from './raw/elements.json'
import colors from './colors'
import {getPart} from './parts'
import type {Element, Elements} from './types'
import elementCorrections from './element-corrections'
import {DataContext} from './DataProvider'

type ElementData = {
  i: string, // elementId
  p: string, // partNum
  c: string // colorId
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
  acc[i] = element // TODO: do this without mutation
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

export const useElements = () => {
  const context = useContext(DataContext)
  useEffect(() => {
    if(!context.elements) context.setElements(elements as Elements)
  }, [elements])
  return context.elements
}

export const useElement = (id: string) => {
  const elementsFromContext = useElements()
  return elementsFromContext
    ? elementsFromContext[id]
    : undefined
}

export const useElementByPartAndColor = (partNum: string, colorId: string) =>

  (elementCorrections[partNum] && elementCorrections[partNum][colorId] && elements[elementCorrections[partNum][colorId]]) ||
  (partColors[partNum] && partColors[partNum][colorId]) ||
  {
    id: '-1', // element not found
    part: getPart(partNum),
    color: colors[colorId]
  }
