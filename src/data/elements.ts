import {useContext, useEffect, useMemo} from 'react'
import elementsData from './raw/elements.json'
import {useParts} from './parts'
import type {Element, Elements} from './types'
import {DataContext} from './DataProvider'

const elementsByPartColor : {[keys: string]: {[keys: string]: Element}} = {}

let previousElements: Elements
export const useElements = () => {
  const context = useContext(DataContext),
        parts = useParts()
  useEffect(() => {
    if(!context.elements || previousElements !== context.elements) {
      previousElements = (elementsData as Element[]).reduce((acc, element) => {
        acc[element.id] = element // TODO: do this without mutation
        elementsByPartColor[element.partNum] = elementsByPartColor[element.partNum] || {}
        elementsByPartColor[element.partNum][element.colorId] = element
        return acc
      }, {} as {[key: string]: Element})
      context.setElements(previousElements)
    }
  }, [parts, previousElements])
  return context.elements
}

export const useElementsAsList = () => {
  const elements = useElements()
  return useMemo(
    () => elements ? Object.keys(elements).map(id => elements[id]) : null,
    [elements]
  )
}

export const useGetElementByPartAndColor = () => {
  const elements = useElements()
  return useMemo(
    () => (partNum: string, colorId: string) =>
      (elementsByPartColor[partNum] && elementsByPartColor[partNum][colorId]),
    [elements]
  )
}
