import fetch from 'cross-fetch'
import formUrlEncode from 'form-urlencoded'
import {buildJson, updateCsvData} from './rebrickable'

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const api = (method: string, data: Object) =>
  fetch('https://brickset.com/api/v3.asmx/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formUrlEncode(Object.assign({apiKey: process.env.BRICKSET_API_KEY}, data))
  })
    .then(response => {
      console.log('response text', JSON.stringify(response.text(), null, 2));
      try {
        return response.json()
      } catch(e) {
      }
    })
    .catch(e => console.log(e))

const run = async () => {
  if(argv.updateData) await updateCsvData()
  await buildJson()
  // const {hash} = await api('login', {
  //   username: process.env.BRICKSET_USERNAME,
  //   password: process.env.BRICKSET_PASSWORD
  // })
  // console.log(hash)
  // const result = await api('getSets', {
  //   hash,
  //   params: {}
  // })
  // console.log(result)
}

run()
