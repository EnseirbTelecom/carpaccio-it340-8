/* eslint-env jest */

require('jest')

const { Discount } = require('../src/discount.js')

/* TESTS UNITAIRES */

/* ******************************** **
** Tests function computePercentage **
** ******************************** */
test('computePercentage: 30% of 100 is 30.', () => {
  const discount = new Discount()
  expect(discount.computePercentage(100, 30)).toBe(30)
})

test('computePercentage: 25% of 500.20 is 125.05.', () => {
  const discount = new Discount()
  expect(discount.computePercentage(500.20, 25)).toBe(125.05)
})

/* ******************************** **
** Tests function computeNoDiscount **
** ******************************** */
test('computeNoDiscount: No discount is 0.', () => {
  const discount = new Discount()
  expect(discount.computeNoDiscount()).toBe(0)
})

/* ********************************** **
** Tests function computeFlatDiscount **
** ********************************** */
test('computeFlatDiscount: Flat discount of 100 is 30.', () => {
  const discount = new Discount()
  expect(discount.computeFlatDiscount(100)).toBe(30)
})

test('computeFlatDiscount: Flat discount of 500.20 is 150.06.', () => {
  const discount = new Discount()
  expect(discount.computeFlatDiscount(500.20)).toBe(150.06)
})

/* *********************************** **
** Tests function computeFixedDiscount **
** *********************************** */
test('computeFixedDiscount: Fixed discount of 99 is 0.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(99)).toBe(0)
})

test('computeFixedDiscount: Fixed discount of 100 is 10.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(100)).toBe(10)
})

test('computeFixedDiscount: Fixed discount of 399 is 10.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(399)).toBe(10)
})

test('computeFixedDiscount: Fixed discount of 400 is 50.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(400)).toBe(50)
})

test('computeFixedDiscount: Fixed discount of 999 is 50.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(999)).toBe(50)
})

test('computeFixedDiscount: Fixed discount of 1000 is 200.', () => {
  const discount = new Discount()
  expect(discount.computeFixedDiscount(1000)).toBe(200)
})

/* ***************************************** **
** Tests function computeProgressiveDiscount **
** ***************************************** */
test('computeProgressiveDiscount: Progressive discount of 999 is 0.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(999)).toBe(0)
})

test('computeProgressiveDiscount: Progressive discount of 1000 is 30.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(1000)).toBe(30)
})

test('computeProgressiveDiscount: Progressive discount of 4999 is 149.97.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(4999)).toBe(149.97)
})

test('computeProgressiveDiscount: Progressive discount of 5000 is 250.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(5000)).toBe(250)
})

test('computeProgressiveDiscount: Progressive discount of 6999 is 349.95.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(6999)).toBe(349.95)
})

test('computeProgressiveDiscount: Progressive discount of 7000 is 490.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(7000)).toBe(490)
})

test('computeProgressiveDiscount: Progressive discount of 9999 is 699.93.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(9999)).toBe(699.93)
})

test('computeProgressiveDiscount: Progressive discount of 10000 is 1000.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(10000)).toBe(1000)
})

test('computeProgressiveDiscount: Progressive discount of 49999 is 4999.9.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(49999)).toBe(4999.9)
})

test('computeProgressiveDiscount: Progressive discount of 50000 is 7500.', () => {
  const discount = new Discount()
  expect(discount.computeProgressiveDiscount(50000)).toBe(7500)
})

/* ************************** **
** Tests function handleError **
** ************************** */
test('handleError: Error with a message.', () => {
  const discount = new Discount()
  const log = console.log
  console.log = () => {}
  expect(discount.handleError(new Error('Test')).event).toBe('Test')
  console.log = log
})

test('handleError: Error without a message.', () => {
  const discount = new Discount()
  const log = console.log
  console.log = () => {}
  expect(discount.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
  console.log = log
})

/* ****************************** **
** Tests function computeDiscount **
** ****************************** */
test('computeDiscount: Discount is equal to 0.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 10000,
    discountType: 'NO_DISCOUNT'
  }
  expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(0)
})

test('computeDiscount: Discount is equal to 1000.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 10000,
    discountType: 'PROGRESSIVE_DISCOUNT'
  }
  expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(1000)
})

test('computeDiscount: Discount is equal to 30.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 100,
    discountType: 'FLAT_DISCOUNT'
  }
  expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(30)
})

test('computeDiscount: Discount is equal to 10.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 399,
    discountType: 'FIXED_DISCOUNT'
  }
  expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(10)
})

test('computeDiscount: Invalid discount code.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 100,
    discountType: 'TEST'
  }
  expect(() => { discount.computeDiscount(data.totalPrice, data.discountType) })
    .toThrow('Schéma de réduction non reconnu.')
})

/* ************************** **
** Tests function getDiscount **
** ************************** */
test('getDiscount: Successful case.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 100,
    discountType: 'FLAT_DISCOUNT'
  }
  const log = console.log
  console.log = () => {}
  expect(discount.getDiscount(data.totalPrice, data.discountType).event).toBeUndefined()
  expect(discount.getDiscount(data.totalPrice, data.discountType).discountValue).toBe(30)
  console.log = log
})

test('getDiscount: Unsuccessful case.', () => {
  const discount = new Discount()
  const data = {
    totalPrice: 100,
    discountType: 'TEST'
  }
  const log = console.log
  console.log = () => {}
  expect(discount.getDiscount(data.totalPrice, data.discountType).discountValue).toBeUndefined()
  expect(discount.getDiscount(data.totalPrice, data.discountType).event).toBe('Schéma de réduction non reconnu.')
  console.log = log
})
