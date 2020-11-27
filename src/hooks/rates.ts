import { useEffect, useState } from 'react'

import { rateApi } from '../utils/rateApi'
import { Rates} from '../types/all'
import { doInterval } from '../utils/timer'

interface UseRatesResult {
  rates: Rates,
}

export const useRates = (): UseRatesResult => {
  const [ rates, setRates ] = useState<Rates>({})

  // rates timer
  useEffect(() => {
    const timer = doInterval(async () => {
      try {
        setRates(await rateApi.getRates('usd'))
      } catch (err) {
        console.error(`Error fetching rates: ${err.message}`)
        // TODO: show error to user
      }
    }, { delayMs: 30000, executeImmediately: true })

    return () => clearInterval(timer)
  }, [])

  return { rates }
}
