import partsData from './raw/parts.json'
import {getPartCategory} from './part-categories'
import {Part, PartData} from './types'
import {getSubCategory} from './part-subcategories'

const sizeRegex = /(\d+)\s?x\s?(\d+)(\s?x\s?(\d+)([^/]|$))?/

const parts = (partsData as PartData[]).reduce(
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

export const partsList = Object.keys(parts).map(partNum => parts[partNum])

export default parts

export const getPart = (partNum: string) =>
  parts[partNum] || {
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
