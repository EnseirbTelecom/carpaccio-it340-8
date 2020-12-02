const { VAT } = require('./data.js')

class Bill {
  getBill (prices, quantities, country) {
    let answer
    try {
      answer = this.computeTotal(prices, quantities, country)
    } catch (error) {
      answer = this.handleError(error)
    }
    return answer
  }

  isNumber (element) {
    return !isNaN(Number(element))
  }

  computeTotal (prices, quantities, country) {
    let computedTotal = 0
    const countryVAT = VAT[country]

    if (!prices || !quantities || !country) {
      throw new Error('Les prix, quantités et pays sont obligatoires.')
    }
    if (prices.length !== quantities.length) {
      throw new Error('Il doit y avoir autant de prix que de quantités.')
    }
    if (!countryVAT) {
      throw new Error("Ce pays n'est pas reconnu.")
    }

    prices.forEach((element, index) => {
      if (this.isNumber(element) && this.isNumber(quantities[index])) {
        computedTotal += element * quantities[index]
      } else {
        throw new Error('Les prix et quantités doivent être des nombres.')
      }
    })

    computedTotal += this.computeVAT(computedTotal, countryVAT.tax)

    return { total: computedTotal }
  }

  computeVAT (total, countryVAT) {
    if (!this.isNumber(countryVAT) || !this.isNumber(total)) {
      throw new Error('Les opérandes doivent être numériques.')
    }
    return (countryVAT / 100) * total
  }

  handleError (error) {
    return {
      event: error.message ? error.message : 'An error occured.'
    }
  }
}

module.exports.Bill = Bill
