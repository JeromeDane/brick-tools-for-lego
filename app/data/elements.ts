import elementsData from './raw/elements.json'
import type {Color} from './colors'
import type {Part} from './parts'
import colors from './colors'
import parts from './parts'

type ElementData = {
  i: string, // elementId
  p: string, // partNum
  c: string // colorId
}

type Element = {
  id: string,
  part: Part,
  color: Color
}

const partColors : {[keys: string]: {[keys: string]: Element}} = {}

export const elements = (elementsData as ElementData[]).reduce((acc, {i, p, c}) => {
  const part = parts[p],
        color = colors[c]
  part.colors.push(color)
  const element = {
    id: i,
    part,
    color
  }
  acc[i] = element
  partColors[p] = partColors[p] || {}
  partColors[p][c] = element
  return acc
}, {} as {[key: string]: Element})

export const getElementByPartAndColor = (partNum: string, colorId: string) =>
  (corrections[partNum] && corrections[partNum][colorId] && elements[corrections[partNum][colorId]]) ||
  (partColors[partNum] && partColors[partNum][colorId]) ||
  {
    id: '', // element not found
    part: parts[partNum],
    color: colors[colorId]
  }

const corrections : {[keys: string]: {[keys: string]: string}} = {
  '3005': { // sand green 1x1 brick
    '378': '4521948'
  },
  '3010': { // sand green 1x3 brick,
    '378': '4521947'
  },
  '3021': { // tan 2x3 plate
    '19': '4118790'
  },
  '3031': { // tan 4/4 plate,
    '19': '4243824',
    '70': '4243838'
  },
  '3673': { // light bluish gray technic pin without friction ridges
    '71': '4211807'
  },
  '3821': { // 1x3x1 door right
    '4': '4537987', // red
    '15': '4537987' // white
  },
  '14769': { // dark bluish gray 2x2 tile round
    '72': '4620079'
  },
  '18677': { // reddish brown 1x2 plate-special with pin hole underneath
    '70': '6192310'
  },
  '32028': { // light bluish gray 1x2 plate with door grove
    '72': '4543086',
    '19': '4160483'
  },
  '32039': { // black technic axle connector with axle hole
    '0': '6331716'
  },
  '3795': { // light bluish gray 2x6 plate
    '71': '4211452'
  },
  '43093': { // blue technic axle pin with friction ridges lengthwise
    '1': '4206482'
  },
  '4536': { // white Cupboard 2 x 3 Drawer
    '15': '4520636'
  },
  '4740': { // green 2x2 dish
    '2': '4567908'
  },
}
