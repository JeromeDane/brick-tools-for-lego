import partsData from './parts.json'

type PartData = {
  partNum: string,
  name: string,
  partCatId: string,
  partMaterial: string
}

export interface Part extends PartData {
  nameSort: string,
  width: number,
  length: number,
  height: number
}

const sizeRegex = /(\d+)\s?x\s?(\d+)(\s?x\s?(\d+)([^\/]|$))?/

export default (partsData as PartData[]).reduce(
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
      height
    } as Part
    return acc
  },
  {}
)
