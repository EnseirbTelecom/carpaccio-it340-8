const { Bill } = require('./bill.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (request, result) => {
  result.send('Bienvenue sur l\'application carpaccio de la dream team !')
})

app.get('/id', (request, result) => {
  result.send({ id: 'carpaccio-it340-8' })
})

app.post('/bill', (request, result) => {
  result.send(JSON.stringify(new Bill().getBill(request.body.prices, request.body.quantities)))
})

app.listen(port, () => {
  console.log(`Je vous écoute au http://localhost:${port}`)
})
