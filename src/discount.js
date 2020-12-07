const { discountTypes } = require('./discountTypes.js')

class Discount {
  getDiscount (totalPrice, discountType) {
    let answer
    try {
      answer = this.computeDiscount(totalPrice, discountType)
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

  computeDiscount (totalPrice, discountType) {
    let discountValue
    switch (discountType) {
      case discountTypes.NO_DISCOUNT.CODE:
        discountValue = this.computeNoDiscount()
        break
      case discountTypes.PROGRESSIVE_DISCOUNT.CODE:
        discountValue = this.computeProgressiveDiscount(totalPrice)
        break
      case discountTypes.FLAT_DISCOUNT.CODE:
        discountValue = this.computeFlatDiscount(totalPrice)
        break
      case discountTypes.FIXED_DISCOUNT.CODE:
        discountValue = this.computeFixedDiscount(totalPrice)
        break
      default:
        throw new Error('Schéma de réduction non reconnu.')
    }
    return {
      discountValue: discountValue
    }
  }

  computeNoDiscount () {
    return discountTypes.NO_DISCOUNT.DISCOUNT_FLAT
  }

  computeProgressiveDiscount (totalPrice) {
    for (const discountTier of discountTypes.PROGRESSIVE_DISCOUNT.SORTED_TIERS) {
      if (totalPrice >= discountTier.THRESHOLD_MAX) {
        return this.computePercentage(totalPrice, discountTier.DISCOUNT_PERCENTAGE)
      }
    }
    return 0
  }

  computeFlatDiscount (totalPrice) {
    return this.computePercentage(totalPrice, discountTypes.FLAT_DISCOUNT.DISCOUNT_PERCENTAGE)
  }

  computeFixedDiscount (totalPrice) {
    for (const discountTier of discountTypes.FIXED_DISCOUNT.SORTED_TIERS) {
      if (totalPrice < discountTier.THRESHOLD_MAX && totalPrice >= discountTier.THRESHOLD_MIN) {
        return discountTier.DISCOUNT_FLAT
      }
    }
    return 0
  }

  computePercentage (total, percentage) {
    const discountValue = (percentage / 100) * total
    const discountValueWith2Decimals = Math.round(discountValue * 100) / 100
    return discountValueWith2Decimals
  }
}

module.exports.Discount = Discount
