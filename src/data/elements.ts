import {useContext, useEffect, useMemo} from 'react'
import elementsData from './raw/elements.json'
import colors from './colors'
import {useGetPart, useParts} from './parts'
import type {Element, ElementJSON, Elements} from './types'
import elementCorrections from './element-corrections'
import {DataContext} from './DataProvider'

const elementsByPartColor : {[keys: string]: {[keys: string]: Element}} = {}


let previousElements: Elements
export const useElements = () => {
  const context = useContext(DataContext),
        getPart = useGetPart(),
        parts = useParts()
  useEffect(() => {
    if(!context.elements || previousElements !== context.elements) {
      previousElements = (elementsData as ElementJSON[]).reduce((acc, {elementId, partNum, colorId, setNumbers}) => {
        const element = {
          id: elementId,
          part: getPart(partNum),
          color: colors[colorId],
          setNumbers
        }
        acc[elementId] = element // TODO: do this without mutation
        elementsByPartColor[partNum] = elementsByPartColor[partNum] || {}
        elementsByPartColor[partNum][colorId] = element
        return acc
      }, {} as {[key: string]: Element})
      context.setElements(previousElements)
    }
  }, [parts, previousElements])
  return context.elements
}

export const useElement = (id: string) => {
  const elements = useElements()
  return elements ? elements[id] : undefined
}

export const useElementsAsList = () => {
  const elements = useElements()
  return useMemo(
    () => elements ? Object.keys(elements).map(id => elements[id]) : null,
    [elements]
  )
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
      (elementsByPartColor[partNum] && elementsByPartColor[partNum][colorId]) ||
      {
        id: '-1', // element not found
        part: getPart(partNum),
        color: colors[colorId]
      },
    [getPart, elements]
  )
}
