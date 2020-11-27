import React from 'react'

import { useBalances, useDelegations, useRates } from '../hooks'
import { Wallet, Network, Balances, Delegation, Rates } from '../types/all'

export interface WalletContextValue {
  wallet?: Wallet,
  balances: Balances,
  delegation?: Delegation,
  rates: Rates,
}

const WalletContext = React.createContext({} as WalletContextValue)

interface Props {
  activeWallet?: Wallet,
  network?: Network | null,
}

export const WalletProvider: React.FunctionComponent<Props> = ({ children, activeWallet, network }) => {
  const { balances } = useBalances(activeWallet, network || undefined)
  const { delegation } = useDelegations(activeWallet, network || undefined)
  const { rates } = useRates()

  return (
    <WalletContext.Provider value={{
      wallet: activeWallet,
      balances,
      delegation,
      rates,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export const WalletConsumer = WalletContext.Consumer

