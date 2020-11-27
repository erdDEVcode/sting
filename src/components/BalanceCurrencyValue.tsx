import React, { useMemo } from 'react'

import { AssetValue } from '../utils/number'
import { Balance, Rate } from '../types/all'
import TokenValue from './TokenValue'

interface Props {
  className?: string,
  balance?: Balance,
  rate?: Rate,
}

const BalanceCurrencyValue: React.FunctionComponent<Props> = ({ className, balance, rate }) => {
  const { token, amount } = useMemo(() => {
    if (undefined !== balance?.amount && rate) {
      const ab = AssetValue.fromBalance(balance).toCurrencyValue(rate!)

      return {
        token: ab.getAsset().id,
        amount: ab.toString()
      }
    }

    return {}
  }, [ balance, rate ])

  return (
    <TokenValue className={className} token={token} amount={amount} />
  )
}

export default BalanceCurrencyValue

