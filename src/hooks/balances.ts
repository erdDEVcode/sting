import { useMemo, useEffect, useState } from 'react'

import { doInterval } from '../utils/timer'
import { Wallet, Network, Balances } from '../types/all'

interface UseBalancesResult {
  balances: Balances,
}

export const useBalances = (wallet?: Wallet, network?: Network): UseBalancesResult => {
  const [balances, setBalances] = useState<Balances>({})

  const primaryToken = useMemo(() => network ? network.endpoint.primaryToken : null, [ network ])

  // wallet balance timer
  useEffect(() => {
    const timer = doInterval(async () => {
      if (wallet && primaryToken && network?.connection && !(network.failure)) {
        const address = wallet.address()
        try {
          const ret = await network.connection.getAddress(address)
          const { balance } = ret
          setBalances({
            [primaryToken]: {
              token: primaryToken,
              amount: balance,
            }
          })
        } catch (err) {
          console.error(`Error fetching balance: ${err.message}`)
          // TODO: notify user somehow
        }
      }
      // fetch latest balance for wallet
    }, { delayMs: 5000, executeImmediately: true })

    return () => clearInterval(timer)
  }, [wallet, network, primaryToken])

  return { balances }
}
