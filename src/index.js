const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, result) => {
  result.send('Bienvenue sur l\'application carpaccio de la dream team !')
})

app.get('/id', (request, result) => {
  result.send({ "id" : "carpaccio-it340-8" })
})

app.post('/bill', (request, result) => {
  try {
    answer = computeTotal(request);
  } catch (error) {
    answer = handleError(error);
  }

  answerAsJson = JSON.stringify(answer);
  result.setHeader('Content-Type', 'application/json');
  result.send(answerAsJson);
})


app.listen(port, () => {
  console.log(`Je vous écoute au http://localhost:${port}`)
})

function computeTotal(request) {
  let computedTotal = {
    total: 0
  };

  let prices = request.body.prices;
  let quantities = request.body.quantities;

  if(!prices || !quantities) {
    throw "Les prix et quantités sont obligatoires.";
  }
  if(prices.length != quantities.length) {
    throw "Il doit y avoir autant de prix que de quantités.";
  }

  prices.forEach((element, index) => {
    if(isNumber(element) && isNumber(quantities[index]))
      computedTotal.total += element * quantities[index];
    else
      throw "Les prix et quantités doivent être des nombres.";
  });

  return computedTotal;
}

function isNumber(element) {
  return !isNaN(Number(element));
}

function handleError(error) {
  return {
    event : error.message ? error.message : error
  }
}