import partsData from './raw/parts.json'
import type {Color} from './colors'

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
  subCategory: string,
  colors: Color[]
}

const sizeRegex = /(\d+)\s?x\s?(\d+)(\s?x\s?(\d+)([^\/]|$))?/

const getSubCategory = ({name, partCatId} : PartData) : string => {
  switch(partCatId) {
    case '3': // Bricks Sloped
      if(name.match(/Inverted/i)) return 'Inverted'
      break
      case '5': // "Bricks Special
      if(name.match(/Bar|Handle/i)) return 'Bar'
      if(name.match(/Clip/i)) return 'Clip'
      if(name.match(/Headlight/i)) return 'Headlight'
      if(name.match(/Masonry/i)) return 'Masonry'
      if(name.match(/Studs.+(1|one)\sSide/i)) return 'SNOT'
      if(name.match(/Studs.+(2|two)\sSide/i)) return 'SNOT, 2 sided'
      if(name.match(/Studs.+(3|three)\sSide/i)) return 'SNOT, 3 sided'
      if(name.match(/Studs.+(4|four)\sSide/i)) return 'SNOT, 4 sided'
      break
    case '7': // Containers
      if(name.match(/Cupboard/i)) return 'Cupboard'
      if(name.match(/Drawer/i)) return 'Drawer'
      break
    case '27': // Minifig Accessories
      if(name.match(/Cup/i)) return 'Cup'
      if(name.match(/Flame/i)) return 'Flame'
      if(name.match(/Footwear/i)) return 'Footwear'
      if(name.match(/Gun/i)) return 'Gun'
      if(name.match(/Pan/i)) return 'Pan'
       break;
    case '14': // Plates
      if(name.match(/Corner/i)) return 'Corner'
      break
    case '9': // Plates Special
      if(name.match(/Bar|Handle/i)) return 'Bar'
      if(name.match(/Bracket.+Inverted/i)) return 'Bracket Inverted'
      if(name.match(/Bracket.+Pin.+Bottom/i)) return 'Bracket Pin Bottom'
      if(name.match(/Bracket.+Vertical.+Studs/i)) return 'Bracket Vertical Studs'
      if(name.match(/Bracket/i)) return 'Bracket'
      if(name.match(/Clip/i)) return 'Clip'
      if(name.match(/Jumper/i) && name.match(/Round/i)) return 'Jumper Round'
      if(name.match(/Jumper/i)) return 'Jumper'
      if(name.match(/pin\sHole\s(on\s)Top/i)) return 'Pin Hole Top'
      if(name.match(/Pin\sHole/i)) return 'Pin Hole'
      if(name.match(/Rail/i)) return 'Rail'
      if(name.match(/Tooth/i)) return 'Tooth'
      break
    case '21': // Plates Round Curved and Dishes
      if(name.match(/Axle\sHole/i)) return 'Axle Hole'
      if(name.match(/Boat\sStud/i)) return 'Boat Stud'
      if(name.match(/Radar/i)) return 'Radar'
      break
    case '31': // String, Bands and Reels
      if(name.match(/Chain/i)) return 'Chain'
      if(name.match(/String.+Studs.+Grip/i)) return 'Studded String with Grips'
      break
    case '15': // Tiles Special
      if(name.match(/Clip/i)) return 'Clip'
      if(name.match(/Grille/i)) return 'Grille'
      if(name.match(/Gold\sBar/i)) return 'Gold Bar'
      if(name.match(/Inverted/i)) return 'Inverted' // must go before hole
      if(name.match(/Hole/i)) return 'Hole'
      if(name.match(/Hollow\sBar/i)) return 'Hollow Bar'
      break
    case '67': // Tiles Round and Curved
      if(name.match(/Half\sCircle/i)) return 'Half Circle'
      if(name.match(/Macaroni/i)) return 'Macaroni'
      if(name.match(/Quarter/i)) return 'Quarter'
      break
  }
  return ''
}

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
      subCategory: getSubCategory(partData),
      colors: []
    } as Part
    return acc
  },
  {}
)

export const partsList = Object.keys(parts).map(partNum => parts[partNum])

export default parts