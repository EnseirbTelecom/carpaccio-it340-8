/* eslint-env jest */

require('jest')

const request = require('request-promise-native')

/* TESTS DE VALIDATION */

function testBillRequest (postData) {
  const postConfig = {
    method: 'POST',
    uri: 'http://localhost:3000/bill',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  }
  return request(postConfig)
}

test('Get - Welcoming message.', async () => {
  expect.assertions(1)
  let answerValue
  const getConfig = {
    uri: 'http://localhost:3000/',
    headers: {
      'User-Agent': 'Request-Promise'
    }
  }
  await request(getConfig)
    .then(data => {
      answerValue = data
    }).catch(err => {
      console.log(err)
    })
  expect(answerValue).toBe("Bienvenue sur l'application carpaccio de la dream team !")
})

test('Get - Welcoming message.', async () => {
  expect.assertions(1)
  let answerValue
  const getConfig = {
    uri: 'http://localhost:3000/id',
    qs: {},
    headers: {
      'User-Agent': 'Request-Promise'
    }
  }
  await request(getConfig)
    .then(data => {
      answerValue = JSON.parse(data).id
    }).catch(err => {
      console.log(err)
    })
  expect(answerValue).toBe('carpaccio-it340-8')
})

test('Bill: Total is equal to 50.', async () => {
  expect.assertions(1)
  let answerValue
  await testBillRequest(
    {
      prices: [10, 20],
      quantities: [1, 2]
    }
  ).then(data => {
    answerValue = JSON.parse(data).total
  }).catch(err => {
    console.log(err)
  })
  expect(answerValue).toBe(50)
})

test('Bill: No prices nor quantities.', async () => {
  expect.assertions(1)
  let answerValue
  await testBillRequest(
    {
      prices: [],
      quantities: []
    }
  ).then(data => {
    answerValue = JSON.parse(data).total
  }).catch(err => {
    console.log(err)
  })
  expect(answerValue).toBe(0)
})

test('Bill: Diverging number of prices and quantities.', async () => {
  expect.assertions(1)
  let answerValue
  await testBillRequest(
    {
      prices: [10, 20, 30],
      quantities: [1, 2]
    }
  ).then(data => {
    answerValue = JSON.parse(data).event
  }).catch(err => {
    console.log(err)
  })
  expect(answerValue).toBe('Il doit y avoir autant de prix que de quantités.')
})

test('Bill: Quantities missing.', async () => {
  expect.assertions(1)
  let answerValue
  await testBillRequest(
    {
      prices: [10, 20]
    }).then(data => {
    answerValue = JSON.parse(data).event
  }).catch(err => {
    console.log(err)
  })
  expect(answerValue).toBe('Les prix et quantités sont obligatoires.')
})

test('Bill: Not numerical prices.', async () => {
  expect.assertions(1)
  let answerValue
  await testBillRequest(
    {
      prices: [10, 'Test'],
      quantities: [1, 2]
    }
  ).then(data => {
    answerValue = JSON.parse(data).event
  }).catch(err => {
    console.log(err)
  })
  expect(answerValue).toBe('Les prix et quantités doivent être des nombres.')
})
