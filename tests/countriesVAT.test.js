/* eslint-env jest */

require('jest')

const { countriesVAT } = require('../src/countriesVAT.js')

test('Countries VAT contains the right values', () => {
  expect(countriesVAT).toStrictEqual({
    DE: {
      country: 'Germany',
      tax: 20
    },
    UK: {
      country: 'United Kingdom',
      tax: 21
    },
    FR: {
      country: 'France',
      tax: 20
    },
    IT: {
      country: 'Italy',
      tax: 25
    },
    ES: {
      country: 'Spain',
      tax: 19
    },
    PL: {
      country: 'Poland',
      tax: 21
    },
    RO: {
      country: 'Romania',
      tax: 20
    },
    NL: {
      country: 'Netherlands',
      tax: 20
    },
    BE: {
      country: 'Belgium',
      tax: 24
    },
    EL: {
      country: 'Greece',
      tax: 20
    },
    CZ: {
      country: 'Czech Republic',
      tax: 19
    },
    PT: {
      country: 'Portugal',
      tax: 23
    },
    HU: {
      country: 'Hungary',
      tax: 27
    },
    SE: {
      country: 'Sweden',
      tax: 23
    },
    AT: {
      country: 'Austria',
      tax: 22
    },
    BG: {
      country: 'Bulgaria',
      tax: 21
    },
    DK: {
      country: 'Denmark',
      tax: 21
    },
    FI: {
      country: 'Finland',
      tax: 17
    },
    SK: {
      country: 'Slovakia',
      tax: 18
    },
    IE: {
      country: 'Ireland',
      tax: 21
    },
    HR: {
      country: 'Croatia',
      tax: 23
    },
    LT: {
      country: 'Lithuania',
      tax: 23
    },
    SI: {
      country: 'Slovenia',
      tax: 24
    },
    LV: {
      country: 'Latvia',
      tax: 20
    },
    EE: {
      country: 'Estonia',
      tax: 22
    },
    CY: {
      country: 'Cyprus',
      tax: 21
    },
    LU: {
      country: 'Luxembourg',
      tax: 25
    },
    MT: {
      country: 'Malta',
      tax: 20
    }
  })
})
