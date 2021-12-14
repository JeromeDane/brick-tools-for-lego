import colorsData from './colors.json'
import colorOrder from './color-order'

type ColorData = {
  id: string,
  name: string,
  rgb: string,
  isTrans: string
}

export type Color = {
  id: string,
  name: string,
  rgb: string,
  isTrans: boolean,
  sortOrder: number
}

export default (colorsData as ColorData[])
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