import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import formUrlEncode from 'form-urlencoded'

const apiKey = Constants.manifest.extra.BRICKSET_API_KEY

const api = (method: string, data: Object) => {
  return fetch('https://brickset.com/api/v3.asmx/' + method, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    body: formUrlEncode(Object.assign({apiKey}, data))
  })
    .then(response => {
      try {
        return response.json()
      } catch(e) {
      }
    })
}

export const useApi = () => {
  const BRICKSET_API_USER_HASH_STORAGE_KEY = 'bricktools-brickset-user-hash',
        [userHash, setUserHash] = useState(''),
        login = (username: string, password: string) =>
          new Promise((resolve, reject) =>
            api('login', {username, password})
              .then(({status, hash} : {status: string, hash: string}) => {
                if(status === 'success') {
                  setUserHash(hash)
                  AsyncStorage.setItem(BRICKSET_API_USER_HASH_STORAGE_KEY, hash)
                }
                // TODO: Add error handling
                resolve(null)
              })
          ),
        logOut = () => {
          setUserHash('')
          AsyncStorage.setItem(BRICKSET_API_USER_HASH_STORAGE_KEY, '')
        }
  useEffect(() => {
    AsyncStorage.getItem(BRICKSET_API_USER_HASH_STORAGE_KEY)
      .then(hash => setUserHash(hash || ''))
  }, [])
  return {
    api,
    login,
    logOut,
    isLoggedIn: Boolean(userHash)
  }
}


export default api