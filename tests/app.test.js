/* eslint-env jest */

require('jest')

const request = require('supertest')
const app = require('../src/app')

/* TESTS DE VALIDATION */

describe('GET /', () => {
  it('Get a welcoming message.', async () => {
    expect.assertions(2)
    const res = await request(app)
      .get('/')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBe('Bienvenue sur l\'application carpaccio de la dream team !')
  })
})

describe('GET /id', () => {
  it('Get the project id.', async () => {
    expect.assertions(2)
    const res = await request(app)
      .get('/id')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.id).toBe('carpaccio-it340-8')
  })
})

function testBillRequest (postData) {
  return request(app)
    .post('/bill')
    .send(postData)
}

describe('POST /bill', () => {
  it('Total is equal to 62.5.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [1, 2],
        country: 'IT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(62.5)
  })

  it('Total is equal to 117.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [2, 4],
        country: 'FI'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(117)
  })

  it('Total with no discount is equal to 375.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [10, 10],
        country: 'IT',
        discount: 'NO_DISCOUNT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(375)
  })

  it('Total with fixed discount is equal to 365.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [10, 10],
        country: 'IT',
        discount: 'FIXED_DISCOUNT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(365)
  })

  it('Total with flat discount is equal to 262.5.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [10, 10],
        country: 'IT',
        discount: 'FLAT_DISCOUNT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(262.5)
  })

  it('Total with flat discount is equal to 3637.5.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [100, 100],
        country: 'IT',
        discount: 'PROGRESSIVE_DISCOUNT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(3637.5)
  })

  it('No prices nor quantities.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [],
        quantities: [],
        country: 'IT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.total).toBe(0)
  })

  it('Diverging number of prices and quantities.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20, 30],
        quantities: [1, 2],
        country: 'IT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Il doit y avoir autant de prix que de quantités.')
  })

  it('Quantities missing.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        country: 'IT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Les prix, quantités et pays sont obligatoires.')
  })

  it('Not numerical prices.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 'Test'],
        quantities: [1, 2],
        country: 'IT'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Les prix et quantités doivent être des nombres.')
  })

  it('No country.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [1, 2]
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Les prix, quantités et pays sont obligatoires.')
  })

  it('Invalid country code.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [1, 2],
        country: 'ZZ'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe("Ce pays n'est pas reconnu.")
  })

  it('Invalid discount code.', async () => {
    expect.assertions(2)
    const res = await testBillRequest(
      {
        prices: [10, 20],
        quantities: [1, 2],
        country: 'IT',
        discount: 'INVALID'
      }
    )
    expect(res.statusCode).toEqual(200)
    expect(res.body.event).toBe('Schéma de réduction non reconnu.')
  })
})
