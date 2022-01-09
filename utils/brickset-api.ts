import fetch from 'cross-fetch'
import formUrlEncode from 'form-urlencoded'
import {readFileSync, writeFileSync} from 'fs'
import path from 'path'

let bricksetUserHash = ''

const api : any = async (method: string, data: any = {}) => {
  if(method != 'login' && !bricksetUserHash) {
    const {hash} = await api('login', {
      username: process.env.BRICKSET_USERNAME,
      password: process.env.BRICKSET_PASSWORD
    })
    console.log('Setting user hash:', hash)
    bricksetUserHash = hash
    return api(method, data)
  }
  return fetch('https://brickset.com/api/v3.asmx/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formUrlEncode(Object.assign(
      {apiKey: process.env.BRICKSET_API_KEY}, data,
      bricksetUserHash ? {userHash: bricksetUserHash} : {})
    )
  })
    .then(response => {
      return response.json()
    })
    .catch(e => console.log(e))
}

export const logTodaysAPIUsage = async () => {
  const usageResults = await api('getKeyUsageStats')
  console.log(`Brickset API key usage today: ${usageResults.apiKeyUsage[0]}\n`)
}

export const updateSetsData = async () => {
  const bricksetSets = getBricksetSets()
  console.log(Object.keys(bricksetSets).length, 'sets currently loaded')
  async function getSets(pageNumber  =1) {
    console.log('Fetching Brickset sets page ' + pageNumber)
    const result = await api('getSets', {
      params: JSON.stringify({
        year: (new Array((new Date()).getFullYear() + 1 - 1962)).fill(0).map((year, i) => (new Date()).getFullYear() + 1 - i).join(','),
        orderBy: 'yearFromDESC',
        extendedData: 1,
        pageSize: 500,
        pageNumber
      })
    })
    console.log('Loaded', result.sets.length, 'sets')
    result.sets.forEach((set: any) => {
      delete set.collection
      bricksetSets[set.number + '-' + set.numberVariant] = set
    })
    writeFileSync(
      path.join(__dirname, '../src/data/brickset/sets.json'),
      JSON.stringify(bricksetSets, null, 2)
    )
    if(result.sets.length == 500 && pageNumber < 200) await getSets(pageNumber + 1)
  }
  await getSets()
}

export const getBricksetSets = () => JSON.parse(
  readFileSync(path.join(__dirname, '../src/data/brickset/sets.json')).toString()
)

export default api
