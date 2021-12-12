import elements from '../data/elements-lookup.json'

export const getElement = (partNum: string, colorId: string) =>
  corrections[partNum + '-' + colorId] || elements[partNum + '-' + colorId]

const corrections = {
  '3005-378': '4521948', // sand green 1x1 brick
  '3010-378': '4521947', // sand green 1x3 brick,
  '3021-19': '4118790', // tan 2x3 plate
  '3031-19': '4243824', // tan 4/4 plate,
  '3031-70': '4243838', // reddish brown 4/4 plate
  '3673-71': '4211807', // light bluish gray technic pin without friction ridges
  '3821-4': '4537987', // red 1x3x1 door right
  '3821-15': '4537987', // white 1x3x1 door right
  '14769-72': '4620079', // dark bluish gray 2x2 tile round
  '18677-70': '6192310', // reddish brown 1x2 plate-special with pin hole underneath
  '32028-72': '4543086', // light bluish gray 1x2 plate with door grove
  '32028-19': '4160483', // tan 1x2 plate with door grove
  '32039-0': '6331716', // black technic axle connector with axle hole
  '3795-71': '4211452', // light bluish gray 2x6 plate
  '43093-1': '4206482', // blue technic axle pin with friction ridges lengthwise
  '4536-15': '4520636', // white Cupboard 2 x 3 Drawer
  '4740-2': '4567908', // green 2x2 dish
}
