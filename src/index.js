const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/id', (req, res) => {
  res.send({ "id" : "carpaccio-it340-8" })
})

app.post('/bill', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  requestAsJson = JSON.stringify(req.body);
  console.log(requestAsJson)
  res.send(requestAsJson)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})