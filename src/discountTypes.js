const discountTypes = {
  NO_DISCOUNT: {
    CODE: 'NO_DISCOUNT',
    DISCOUNT_FLAT: 0
  },
  PROGRESSIVE_DISCOUNT: {
    CODE: 'PROGRESSIVE_DISCOUNT',
    SORTED_TIERS: [
      {
        THRESHOLD_MAX: 50000,
        DISCOUNT_PERCENTAGE: 15
      },
      {
        THRESHOLD_MAX: 10000,
        DISCOUNT_PERCENTAGE: 10
      },
      {
        THRESHOLD_MAX: 7000,
        DISCOUNT_PERCENTAGE: 7
      },
      {
        THRESHOLD_MAX: 5000,
        DISCOUNT_PERCENTAGE: 5
      },
      {
        THRESHOLD_MAX: 1000,
        DISCOUNT_PERCENTAGE: 3
      }
    ]
  },
  FLAT_DISCOUNT: {
    CODE: 'FLAT_DISCOUNT',
    DISCOUNT_PERCENTAGE: 30
  },
  FIXED_DISCOUNT: {
    CODE: 'FIXED_DISCOUNT',
    SORTED_TIERS: [
      {
        THRESHOLD_MIN: 100,
        THRESHOLD_MAX: 400,
        DISCOUNT_FLAT: 10
      },
      {
        THRESHOLD_MIN: 400,
        THRESHOLD_MAX: 1000,
        DISCOUNT_FLAT: 50
      },
      {
        THRESHOLD_MIN: 1000,
        THRESHOLD_MAX: Number.MAX_VALUE,
        DISCOUNT_FLAT: 200
      }
    ]
  }
}

module.exports.discountTypes = discountTypes
