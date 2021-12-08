import elements from '../data/elements-lookup.json'

export const getElement = (partNum: string, colorId: string) =>
  corrections[partNum + '-' + colorId] || elements[partNum + '-' + colorId]

const corrections = {
  '3005-378': '4521948', // sand green 1x1 brick
  '3010-378': '4521947', // sand green 1x3 brick,
  '3021-19': '4118790', // tan 2x3 plate
  '3795-71': '4211452', // light bluish gray 2x6 plate
  '4536-15': '4520636', // white Cupboard 2 x 3 Drawer
}
