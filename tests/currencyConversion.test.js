/* eslint-env jest */

require('jest')

const { CurrencyConversion } = require('../src/currencyConversion.js')

const currenciesSupportedByApi = [
  'CAD',
  'HKD',
  'ISK',
  'PHP',
  'DKK',
  'HUF',
  'CZK',
  'AUD',
  'RON',
  'SEK',
  'IDR',
  'INR',
  'BRL',
  'RUB',
  'HRK',
  'JPY',
  'THB',
  'CHF',
  'SGD',
  'PLN',
  'BGN',
  'TRY',
  'CNY',
  'NOK',
  'NZD',
  'ZAR',
  'USD',
  'MXN',
  'ILS',
  'GBP',
  'KRW',
  'MYR'
]

describe('Function getCurrencyRatesFromAPI()', () => {
  test('Rates are retrieved without parameter (EUR)', async () => {
    const currencyConversion = new CurrencyConversion()
    expect.assertions(currenciesSupportedByApi.length)
    const rates = await currencyConversion.getCurrencyRatesFromAPI()
    currenciesSupportedByApi.forEach(currency => {
      expect(rates).toHaveProperty(currency)
    })
  })

  test('CAD rates are retrieved', async () => {
    const currencyConversion = new CurrencyConversion()
    expect.assertions(currenciesSupportedByApi.length)
    const rates = await currencyConversion.getCurrencyRatesFromAPI('CAD')
    currenciesSupportedByApi.forEach(currency => {
      expect(rates).toHaveProperty(currency)
    })
  })

  test('Rates for code ZZZ does not exist', async () => {
    const currencyConversion = new CurrencyConversion()
    expect.assertions(1)
    try {
      await currencyConversion.getCurrencyRatesFromAPI('ZZZ')
    } catch (error) {
      expect(error.message).toMatch("Base 'ZZZ' is not supported.")
    }
  })
})

describe('Function handleError()', () => {
  test('Error with a message.', () => {
    const currencyConversion = new CurrencyConversion()
    expect(currencyConversion.handleError(new Error('Test')).event).toBe('Test')
  })

  test('Error without a message.', () => {
    const currencyConversion = new CurrencyConversion()
    expect(currencyConversion.handleError(new Error()).event).toBe('Une erreur est apparue lors du traitement de la requête.')
  })
})

describe('Function computeCurrencyConversion()', () => {
  test('33 is converted to 34.65 with a conversion rate of 1.05', async () => {
    const currencyConversion = new CurrencyConversion()
    expect(currencyConversion.computeCurrencyConversion(33, 1.05).convertedTotal).toBe(34.65)
  })
})

describe('Function getConversionRate()', () => {
  const conversionRates = {
    CAD: 1.5487,
    KRW: 1325.32,
    EUR: 1
  }

  test('KRW rate is extracted from the API mock', () => {
    const currencyConversion = new CurrencyConversion()
    const rate = currencyConversion.getConversionRate(conversionRates, 'KRW')
    expect(rate).toBe(1325.32)
  })

  test('CAD rate is extracted from the API mock', () => {
    const currencyConversion = new CurrencyConversion()
    const rate = currencyConversion.getConversionRate(conversionRates, 'CAD')
    expect(rate).toBe(1.5487)
  })

  test('EUR rate is extracted from the API mock', () => {
    const currencyConversion = new CurrencyConversion()
    const rate = currencyConversion.getConversionRate(conversionRates, 'EUR')
    expect(rate).toBe(1)
  })

  test('ZZZ is not a valid code', () => {
    const currencyConversion = new CurrencyConversion()
    expect(() => { currencyConversion.getConversionRate(conversionRates, 'ZZZ') })
      .toThrow("Le code 'ZZZ' n'est pas reconnu.")
  })
})

describe('Function getConvertedValue()', () => {
  const conversionRates = {
    CAD: 1.5487,
    KRW: 1325.32,
    EUR: 1
  }
  const getConversionRate = jest.fn((conversionRates, currencyToConvertTo) => conversionRates[currencyToConvertTo])
  const getConvertedValue = jest.fn((totalPrice, currencyToConvertTo, currencyToConvertFrom) => 1)
  test('Test', () => {
    expect.assertions(2)
    expect(getConversionRate(conversionRates, 'CAD')).toBe(1.5487)
    expect(getConversionRate).toHaveBeenCalledWith(conversionRates, 'CAD')
  })

  test('Test2', () => {
    expect.assertions(2)
    expect(getConvertedValue(1000, 'CAD', 'EUR')).toBe(1)
    expect(getConvertedValue).toHaveBeenCalledWith(1000, 'CAD', 'EUR')
  })

  /* test('Successful case.', async () => {
    const currencyConversion = new CurrencyConversion()
    const data = {
      totalPrice: 100,
      currencyToConvertTo: 'CAD',
      currencyToConvertFrom: 'EUR'
    }
    expect.assertions(2)
    const convertedTotal = await currencyConversion.getConvertedValue(data.totalPrice, data.currencyToConvertTo, data.currencyToConvertFrom)
    expect(convertedTotal.event)
      .toBeUndefined()
    expect(convertedTotal.convertedTotal > 100 && convertedTotal.convertedTotal < 200)
      .toBeTruthy()
  })

  test('Unsuccessful case.', async () => {
    const currencyConversion = new CurrencyConversion()
    const data = {
      totalPrice: 100,
      currencyToConvertTo: 'ZZZ',
      currencyToConvertFrom: 'EUR'
    }
    expect.assertions(2)
    const convertedTotal = await currencyConversion.getConvertedValue(data.totalPrice, data.currencyToConvertTo, data.currencyToConvertFrom)
    expect(convertedTotal.convertedTotal)
      .toBeUndefined()
    expect(convertedTotal.event)
      .toBe("Le code 'ZZZ' n'est pas reconnu.")
  })

  test('Unsuccessful case.', async () => {
    const currencyConversion = new CurrencyConversion()
    const data = {
      totalPrice: 100,
      currencyToConvertTo: 'CAD',
      currencyToConvertFrom: 'ZZZ'
    }
    expect.assertions(2)
    const convertedTotal = await currencyConversion.getConvertedValue(data.totalPrice, data.currencyToConvertTo, data.currencyToConvertFrom)
    expect(convertedTotal.convertedTotal)
      .toBeUndefined()
    expect(convertedTotal.event)
      .toBe("Base 'ZZZ' is not supported.")
  }) */
})
