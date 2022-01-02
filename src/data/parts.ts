import partsData from './raw/parts.json'
import {getPartCategory} from './part-categories'
import {Part, PartData} from './types'
import {getSubCategory} from './part-subcategories'
import {useContext, useEffect, useMemo} from 'react'
import {DataContext} from './DataProvider'
import {useElementsAsList} from './elements'

const sizeRegex = /(\d+)\s?x\s?(\d+)(\s?x\s?(\d+)([^/]|$))?/

const processedParts = (partsData as PartData[]).reduce(
  (acc: {[key: string]: Part}, partData: PartData) => {
    const size = partData.name.match(sizeRegex),
          width = size ? parseInt(size[1].padStart(2) < size[2].padStart(2) ? size[1] : size[2]) : 0,
          length = size ? parseInt((size[1].padStart(2) > size[2].padStart(2) ? size[1] : size[2])) : 0,
          heightParsed = parseInt(size ? size[4] : ''),
          height = isNaN(heightParsed) ? 0 : heightParsed
    acc[partData.partNum] = {
      ...partData,
      nameSort: partData.name
        .replace(sizeRegex, '  ')
        .replace(/with|w\//, ''),
      width,
      length,
      height,
      category: getPartCategory(partData.partCatId),
      subCategory: getSubCategory(partData),
      colors: []
    } as Part
    return acc
  },
  {}
)

export const partsList = Object.keys(processedParts).map(partNum => processedParts[partNum])

export default processedParts

export const getPart = (partNum: string) =>
  processedParts[partNum] || {
    partNum: '-1',
    name: 'unknown part',
    partCatId: '',
    partMaterial: '',
    nameSort: '',
    width: 0,
    length: 0,
    height: 0,
    category: {},
    subCategory: '',
    colors: []
  }

export const useParts = () => {
  const dataContext = useContext(DataContext),
        elements = useElementsAsList()
  useEffect(
    () => {
      if(!dataContext.parts) {
        elements?.forEach(element => {
          processedParts[element.part.partNum].colors.push(element.color)
        })
        dataContext.setParts(processedParts)
      }
    },
    []
  )
  return dataContext.parts
}

export const usePart = (partNum: string) => {
  const parts = useParts()
  return parts ? parts[partNum] : undefined
}

export const usePartsAsLists = () => {
  const parts = useParts()
  return useMemo(
    () => parts
      ? Object.keys(parts).map(partNum => parts[partNum])
      : [],
    [parts]
  )
}

export const useGetPart = () => {
  const parts = useParts()
  return useMemo(
    () => (partNum: string) => parts ? parts[partNum] : undefined,
    [parts]
  )
}
