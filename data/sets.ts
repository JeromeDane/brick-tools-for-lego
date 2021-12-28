import { useEffect, useState } from 'react'
import { useCollection } from '../api/brickset'
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

export type Set = {
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
  image: {
    imageURL: string
    thumbnailURL: string
  }
  collection: {
    owned: boolean
    wanted: boolean
    qtyOwned: number
    rating: number
    notes: string
  }
  bricksetID: number
}

const emptyLEGOCom = {
  retailPrice: 0,
  dateFirstAvailable: '',
  dateLastAvailable: ''
}

export const useSets = () => {
  const collection = useCollection(),
        [sets, setSets] = useState({
          byId: {} as {[key: string]: Set},
          list: [] as Set[]
        })
  useEffect(() => {
    const list : Set[] = (setsData as SetData[]).map(setData => {
      const bricksetSet = bricksetSets[setData.setNum],
            myCollection = collection[setData.setNum]
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
        ownedBy: bricksetSet ? (bricksetSet.collections.ownedBy || 0) : 0,
        wantedBy: bricksetSet ? (bricksetSet.collections.wantedBy || 0) : 0,
        image: {
          imageURL: (bricksetSet && bricksetSet.image && bricksetSet.imageURL) || `https://images.brickset.com/sets/images/${setData.setNum}.jpg`,
          thumbnailURL: (bricksetSet && bricksetSet.image && bricksetSet.thumbnailURL) || `https://images.brickset.com/sets/images/${setData.setNum}.jpg`,
        },
        collection: {
          owned: myCollection ? myCollection.owned : false,
          wanted: myCollection ? myCollection.wanted : false,
          qtyOwned: myCollection ? myCollection.qtyOwned : 0,
          rating: myCollection ? myCollection.rating : 0,
          notes: myCollection ? myCollection.notes : ''
        },
        bricksetID: bricksetSet ? bricksetSet.setID : -1
      }
    })
    setSets({
      byId: list.reduce((acc, set: Set) => {
        return Object.assign(acc, {[set.setNum]: set})
      }, {} as {[key: string]: Set}),
      list
    })
  }, [collection])
  return sets
}
