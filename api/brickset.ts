import React, {useState} from 'react'
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
  const [userHash, setUserHash] = useState(''),
        login = (username: string, password: string) =>
          new Promise((resolve, reject) =>
            api('login', {username, password})
              .then(({status, hash} : {status: string, hash: string}) => {
                if(status === 'success') setUserHash(hash)
                // TODO: Add error handling
                resolve(null)
              })
          ),
        logOut = () => setUserHash('')
  return {
    api,
    login,
    logOut,
    isLoggedIn: Boolean(userHash)
  }
}


export default api