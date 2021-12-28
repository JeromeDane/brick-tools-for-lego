import setsData from '../data/raw/sets.json'
import bricksetSets from './brickset/sets.json'
import themes, {Theme} from './themes'

type SetData = {
  setNum: string;
  name: string;
  year: number;
  themeId: string,
  numParts: number,
  setNumSort: number,
  inventories: {
    id: string,
    version: string
  }[]
}

type LEGOComPrice = {
  retailPrice?: number;
  dateFirstAvailable?: string,
  dateLastAvailable?: string
}

type Set = {
  setNum: string;
  name: string;
  year: number;
  theme: Theme;
  numParts: number;
  setNumSort: number;
  inventories: {
    id: string;
    version: string;
  }[]
  LEGOCom: {
    US: LEGOComPrice;
    UK: LEGOComPrice;
    CA: LEGOComPrice;
    DE: LEGOComPrice;
  }
  ownedBy: number
  wantedBy: number
}

const emptyLEGOCom = {
  retailPrice: 0,
  dateFirstAvailable: '',
  dateLastAvailable: ''
}

export const setsList: Set[] = (setsData as SetData[]).map(setData => {
  const bricksetSet = bricksetSets[setData.setNum]
  return {
    setNum: setData.setNum,
    name: setData.name,
    year: setData.year,
    theme: themes[setData.themeId],
    numParts: setData.numParts,
    setNumSort: setData.setNumSort,
    inventories: setData.inventories,
    LEGOCom: bricksetSet ? bricksetSet.LEGOCom : {
      US: emptyLEGOCom,
      UK: emptyLEGOCom,
      CA: emptyLEGOCom,
      DE: emptyLEGOCom
    },
    ownedBy: bricksetSet ? bricksetSet.collections.ownedBy : 0,
    wantedBy: bricksetSet ? bricksetSet.collections.wantedBy : 0,
  }
})

export default setsList.reduce((acc, set: Set) => {
  return Object.assign(acc, {[set.setNum]: set})
}, {} as {[key: string]: Set})
