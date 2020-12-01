/* eslint-env jest */

require('jest')

// const request = require('request-promise-native')
const request = require('supertest')
const server = require('../src/app')

/* TESTS DE VALIDATION */

describe('GET /', () => {
  it('Get a welcoming message.', async () => {
    expect.assertions(2)
    const res = await request(server)
      .get('/')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBe('Bienvenue sur l\'application carpaccio de la dream team !')
  })
})

describe('GET /id', () => {
  it('Get the project id.', async () => {
    expect.assertions(2)
    const res = await request(server)
      .get('/id')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.id).toBe('carpaccio-it340-8')
  })
})

function testBillRequest (postData) {
  return request(server)
    .post('/bill')
    .send(postData)
}

describe('POST /bill', () => {
  it('Total is equal to 50.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [1, 2]
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(50)
  })
})

describe('POST /bill', () => {
  it('No prices nor quantities.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [],
        quantities: []
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(0)
  })
})

describe('POST /bill', () => {
  it('Diverging number of prices and quantities.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20, 30],
        quantities: [1, 2]
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Il doit y avoir autant de prix que de quantités.')
  })
})

describe('POST /bill', () => {
  it('Quantities missing.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20]
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Les prix et quantités sont obligatoires.')
  })
})

describe('POST /bill', () => {
  it('Not numerical prices.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 'Test'],
        quantities: [1, 2]
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Les prix et quantités doivent être des nombres.')
  })
})
