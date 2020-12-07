/* eslint-env jest */

require('jest')

const { Bill } = require('../src/bill.js')

/* TESTS UNITAIRES */

describe('Function computeVAT()', () => {
  test('VAT is equal to 25', () => {
    const bill = new Bill()
    expect(bill.computeVAT(100, 25)).toBe(25)
  })

  test("Total isn't a number", () => {
    const bill = new Bill()
    expect(() => { bill.computeVAT('Test', 20) })
      .toThrow('Les opérandes doivent être numériques.')
  })

  test("Country VAT isn't a number", () => {
    const bill = new Bill()
    expect(() => { bill.computeVAT(100, 'Test') })
      .toThrow('Les opérandes doivent être numériques.')
  })
})

describe('Function computeTotal()', () => {
  test('Total is equal to 62.5.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(62.5)
  })

  test('Total is equal to 62.5.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [2, 4],
      country: 'FI'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(117)
  })

  test('Total with flat discount is equal to 43.75.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      discount: 'FLAT_DISCOUNT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(43.75)
  })

  test('Total with no discount is equal to 375.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'NO_DISCOUNT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(375)
  })

  test('Total with fixed discount is equal to 365.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'FIXED_DISCOUNT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(365)
  })

  test('Total with flat discount is equal to 262.5.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'FLAT_DISCOUNT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(262.5)
  })

  test('Total with progressive discount is equal to 3637.5.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [100, 100],
      country: 'IT',
      discount: 'PROGRESSIVE_DISCOUNT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(3637.5)
  })

  test('Total is lower than 125 but higher than 62.5 in CAD.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      currency: 'CAD'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total > 62.5 && computedTotal.total < 125).toBeTruthy()
  })

  test('Total with progressive discount is lower than 7275 but higher than 3637.5 in CAD.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [100, 100],
      country: 'IT',
      discount: 'PROGRESSIVE_DISCOUNT',
      currency: 'CAD'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total > 3637.5 && 3637.5 < 7275).toBeTruthy()
  })

  test('Invalid discount code.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      discount: 'INVALID'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Schéma de réduction non reconnu.')
    }
  })

  test('No country.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2]
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Les prix, quantités et pays sont obligatoires.')
    }
  })

  test('Unknown country.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'ZZ'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch("Ce pays n'est pas reconnu.")
    }
  })

  test('No prices nor quantities.', async () => {
    const bill = new Bill()
    const data = {
      prices: [],
      quantities: [],
      country: 'IT'
    }
    const computedTotal = await bill.computeTotal(data)
    expect(computedTotal.total).toBe(0)
  })

  test('Diverging number of prices and quantities.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      quantities: [1, 2],
      country: 'IT'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Il doit y avoir autant de prix que de quantités.')
    }
  })

  test('Prices missing.', async () => {
    const bill = new Bill()
    const data = {
      quantities: [1, 2],
      country: 'IT'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Les prix, quantités et pays sont obligatoires.')
    }
  })

  test('Quantities missing.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      country: 'IT'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Les prix, quantités et pays sont obligatoires.')
    }
  })

  test('Not numerical prices.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 'Test', 30],
      quantities: [1, 2, 3],
      country: 'IT'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Les prix et quantités doivent être des nombres.')
    }
  })

  test('Not numerical quantities.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      quantities: [1, 'Test', 3],
      country: 'IT'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch('Les prix et quantités doivent être des nombres.')
    }
  })

  test('Invalid currency code.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      currency: 'ZZZ'
    }
    expect.assertions(1)
    try {
      await bill.computeTotal(data)
    } catch (error) {
      expect(error.message).toMatch("Le code 'ZZZ' n'est pas reconnu.")
    }
  })
})

describe('Function handleError()', () => {
  test('Error with a message.', () => {
    const bill = new Bill()
    expect(bill.handleError(new Error('Test')).event).toBe('Test')
  })

  test('Error without a message.', () => {
    const bill = new Bill()
    expect(bill.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
  })
})

describe('Function isNumber()', () => {
  test('Numbers are recognized as so.', () => {
    const bill = new Bill()
    expect(bill.isNumber(8)).toBeTruthy()
  })

  test('Numbers are recognized as so.', () => {
    const bill = new Bill()
    expect(bill.isNumber(8)).toBeTruthy()
  })

  test('Strings aren\'t numbers.', () => {
    const bill = new Bill()
    expect(bill.isNumber('Test')).toBeFalsy()
  })

  test('Undefined aren\'t numbers.', () => {
    const bill = new Bill()
    expect(bill.isNumber(undefined)).toBeFalsy()
  })
})

describe('Function getBill()', () => {
  test('Successful case.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT'
    }
    const computedTotal = await bill.getBill(data)
    expect(computedTotal.event).toBeUndefined()
    expect(computedTotal.total).toBe(62.5)
  })

  test('Unsuccessful case.', async () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [],
      country: 'IT'
    }
    const computedTotal = await bill.getBill(data)
    expect(computedTotal.total).toBeUndefined()
    expect(computedTotal.event).toBe('Il doit y avoir autant de prix que de quantités.')
  })
})
