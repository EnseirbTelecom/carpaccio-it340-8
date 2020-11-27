/* eslint-env jest */

require('jest')

const { Bill } = require('../src/bill.js')

/* TESTS UNITAIRES */

/* *************************** **
** Tests function computeTotal **
** *************************** */
test('computeTotal: Total is equal to 50.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: [1, 2]
  }
  expect(bill.computeTotal(data.prices, data.quantities).total).toBe(50)
})

test('computeTotal: No prices nor quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [],
    quantities: []
  }
  expect(bill.computeTotal(data.prices, data.quantities).total).toBe(0)
})

test('computeTotal: Diverging number of prices and quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30],
    quantities: [1, 2]
  }
  expect(() => { bill.computeTotal(data.prices, data.quantities) })
    .toThrow('Il doit y avoir autant de prix que de quantités.')
})

test('computeTotal: Prices missing.', () => {
  const bill = new Bill()
  const data = {
    quantities: [1, 2]
  }
  expect(() => { bill.computeTotal(data.prices, data.quantities) })
    .toThrow('Les prix et quantités sont obligatoires.')
})

test('computeTotal: Quantities missing.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30]
  }
  expect(() => { bill.computeTotal(data.prices, data.quantities) })
    .toThrow('Les prix et quantités sont obligatoires.')
})

test('computeTotal: Not numerical prices.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 'Test', 30],
    quantities: [1, 2, 3]
  }
  expect(() => { bill.computeTotal(data.prices, data.quantities) })
    .toThrow('Les prix et quantités doivent être des nombres.')
})

test('computeTotal: Not numerical quantities.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20, 30],
    quantities: [1, 'Test', 3]
  }
  expect(() => { bill.computeTotal(data.prices, data.quantities) })
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
  expect(bill.handleError(new Error()).event).toBe('An error occured.')
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
    quantities: [1, 2]
  }
  const log = console.log
  console.log = () => {}
  expect(bill.getBill(data.prices, data.quantities).event).toBeUndefined()
  expect(bill.getBill(data.prices, data.quantities).total).toBe(50)
  console.log = log
})

test('getBill: Unsuccessful case.', () => {
  const bill = new Bill()
  const data = {
    prices: [10, 20],
    quantities: []
  }
  const log = console.log
  console.log = () => {}
  expect(bill.getBill(data.prices, data.quantities).total).toBeUndefined()
  expect(bill.getBill(data.prices, data.quantities).event).toBe('Il doit y avoir autant de prix que de quantités.')
  console.log = log
})
