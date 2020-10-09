const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.get('/id', (req, res) => {
  res.send('{ "id": "carpaccio-it340-8" }');
})

app.post('/bill', (req, res) => {
  
  var prices = req.body.prices;
  var quantities = req.body.quantities;

  try{
    var sum = 0;

    for(var i=0; i< prices.length; i++) {
      sum += prices[i]*quantities[i];
    };

    const total = {
      total: total
    } 

    res.send(total);

  } catch(error){
    
      const errorJson = {
        error: error
      }

      res.send(errorJson);
  }

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})