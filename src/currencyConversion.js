const fetch = require('node-fetch')

const currencyApiBaseUrl = 'https://api.exchangeratesapi.io/latest'

class CurrencyConversion {
  async getCurrencyRatesFromAPI (currencyToConvertFrom) {
    const requestUrl = currencyApiBaseUrl +
      (currencyToConvertFrom
        ? '?base=' + currencyToConvertFrom
        : '')
    const response = await fetch(requestUrl)
    const responseAsJson = await response.json()
    if (responseAsJson.error) {
      throw new Error(responseAsJson.error)
    }
    return responseAsJson.rates
  }

  async getConvertedValue (totalPrice, currencyToConvertTo, currencyToConvertFrom) {
    let answer
    try {
      const conversionRates = await this.getCurrencyRatesFromAPI(currencyToConvertFrom)
      const conversionRate = this.getConversionRate(conversionRates, currencyToConvertTo)
      answer = this.computeCurrencyConversion(totalPrice, conversionRate)
    } catch (error) {
      answer = this.handleError(error)
    }
    return answer
  }

  handleError (error) {
    return {
      event: error.message ? error.message : 'Une erreur est apparue lors du traitement de la requête.'
    }
  }

  getConversionRate (conversionRates, currencyToConvertTo) {
    const conversionRate = conversionRates[currencyToConvertTo]
    if (!conversionRate) {
      throw new Error("Le code '" + currencyToConvertTo + "' n'est pas reconnu.")
    }
    return conversionRate
  }

  computeCurrencyConversion (totalPrice, conversionRate) {
    const convertedTotal = totalPrice * conversionRate
    const convertedTotalWith2Decimals = Math.round(convertedTotal * 100) / 100
    return { convertedTotal: convertedTotalWith2Decimals }
  }
}

module.exports.CurrencyConversion = CurrencyConversion
