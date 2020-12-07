/* eslint-env jest */

require('jest')

const { Bill } = require('../src/bill.js')

/* TESTS UNITAIRES */

/* ************************* **
** Tests function computeVAT **
** ************************* */
test('computeVAT: VAT is equal to 25', () => {
  const bill = new Bill()
  expect(bill.computeVAT(100, 25)).toBe(25)
})

test("computeVAT: Total isn't a number", () => {
  const bill = new Bill()
  expect(() => { bill.computeVAT('Test', 20) })
    .toThrow('Les opérandes doivent être numériques.')
})

test("computeVAT: Country VAT isn't a number", () => {
  const bill = new Bill()
  expect(() => { bill.computeVAT(100, 'Test') })
    .toThrow('Les opérandes doivent être numériques.')
})

/* *************************** **
** Tests function computeTotal **
** *************************** */
test('computeTotal: Total is equal to 62.5.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [1, 2],
    country: 'IT'
  }
  expect(bill.computeTotal(data).total).toBe(62.5)
})

test('computeTotal: Total is equal to 62.5.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [2, 4],
    country: 'FI'
  }
  expect(bill.computeTotal(data).total).toBe(117)
})

test('computeTotal: Total with flat discount is equal to 43.75.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [1, 2],
    country: 'IT',
    discount: 'FLAT_DISCOUNT'
  }
  expect(bill.computeTotal(data).total).toBe(43.75)
})

test('computeTotal: Total with no discount is equal to 375.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [10, 10],
    country: 'IT',
    discount: 'NO_DISCOUNT'
  }
  expect(bill.computeTotal(data).total).toBe(375)
})

test('computeTotal: Total with fixed discount is equal to 365.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [10, 10],
    country: 'IT',
    discount: 'FIXED_DISCOUNT'
  }
  expect(bill.computeTotal(data).total).toBe(365)
})

test('computeTotal: Total with flat discount is equal to 262.5.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [10, 10],
    country: 'IT',
    discount: 'FLAT_DISCOUNT'
  }
  expect(bill.computeTotal(data).total).toBe(262.5)
})

test('computeTotal: Total with flat discount is equal to 3637.5.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [100, 100],
    country: 'IT',
    discount: 'PROGRESSIVE_DISCOUNT'
  }
  expect(bill.computeTotal(data).total).toBe(3637.5)
})

test('computeTotal: Invalid discount code.', () => {
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

test('computeTotal: No country.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [1, 2]
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Les prix, quantités et pays sont obligatoires.')
})

test('computeTotal: Unknown country.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [1, 2],
    country: 'ZZ'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow("Ce pays n'est pas reconnu.")
})

test('computeTotal: No prices nor quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [],
    quantities: [],
    country: 'IT'
  }
  expect(bill.computeTotal(data).total).toBe(0)
})

test('computeTotal: Diverging number of prices and quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30],
    quantities: [1, 2],
    country: 'IT'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Il doit y avoir autant de prix que de quantités.')
})

test('computeTotal: Prices missing.', () => {
  const bill = new Bill()
  const data = {
    quantities: [1, 2],
    country: 'IT'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Les prix, quantités et pays sont obligatoires.')
})

test('computeTotal: Quantities missing.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30],
    country: 'IT'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Les prix, quantités et pays sont obligatoires.')
})

test('computeTotal: Not numerical prices.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 'Test', 30],
    quantities: [1, 2, 3],
    country: 'IT'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Les prix et quantités doivent être des nombres.')
})

test('computeTotal: Not numerical quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30],
    quantities: [1, 'Test', 3],
    country: 'IT'
  }
  expect(() => { bill.computeTotal(data) })
    .toThrow('Les prix et quantités doivent être des nombres.')
})

/* ************************** **
** Tests function handleError **
** ************************** */
test('handleError: Error with a message.', () => {
  const bill = new Bill()
  const log = console.log
  console.log = () => {}
  expect(bill.handleError(new Error('Test')).event).toBe('Test')
  console.log = log
})

test('handleError: Error without a message.', () => {
  const bill = new Bill()
  const log = console.log
  console.log = () => {}
  expect(bill.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
  console.log = log
})

/* *********************** **
** Tests function isNumber **
** *********************** */
test('isNumber: Numbers are recognized as so.', () => {
  const bill = new Bill()
  expect(bill.isNumber(8)).toBeTruthy()
})

test('isNumber: Numbers are recognized as so.', () => {
  const bill = new Bill()
  expect(bill.isNumber(8)).toBeTruthy()
})

test('isNumber: Strings aren\'t numbers.', () => {
  const bill = new Bill()
  expect(bill.isNumber('Test')).toBeFalsy()
})

test('isNumber: Undefined aren\'t numbers.', () => {
  const bill = new Bill()
  expect(bill.isNumber(undefined)).toBeFalsy()
})

/* ********************** **
** Tests function getBill **
** ********************** */
test('getBill: Successful case.', () => {
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

test('getBill: Unsuccessful case.', () => {
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
