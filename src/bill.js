const { countriesVAT } = require('./countriesVAT.js')
const { Discount } = require('./discount.js')

class Bill {
  constructor () {
    this.discount = new Discount()
  }

  getBill (request) {
    let answer
    try {
      answer = this.computeTotal(request)
    } catch (error) {
      answer = this.handleError(error)
    }
    return answer
  }

  isNumber (element) {
    return !isNaN(Number(element))
  }

  computeTotal (request) {
    const prices = request.prices
    const quantities = request.quantities
    const country = request.country
    const discountType = request.discount ? request.discount : 'NO_DISCOUNT'

    let computedTotal = 0
    const countryVAT = countriesVAT[country]

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

    const computedDiscount = this.discount.getDiscount(computedTotal, discountType)
    if (computedDiscount.event) {
      throw new Error(computedDiscount.event)
    }
    computedTotal -= computedDiscount.discountValue

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
      event: error.message ? error.message : 'Une erreur est apparue lors du traitement de la requête.'
    }
  }
}

module.exports.Bill = Bill
