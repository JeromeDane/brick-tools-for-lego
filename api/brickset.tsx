import React, {useContext, createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import formUrlEncode from 'form-urlencoded'
import {Set} from '../data/sets'

const apiKey = Constants.manifest.extra.BRICKSET_API_KEY

type CollectionItem = {
  owned: boolean;
  wanted: boolean;
  qtyOwned: number;
  rating: number;
  notes: string;
}

export type Collection = {[key: string]: CollectionItem}
let storageRead = false

const ApiContext = createContext({
  isLoggedIn: false,
  collection: {} as Collection,
  sets: {} as {[key: string]: Set},
  setsList: [] as Set[],
  setWanted: async ({bricksetID, setNum}: Set, wanted: boolean) => {},
  setOwned: async ({bricksetID, setNum}: Set, qtyOwned: number) => {}
})

// Note: Normally I hate mutable variables, but I'll make an exception
// here so that we don't get into a race condition with `useState` hooks
let userHash = ''

export const BricksetApiContext = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const BRICKSET_KEYS = {
          userHash: 'bricktools-brickset-user-hash',
          ownedSets: 'bricktools-brickset-owned-set-numbers'
        },
        [isLoggedIn, setIsLoggedIn] = useState(false),
        [collection, setCollection] = useState({} as Collection),
        saveCollection = async (updatedCollection: Collection) => {
          setCollection(Object.assign({}, updatedCollection))
          await AsyncStorage.setItem(BRICKSET_KEYS.ownedSets, JSON.stringify(updatedCollection))
        },
        api = (method: string, data: any) => {
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
        },
        login = (username: string, password: string) =>
          new Promise((resolve, reject) =>
            api('login', {username, password})
              .then(async (response: any) => {
                if(response.status === 'success') {
                  userHash = response.hash
                  setIsLoggedIn(true)
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
          ),
        logOut = async () => {
          await AsyncStorage.setItem(BRICKSET_KEYS.userHash, '')
          setIsLoggedIn(false)
        },
        loadCollection = () => new Promise(async (resolve, reject) => {
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
              reject(null)
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
          resolve(null)
        }),
        setWanted = async ({bricksetID, setNum}: Set, wanted: boolean) =>
          api('setCollection', {
            SetID: bricksetID,
            params: JSON.stringify({want: wanted ? 1 : 0})
          })
            .then((response : any) => {
              if(response.status == 'success') {
                collection[setNum] = collection[setNum] || {
                  owned: false,
                  wanted: false,
                  qtyOwned: 0,
                  rating: 0,
                  notes: ''
                }
                collection[setNum].wanted = wanted
                console.log(`setting ${setNum} as wanted: ${wanted}`)
                saveCollection(collection)
              }
            }),
        setOwned = async ({bricksetID, setNum}: Set, qtyOwned: number) =>
          api('setCollection', {
            SetID: bricksetID,
            params: JSON.stringify({qtyOwned, owned: qtyOwned > 0 ? 1 : 0})
          })
            .then((response : any) => {
              if(response.status == 'success') {
                collection[setNum] = collection[setNum] || {
                  owned: false,
                  wanted: false,
                  qtyOwned: 0,
                  rating: 0,
                  notes: ''
                }
                collection[setNum].qtyOwned = qtyOwned
                collection[setNum].owned = qtyOwned > 0
                console.log(`setting ${setNum} as owned: ${qtyOwned}`)
                saveCollection(collection)
              }
            })
  useEffect(() => {
    if(!storageRead) {
      storageRead = true
      AsyncStorage.getItem(BRICKSET_KEYS.userHash)
        .then(hash => {
          setIsLoggedIn(Boolean(hash))
          userHash = hash || ''
        })
      AsyncStorage.getItem(BRICKSET_KEYS.ownedSets)
        .then(result => setCollection(JSON.parse(result || '{}')))
    }
  }, [])
  return <ApiContext.Provider value={{
    isLoggedIn,
    login,
    logOut,
    loadCollection,
    collection,
    setWanted,
    setOwned,
    api
  }}>
    {children}
  </ApiContext.Provider>
}

export const useApi = () => useContext(ApiContext).api
export const useCollection = () => useContext(ApiContext).collection
export const useLogin = () => useContext(ApiContext).login
export const useLogOut = () => useContext(ApiContext).logOut
export const useIsLoggedIn = () => useContext(ApiContext).isLoggedIn
export const useLoadCollection = () => useContext(ApiContext).loadCollection
export const useSetWanted = () => useContext(ApiContext).setWanted
export const useSetOwned = () => useContext(ApiContext).setOwned
