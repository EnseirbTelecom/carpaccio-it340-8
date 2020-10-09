const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/id', (req, res) => {
  res.send({ "id" : "carpaccio-it340-8" })
})

app.post('/bill', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  console.log(req.body)
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
