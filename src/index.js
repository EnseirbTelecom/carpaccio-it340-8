const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000

app.get('/id', (req, res) => {
  res.send('{ "id": "carpaccio-it340-8" }');
})

app.post('/bill', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
  
  var prices = req.body.prices;
  var quantities = req.body.quantities;
  console.log(prices);

  try{
    var sum = 0;

    for(var i=0; i< prices.length; i++) {
      sum += prices[i]*quantities[i];
    };

    const total = {
      total: total
    } 

    res.send(JSON.stringify(total));

  } catch(error){
    
      const errorJson = {
        error: error
      }

      res.send(JSON.stringify(errorJson));
  }

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})