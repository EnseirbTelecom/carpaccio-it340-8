const { Bill } = require('./bill.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('', (request, result) => {
  result.send({ message: "Bienvenue sur l'application carpaccio de la dream team !" })
})

app.get('/id', (request, result) => {
  result.send({ id: 'carpaccio-it340-8' })
})

app.post('/bill', (request, result) => {
  result.send(new Bill().getBill(request.body))
})

module.exports = app
