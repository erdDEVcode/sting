import { useState, useEffect } from 'react'

import { doInterval } from '../utils/timer'
import { Network, TransactionOnChain } from '../types/all'

interface UseTrackTransactionResult {
  tx?: TransactionOnChain,
  error?: string,
}

export const useTrackTransaction = (network: Network, txHash: string): UseTrackTransactionResult => {
  const [tx, setTx] = useState<TransactionOnChain>()
  const [error, setError] = useState()

  useEffect(() => {
    const timer = doInterval(async () => {
      if (!network.connection || network.failure) {
      } else {
        try {
          setTx(await network.connection.getTransaction(txHash))
          setError(undefined)
        } catch (err) {
          console.warn(err)
          setTx(undefined)
          setError(err.message)
        }
      }
    }, { delayMs: 3000, executeImmediately: false /* give time for tx to show up on network */ })

    return () => clearInterval(timer)
  }, [setTx, network, txHash])

  return { tx, error }
}