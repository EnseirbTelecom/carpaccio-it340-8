/* eslint-env jest */

require('jest')

const { Discount } = require('../src/discount.js')

/* TESTS UNITAIRES */

describe('Function computePercentage()', () => {
  test('30% of 100 is 30.', () => {
    const discount = new Discount()
    expect(discount.computePercentage(100, 30)).toBe(30)
  })

  test('25% of 500.20 is 125.05.', () => {
    const discount = new Discount()
    expect(discount.computePercentage(500.20, 25)).toBe(125.05)
  })
})

describe('Function computeNoDiscount()', () => {
  test('No discount is 0.', () => {
    const discount = new Discount()
    expect(discount.computeNoDiscount()).toBe(0)
  })
})

describe('Function computeFlatDiscount()', () => {
  test('Flat discount of 100 is 30.', () => {
    const discount = new Discount()
    expect(discount.computeFlatDiscount(100)).toBe(30)
  })

  test('Flat discount of 500.20 is 150.06.', () => {
    const discount = new Discount()
    expect(discount.computeFlatDiscount(500.20)).toBe(150.06)
  })
})

describe('Function computeFixedDiscount()', () => {
  test('Fixed discount of 99 is 0.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(99)).toBe(0)
  })

  test('Fixed discount of 100 is 10.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(100)).toBe(10)
  })

  test('Fixed discount of 399 is 10.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(399)).toBe(10)
  })

  test('Fixed discount of 400 is 50.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(400)).toBe(50)
  })

  test('Fixed discount of 999 is 50.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(999)).toBe(50)
  })

  test('Fixed discount of 1000 is 200.', () => {
    const discount = new Discount()
    expect(discount.computeFixedDiscount(1000)).toBe(200)
  })
})

describe('Function computeProgressiveDiscount()', () => {
  test('Progressive discount of 999 is 0.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(999)).toBe(0)
  })

  test('Progressive discount of 1000 is 30.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(1000)).toBe(30)
  })

  test('Progressive discount of 4999 is 149.97.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(4999)).toBe(149.97)
  })

  test('Progressive discount of 5000 is 250.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(5000)).toBe(250)
  })

  test('Progressive discount of 6999 is 349.95.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(6999)).toBe(349.95)
  })

  test('Progressive discount of 7000 is 490.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(7000)).toBe(490)
  })

  test('Progressive discount of 9999 is 699.93.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(9999)).toBe(699.93)
  })

  test('Progressive discount of 10000 is 1000.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(10000)).toBe(1000)
  })

  test('Progressive discount of 49999 is 4999.9.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(49999)).toBe(4999.9)
  })

  test('Progressive discount of 50000 is 7500.', () => {
    const discount = new Discount()
    expect(discount.computeProgressiveDiscount(50000)).toBe(7500)
  })
})

describe('Function handleError()', () => {
  test('Error with a message.', () => {
    const discount = new Discount()
    expect(discount.handleError(new Error('Test')).event).toBe('Test')
  })

  test('Error without a message.', () => {
    const discount = new Discount()
    expect(discount.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
  })
})

describe('Function computeDiscount()', () => {
  test('Discount is equal to 0.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 10000,
      discountType: 'NO_DISCOUNT'
    }
    expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(0)
  })

  test('Discount is equal to 1000.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 10000,
      discountType: 'PROGRESSIVE_DISCOUNT'
    }
    expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(1000)
  })

  test('Discount is equal to 30.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 100,
      discountType: 'FLAT_DISCOUNT'
    }
    expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(30)
  })

  test('Discount is equal to 10.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 399,
      discountType: 'FIXED_DISCOUNT'
    }
    expect(discount.computeDiscount(data.totalPrice, data.discountType).discountValue).toBe(10)
  })

  test('Invalid discount code.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 100,
      discountType: 'TEST'
    }
    expect(() => { discount.computeDiscount(data.totalPrice, data.discountType) })
      .toThrow('Schéma de réduction non reconnu.')
  })
})

describe('Function getDiscount()', () => {
  test('Successful case.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 100,
      discountType: 'FLAT_DISCOUNT'
    }
    expect(discount.getDiscount(data.totalPrice, data.discountType).event).toBeUndefined()
    expect(discount.getDiscount(data.totalPrice, data.discountType).discountValue).toBe(30)
  })

  test('Unsuccessful case.', () => {
    const discount = new Discount()
    const data = {
      totalPrice: 100,
      discountType: 'TEST'
    }
    expect(discount.getDiscount(data.totalPrice, data.discountType).discountValue).toBeUndefined()
    expect(discount.getDiscount(data.totalPrice, data.discountType).event).toBe('Schéma de réduction non reconnu.')
  })
})
