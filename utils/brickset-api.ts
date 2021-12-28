import fetch from 'cross-fetch'
import formUrlEncode from 'form-urlencoded'

let bricksetUserHash = ''

const api : any = async (method: string, data: Object = {}) => {
  if(method != 'login' && !bricksetUserHash) {
    const {hash} = await api('login', {
      username: process.env.BRICKSET_USERNAME,
      password: process.env.BRICKSET_PASSWORD
    })
    bricksetUserHash = hash
    return api(method, data)
  }
  return fetch('https://brickset.com/api/v3.asmx/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formUrlEncode(Object.assign({apiKey: process.env.BRICKSET_API_KEY}, data))
  })
    .then(response => {
      try {
        return response.json()
      } catch(e) {
      }
    })
    .catch(e => console.log(e))
}

export default api