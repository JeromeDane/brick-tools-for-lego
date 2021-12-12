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
  height: number,
  subCategory: string
}

const sizeRegex = /(\d+)\s?x\s?(\d+)(\s?x\s?(\d+)([^\/]|$))?/

const getSubCategory = ({name, partCatId} : PartData) => {
  switch(partCatId) {
    case '14': // Plates
      if(name.match(/corner/i)) return 'Corner'
    case '9': // Plates Special
      if(name.match(/Bar|Handle/i)) return 'Bar'
      if(name.match(/Bracket/i)) return 'Bracket'
      if(name.match(/Clip/i)) return 'Clip'
      if(name.match(/Jumper/i)) return 'Jumper'
      if(name.match(/pin\sHole\s(on\s)Top/i)) return 'Pin Hole Top'
      if(name.match(/Pin\sHole/i)) return 'Pin Hole'
      if(name.match(/Rail/i)) return 'Rail'
      if(name.match(/Tooth/i)) return 'Tooth'
    case '21': // Plates Round Curved and Dishes
      if(name.match(/Axle\sHole/i)) return 'Axle Hole'
      if(name.match(/Boat\sStud/i)) return 'Boat Stud'
      if(name.match(/Radar/i)) return 'Radar'
    case '31': // String, Bands and Reels
      if(name.match(/Chain/i)) return 'Chain'
      if(name.match(/String.+Studs.+Grip/i)) return 'Studded String with Grips'
    case '15': // Tiles Special
      if(name.match(/Clip/i)) return 'Clip'
      if(name.match(/Grille/i)) return 'Grille'
      if(name.match(/Gold\sBar/i)) return 'Gold Bar'
      if(name.match(/Hollow\sBar/i)) return 'Hollow Bar'
      if(name.match(/Inverted/i)) return 'Inverted'
    default: return ''
  }
}

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
      height,
      subCategory: getSubCategory(partData)
    } as Part
    return acc
  },
  {}
)
