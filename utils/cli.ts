import fetch from 'cross-fetch'
import formUrlEncode from 'form-urlencoded'

const api = (method: string, data: Object) =>
  fetch('https://brickset.com/api/v3.asmx/' + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formUrlEncode(data)
  })
    .then(response => response.json())

api('login', {
  apiKey: process.env.BRICKSET_API_KEY,
  username: process.env.BRICKSET_USERNAME,
  password: process.env.BRICKSET_PASSWORD
})
  .then(console.log)