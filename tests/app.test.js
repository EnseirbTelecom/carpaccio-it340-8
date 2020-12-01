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

test('Bill - Total is equal to 50.', async () => {
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

test('computeTotal: No prices nor quantities.', async () => {
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

test('computeTotal: Diverging number of prices and quantities.', async () => {
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

test('computeTotal: Quantities missing.', async () => {
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

test('computeTotal: Not numerical prices.', async () => {
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
