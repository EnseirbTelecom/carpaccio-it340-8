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
  test('Total is equal to 62.5.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT'
    }
    expect(bill.computeTotal(data).total).toBe(62.5)
  })

  test('Total is equal to 62.5.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [2, 4],
      country: 'FI'
    }
    expect(bill.computeTotal(data).total).toBe(117)
  })

  test('Total with flat discount is equal to 43.75.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      discount: 'FLAT_DISCOUNT'
    }
    expect(bill.computeTotal(data).total).toBe(43.75)
  })

  test('Total with no discount is equal to 375.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'NO_DISCOUNT'
    }
    expect(bill.computeTotal(data).total).toBe(375)
  })

  test('Total with fixed discount is equal to 365.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'FIXED_DISCOUNT'
    }
    expect(bill.computeTotal(data).total).toBe(365)
  })

  test('Total with flat discount is equal to 262.5.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [10, 10],
      country: 'IT',
      discount: 'FLAT_DISCOUNT'
    }
    expect(bill.computeTotal(data).total).toBe(262.5)
  })

  test('Total with flat discount is equal to 3637.5.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [100, 100],
      country: 'IT',
      discount: 'PROGRESSIVE_DISCOUNT'
    }
    expect(bill.computeTotal(data).total).toBe(3637.5)
  })

  test('Invalid discount code.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT',
      discount: 'INVALID'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Schéma de réduction non reconnu.')
  })

  test('No country.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2]
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Les prix, quantités et pays sont obligatoires.')
  })

  test('Unknown country.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'ZZ'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow("Ce pays n'est pas reconnu.")
  })

  test('No prices nor quantities.', () => {
    const bill = new Bill()
    const data = {
      prices: [],
      quantities: [],
      country: 'IT'
    }
    expect(bill.computeTotal(data).total).toBe(0)
  })

  test('Diverging number of prices and quantities.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      quantities: [1, 2],
      country: 'IT'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Il doit y avoir autant de prix que de quantités.')
  })

  test('Prices missing.', () => {
    const bill = new Bill()
    const data = {
      quantities: [1, 2],
      country: 'IT'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Les prix, quantités et pays sont obligatoires.')
  })

  test('Quantities missing.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      country: 'IT'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Les prix, quantités et pays sont obligatoires.')
  })

  test('Not numerical prices.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 'Test', 30],
      quantities: [1, 2, 3],
      country: 'IT'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Les prix et quantités doivent être des nombres.')
  })

  test('Not numerical quantities.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20, 30],
      quantities: [1, 'Test', 3],
      country: 'IT'
    }
    expect(() => { bill.computeTotal(data) })
      .toThrow('Les prix et quantités doivent être des nombres.')
  })
})

describe('Function handleError()', () => {
  test('Error with a message.', () => {
    const bill = new Bill()
    const log = console.log
    console.log = () => {}
    expect(bill.handleError(new Error('Test')).event).toBe('Test')
    console.log = log
  })

  test('Error without a message.', () => {
    const bill = new Bill()
    const log = console.log
    console.log = () => {}
    expect(bill.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
    console.log = log
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
  test('Successful case.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [1, 2],
      country: 'IT'
    }
    const log = console.log
    console.log = () => {}
    expect(bill.getBill(data).event).toBeUndefined()
    expect(bill.getBill(data).total).toBe(62.5)
    console.log = log
  })

  test('Unsuccessful case.', () => {
    const bill = new Bill()
    const data = {
      prices: [10, 20],
      quantities: [],
      country: 'IT'
    }
    const log = console.log
    console.log = () => {}
    expect(bill.getBill(data).total).toBeUndefined()
    expect(bill.getBill(data).event).toBe('Il doit y avoir autant de prix que de quantités.')
    console.log = log
  })
})
