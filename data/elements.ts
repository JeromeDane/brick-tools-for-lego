import elementsData from './raw/elements.json'
import type {Color} from './colors'
import type {Part} from './parts'
import colors from './colors'
import {getPart} from './parts'

type ElementData = {
  i: string, // elementId
  p: string, // partNum
  c: string // colorId
}

export type Element = {
  id: string,
  part: Part,
  color: Color
}

const partColors : {[keys: string]: {[keys: string]: Element}} = {}

export const elements = (elementsData as ElementData[]).reduce((acc, {i, p, c}) => {
  const part = getPart(p),
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
    id: '-1', // element not found
    part: getPart(partNum),
    color: colors[colorId]
  }

const corrections : {[keys: string]: {[keys: string]: string}} = {
  '2654': { // Plates Round Curved and Dishes, Boat Stud
    '47': '6163901'
  },
  '3005': { // 1x1 brick
    '47': '6220959', // trans clear
    '378': '4521948' // sand green
  },
  '3010': { // sand green 1x3 brick,
    '378': '4521947'
  },
  '3021': { // tan 2x3 plate
    '19': '4118790'
  },
  '3023': { // 1x2 plate
    '47': '6240204'
  },
  '3031': { // tan 4/4 plate,
    '19': '4243824',
    '70': '4243838'
  },
  '3032': { // 4 x 6 plate
    '72': '4211115' // dark bluish gray
  },
  '3622': { // 1 x 3 brick
    '484': '6263221' // dark orange
  },
  '4175': {
    '0': '6285241' // black
  },
  '3040b': { // 1x2 sloped brick
    '15': '4121932' // white
  },
  '3673': { // light bluish gray technic pin without friction ridges
    '71': '4211807'
  },
  '3679': { // Turntable 2 x 2 plate top
    '71': '4540203' // light bluish gray
  },
  '3821': { // 1x3x1 door right
    '4': '4537987', // red
    '15': '4537987' // white
  },
  '4070': { // 1x1 brick special headlamp
    '1': '407023' // blue
  },
  '4733': { // 1x1 brick special snot 4 sides
    '70': '6133765' // reddish brown
  },
  '6134': { // Hinge Brick 2 x 2 Top Plate Thin
    '15': '4612342' // white
  },
  '6632': { // Technic Beam 1 x 3 Thin
    '15': '4107826', // white
  },
  '14769': { // dark bluish gray 2x2 tile round
    '72': '4620079'
  },
  '18677': { // reddish brown 1x2 plate-special with pin hole underneath
    '70': '6192310'
  },
  '30361c': { // Brick Round 2 x 2 x 2 Robot Body - with Bottom Axle Holder x Shape + O
    '0': '4194008' // black
  },
  '3062b': { // 1 x 1 round brick
    '14': '306224', // yellow
  },
  '3069b': {  // 1 x 2 tile with groove
    '47': '6251294' // trans-clear
  },
  '30374': { // Bar 4L (Lightsaber Blade / Wand)
    '70': '6116613' // reddish brown
  },
  '32028': { // light bluish gray 1x2 plate with door grove
    '72': '4543086',
    '19': '4160483'
  },
  '32039': { // technic axle connector with axle hole
    '0': '6331716', // black
    '14': '4107800' // yellow
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
  '4595': { // Brick special 1x1 with studs on sides
    '0': '4523339' // black
  },
  '4740': { // green 2x2 dish
    '2': '4567908'
  },
  '32000': { // 1 x 2 technic brick holes through side
    '15': '3200001'
  },
  '44294': { // technic axle 7L
    '71': '4211805'
  },
  '44728': { // Bracket 1 x 2 - 2 x 2
    '72': '6117972' // dark bluish gray
  },
  '54200': { // cheese wedge
    '0': '4504382', // black
    '14': '4504381', // yellow
    '46': '6245272' // trans yellow
  },
  '60032': {
    '0': '4539128' // wall panel single hole
  },
  '60583b': { // 1x1x3 brick special with 2 clips
    '0': '6320325', // black
    '4': '6320327' // red
  },
  '60596': { // door frame
    '15': '6262945'
  },
  '60601': { // Glass for Window 1 x 2 x 2 Flat
    '47': '6254552'
  },
  '61409': { // 1x2 slope with slots
    '14': '4540384' // yellow
  },
  '85557': { // Train Wheel RC Train, Spoked with Technic Axle Hole and Counterweight, 37 mm diameter [Flanged Driver]
    '4': '6148307' // 'red
  },
  '87994': { // Bar 3L
    '71': '6093527'
  },
  '92690': { // Light Bluish Gray Bar 1L with Top Stud and 2 Side
    '71': '4640844'
  }
}
