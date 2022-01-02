import React, {useContext, createContext, useEffect, useMemo} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import formUrlEncode from 'form-urlencoded'
import {DataContext} from '../data/DataProvider'
import {BricksetCollection} from '../data/types'

const apiKey = Constants.manifest.extra.BRICKSET_API_KEY

const ApiContext = createContext({
  setWanted: async ({bricksetID, setNum}: Set, wanted: boolean) => {},
  setOwned: async ({bricksetID, setNum}: Set, qtyOwned: number) => {}
})

// Note: Normally I hate mutable variables, but I'll make an exception
// here so that we don't get into a race condition with `useState` hooks
let userHash = ''

const api = (method: string, data: any) => {
  return new Promise((resolve, reject) =>
    fetch('https://brickset.com/api/v3.asmx/' + method, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: formUrlEncode(Object.assign({apiKey},
        userHash ? Object.assign({}, data, {userHash}) : data
      ))
    })
      .then(async response => {
        const text = await response.text() || '{error: "No response body"}'
        // console.log(text)
        try {
          resolve(JSON.parse(text))
        } catch(e) {
          console.warn(e)
          console.warn(text)
          reject(e)
        }
      })
      .catch(e => {
        console.log('ERROR: API request failed')
        console.log(e)
        reject(e)
      })
  )
}

const BRICKSET_KEYS = {
  userHash: 'bricktools-brickset-user-hash',
  ownedSets: 'bricktools-brickset-owned-set-numbers'
}

const useSaveCollection = () => {
  const {setBricksetCollection} = useContext(DataContext)
  return useMemo(() => async (updatedCollection: BricksetCollection) => {
    console.log('saving collection')
    setBricksetCollection(Object.assign({}, updatedCollection))
    await AsyncStorage.setItem(BRICKSET_KEYS.ownedSets, JSON.stringify(updatedCollection))
  }, [])
}

export const useApi = () => api

let isLoggedInReadFromStorage = false
export const useIsLoggedInToBrickset = () => {
  const {setIsLoggedInToBrickset} = useContext(DataContext)
  if(!isLoggedInReadFromStorage) {  // can't use a useState hook here because it re-fires when used in different components
    isLoggedInReadFromStorage = true
    AsyncStorage.getItem(BRICKSET_KEYS.userHash)
      .then(hash => {
        setIsLoggedInToBrickset(Boolean(hash))
        userHash = hash || ''
      })
  }
  return useContext(DataContext).isLoggedInToBrickset
}

let collectionRead = false
export const useBricksetCollection = () => {
  const {bricksetCollection} = useContext(DataContext),
        saveCollection = useSaveCollection()
  if(!collectionRead) { // can't use a useState hook here because it re-fires when used in different components
    console.log('reading brickset collection from storage')
    collectionRead = true
    AsyncStorage.getItem(BRICKSET_KEYS.ownedSets)
      .then(result => {
        if(result) saveCollection(JSON.parse(result))
      })
  }
  return bricksetCollection
}

export const useLogin = () => {
  const {setIsLoggedInToBrickset} = useContext(DataContext)
  return useMemo(() => (username: string, password: string) =>
    new Promise((resolve, reject) =>
      api('login', {username, password})
        .then(async (response: any) => {
          if(response.status === 'success') {
            userHash = response.hash
            setIsLoggedInToBrickset(true)
            await AsyncStorage.setItem(BRICKSET_KEYS.userHash, response.hash)
            resolve(null)
          }
          else {
            // TODO: Add error handling
            console.error('Error logging in to Brickset')
            console.warn(JSON.stringify(response, null, 2))
            reject(null)
          }
        })
    )
  , [])
}

export const useLogOut = () => {
  const {setIsLoggedInToBrickset} = useContext(DataContext)
  return useMemo(() => async () => {
    await Promise.all([
      AsyncStorage.setItem(BRICKSET_KEYS.userHash, ''),
      AsyncStorage.setItem(BRICKSET_KEYS.ownedSets, '')
    ])
    setIsLoggedInToBrickset(false)
  }, [])
}

export const useFetchBricksetCollection = () => {
  const saveCollection = useSaveCollection()
  return useMemo(() => async () => {
    console.log('loading collection')
    const parseCollection = async (result: any) => {
      if(result.status === 'success') {
        const setsData = result.sets.reduce((acc: {[key: string]: any}, set: any) => {
          acc[set.number + '-' + set.numberVariant] = set.collection
          return acc
        }, {} as {[key: string]: any})
        return setsData
      }
      else {
        console.log(JSON.stringify(result, null, 2))
        return null
      }
    }
    const ownedResult = await api('getSets', {params: JSON.stringify({owned: 1, pageSize: 500})})
      .then(parseCollection)
    console.log(`Found ${Object.keys(ownedResult).length} owned sets`)
    const wantedResult = await api('getSets', {params: JSON.stringify({wanted: 1, pageSize: 500})})
      .then(parseCollection)
    console.log(`Found ${Object.keys(wantedResult).length} wanted sets`)
    saveCollection(Object.keys(wantedResult).reduce((acc, setNum) => {
      if(acc[setNum]) acc[setNum].wanted = true
      else acc[setNum] = wantedResult[setNum]
      return acc
    }, Object.assign({}, ownedResult)))
    return null
  },
  [])
}
export const useSetWanted = () => {
  const bricksetCollection = useBricksetCollection(),
        saveCollection = useSaveCollection()
  return useMemo(() => async ({bricksetID, setNum}: Set, wanted: boolean) =>
    api('setCollection', {
      SetID: bricksetID,
      params: JSON.stringify({want: wanted ? 1 : 0})
    })
      .then((response : any) => {
        if(response.status == 'success') {
          bricksetCollection[setNum] = bricksetCollection[setNum] || {
            owned: false,
            wanted: false,
            qtyOwned: 0,
            rating: 0,
            notes: ''
          }
          bricksetCollection[setNum].wanted = wanted
          console.log(`setting ${setNum} as wanted: ${wanted}`)
          saveCollection(bricksetCollection)
        }
      })
  , [])
}

export const useSetOwned = () => {
  const bricksetCollection = useBricksetCollection(),
        saveCollection = useSaveCollection()
  return useMemo(() => async ({bricksetID, setNum}: Set, qtyOwned: number) =>
    api('setCollection', {
      SetID: bricksetID,
      params: JSON.stringify({qtyOwned, owned: qtyOwned > 0 ? 1 : 0})
    })
      .then((response : any) => {
        if(response.status == 'success') {
          bricksetCollection[setNum] = bricksetCollection[setNum] || {
            owned: false,
            wanted: false,
            qtyOwned: 0,
            rating: 0,
            notes: ''
          }
          bricksetCollection[setNum].qtyOwned = qtyOwned
          bricksetCollection[setNum].owned = qtyOwned > 0
          console.log(`setting ${setNum} as owned: ${qtyOwned}`)
          saveCollection(bricksetCollection)
        }
      })
  , [])
}
