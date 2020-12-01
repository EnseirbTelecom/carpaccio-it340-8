class Bill {
  getBill (prices, quantities) {
    let answer
    try {
      answer = this.computeTotal(prices, quantities)
    } catch (error) {
      answer = this.handleError(error)
    }
    return answer
  }

  isNumber (element) {
    return !isNaN(Number(element))
  }

  computeTotal (prices, quantities) {
    const computedTotal = {
      total: 0
    }

    if (!prices || !quantities) {
      throw new Error('Les prix et quantités sont obligatoires.')
    }
    if (prices.length !== quantities.length) {
      throw new Error('Il doit y avoir autant de prix que de quantités.')
    }

    prices.forEach((element, index) => {
      if (this.isNumber(element) && this.isNumber(quantities[index])) {
        computedTotal.total += element * quantities[index]
      } else {
        throw new Error('Les prix et quantités doivent être des nombres.')
      }
    })

    return computedTotal
  }

  handleError (error) {
    return {
      event: error.message ? error.message : 'An error occured.'
    }
  }
}

module.exports.Bill = Bill
