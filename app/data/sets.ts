import setsData from '../data/raw/sets.json'
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

type Set = {
  setNum: string;
  name: string;
  year: number;
  theme: Theme,
  numParts: number,
  setNumSort: number,
  inventories: {
    id: string,
    version: string
  }[]
}

export const setsList: Set[] = (setsData as SetData[]).map(setData => ({
  setNum: setData.setNum,
  name: setData.name,
  year: setData.year,
  theme: themes[setData.themeId],
  numParts: setData.numParts,
  setNumSort: setData.setNumSort,
  inventories: setData.inventories
}))

export default setsList.reduce((acc, set: Set) => {
  return Object.assign(acc, {[set.setNum]: set})
}, {} as {[key: string]: Set})
