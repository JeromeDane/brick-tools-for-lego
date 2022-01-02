import {sortBy} from 'sort-by-typescript'
import colorsData from './raw/colors.json'
import colorOrder from './color-order'

type ThirdPartyColor = {
  id: string,
  name: string
}

type ColorData = {
  id: string;
  name: string;
  rgb: string;
  isTrans: string;
  firstYear: number;
  lastYear: number;
  lego: ThirdPartyColor;
  lDraw: ThirdPartyColor;
  brickLink: ThirdPartyColor;
  brickOwl: ThirdPartyColor;
}

export type Color = {
  id: string;
  name: string;
  rgb: string;
  isTrans: boolean;
  sortOrder: number;
  firstYear: number;
  lastYear: number;
  lego: ThirdPartyColor;
  lDraw: ThirdPartyColor;
  brickLink: ThirdPartyColor;
  brickOwl: ThirdPartyColor;
}

const colors = (colorsData as ColorData[])
  .reduce((acc: {[key: string]: Color}, colorData) => {
    const colorIndex = colorOrder.indexOf(colorData.name)
    return Object.assign(acc, {[colorData.id]:
      {
        ...colorData,
        isTrans: colorData.isTrans == 't',
        sortOrder: colorIndex > -1 ? colorIndex : Number.POSITIVE_INFINITY
      } as Color
    })
  },
  {}
  )

export default colors

export const colorsList = Object.keys(colors)
  .map(id => colors[id])
  .sort(sortBy('name'))
