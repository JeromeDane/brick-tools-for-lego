import {useContext, useEffect} from 'react'
import {useBricksetCollection} from '../api/brickset'
import setsData from './raw/sets.json'
import bricksetSets from './brickset/sets.json'
import themes from './themes'
import {DataContext} from './DataProvider'
import type {BricksetCollection} from './types'

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

const emptyLEGOCom = {
  retailPrice: 0,
  dateFirstAvailable: '',
  dateLastAvailable: ''
}

const processSets = (bricksetCollection: BricksetCollection) => {
  console.log(`processing sets against collection of ${Object.keys(bricksetCollection).length} items`)
  return (setsData as SetData[])
    .map(setData => {
      const bricksetSet = bricksetSets[setData.setNum],
            myCollection = bricksetCollection[setData.setNum]
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
          thumbnailURL: (bricksetSet && bricksetSet.image && bricksetSet.thumbnailURL) || `https://images.brickset.com/sets/images/${setData.setNum}.jpg`
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
}

let previousBricksetCollection: BricksetCollection
export const useSets = () => {
  const {sets, setSets} = useContext(DataContext),
        bricksetCollection = useBricksetCollection()
  useEffect(() => {
    // Note that the manual check to see if the collection has changed is
    // necessary even though we're already in a use effect that's dependent
    // on the bricksetCollection changing. useEffect is called on the first
    // render of EACH COMPONENT WHERE IT IS USED. This would result in a
    // re-processing of sets each time a new component is rendered that calls
    // useSets() rather than the intended behavior of only re-processing
    // sets when the collection has changed
    if(bricksetCollection && bricksetCollection !== previousBricksetCollection) {
      previousBricksetCollection = bricksetCollection
      setSets(processSets(bricksetCollection))
    }
  }, [bricksetCollection])
  return sets
}
export const useSetSets = () => useContext(DataContext).setSets
export const useSet = (setNumber: string) => useSets().find(({setNum}) => setNum === setNumber)

export const useGetSet = () => (setNumber: string) => useSet(setNumber)
