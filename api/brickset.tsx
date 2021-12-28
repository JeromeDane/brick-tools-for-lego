import React, {useContext, createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import formUrlEncode from 'form-urlencoded'

const apiKey = Constants.manifest.extra.BRICKSET_API_KEY

type CollectionItem = {
  owned: boolean;
  wanted: boolean;
  qtyOwned: number;
  rating: number;
  notes: string;
}

type Collection = {[key: string]: CollectionItem}
let storageRead = false

const ApiContext = React.createContext({});

export const BricksetApiContext = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  const BRICKSET_KEYS = {
          userHash: 'bricktools-brickset-user-hash',
          ownedSets: 'bricktools-brickset-owned-set-numbers'
        },
        [userHash, setUserHash] = useState(''),
        [collection, setCollection] = useState({} as Collection),
        api = (method: string, data: Object) => {
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
                try {
                  resolve(JSON.parse(text))
                } catch(e) {
                  console.warn(e)
                  console.warn(text)
                  reject(e)
                }
              })
          )
        },
        login = (username: string, password: string) =>
          new Promise((resolve, reject) =>
            api('login', {username, password})
              .then(async ({status, hash} : {status: string, hash: string}) => {
                if(status === 'success') {
                  setUserHash(hash)
                  await AsyncStorage.setItem(BRICKSET_KEYS.userHash, hash)
                  resolve(null)
                }
                else {
                  // TODO: Add error handling
                  console.error('Error logging in to Brickset')
                  reject(null)
                }
              })
          ),
        logOut = async () => {
          await AsyncStorage.setItem(BRICKSET_KEYS.userHash, '')
          setUserHash('')
        },
        loadCollection = () => new Promise((resolve, reject) => {
          console.log('loading collection')
          api('getSets', {params: JSON.stringify({owned: 1, pageSize: 500})})
            .then(async result => {
              console.log('Found ', result.length, 'owned sets')
              if(result.status === 'success') {
                const setsData = result.sets.reduce((acc: {[key: string]: any}, set: any) => {
                  acc[set.number + '-' + set.numberVariant] = set.collection
                  return acc
                }, {} as {[key: string]: any})
                await AsyncStorage.setItem(BRICKSET_KEYS.ownedSets, JSON.stringify(setsData))
                setCollection(setsData)
                resolve(null)
              }
              else {
                console.log(JSON.stringify(result, null, 2))
                reject(null)
              }
              // TODO: Add error handling
            })
            .catch(e => {
              console.error('Error fetching collection')
              console.error(e)
              reject(e)
            })
        })
      useEffect(() => {
      if(!storageRead) {
        storageRead = true
        AsyncStorage.getItem(BRICKSET_KEYS.userHash)
          .then(hash => setUserHash(hash || ''))
        AsyncStorage.getItem(BRICKSET_KEYS.ownedSets)
          .then(result => setCollection(JSON.parse(result || '{}')))
        }
      }, [])
  return <ApiContext.Provider value={{
    isLoggedIn: Boolean(userHash),
    login,
    logOut,
    loadCollection,
    collection,
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
