import qs from 'querystring'
import { Api } from 'elrondjs'
import { data } from 'elrond-data'

import _ from './lodash'
import { Rates } from '../types/all'

class RateApi extends Api {
  _tokenIds: string[]
  _rateApiNames: string[]

  constructor() {
    super('https://api.coingecko.com/api/v3')
    
    const asArray = Object.values(data.getTokens())
    this._tokenIds = asArray.map(({ id }) => id)
    this._rateApiNames = asArray.reduce((m, { rateApiName }) => {
      if (rateApiName) {
        return m.concat(rateApiName)
      } else {
        return m
      }
    }, ([] as string[]))
  }

  async getRates(currency: string): Promise<Rates> {
    const { rateApiName: currencyId, decimals: multiplier } = data.getToken(currency)

    const qry = qs.stringify({
      ids: this._rateApiNames.join(','),
      vs_currencies: currencyId!,
    })

    const calldata = await this._call(`/simple/price?${qry}`)

    return this._tokenIds.reduce((m, id) => {
      const r = data.getToken(id).rateApiName

      let value = parseFloat(_.get(calldata, `${r}.${currencyId}`))
      if (multiplier) {
        value = parseInt(`${value * Math.pow(10, multiplier)}`, 10)
      }

      ; (m as Rates)[id] = {
        token: id,
        currency,
        value: Number.isNaN(value) ? value : `${value}`,
      }

      return m
    }, {})
  }
}

export const rateApi = new RateApi()