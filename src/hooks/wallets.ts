import { useState, useCallback } from 'react'

import { Wallet } from '../types/all'

interface UseWalletsResult {
  wallets: Wallet[],
  activeWallet?: Wallet,
  setActiveWallet: (a: Wallet) => void,
  addWallet: (a: Wallet) => void,
  removeWallet: (a: Wallet) => void,
}

const getWalletIndex = (wallets: Wallet[], w: Wallet) => wallets.findIndex((a: Wallet) => a.address() === w.address())

export const useWallets = (): UseWalletsResult => {
  const [wallets, setWallets] = useState([])
  const [activeWallet, setActiveWallet] = useState<Wallet>()

  // add account
  const addWallet = useCallback(a => {
    const pos = getWalletIndex(wallets, a)
    if (0 > pos) {
      setWallets(wallets.concat(a))
      setActiveWallet(a)
    }
  }, [wallets])

  // remove account
  const removeWallet = useCallback(a => {
    const pos = getWalletIndex(wallets, a)
    if (0 <= pos) {
      wallets.splice(pos, 1)
      setWallets(wallets.concat([]))
      const newActivePos = (0 < pos ? pos - 1 : wallets.length - 1)
      setActiveWallet(wallets[newActivePos])
    }
  }, [wallets])

  return { wallets, addWallet, removeWallet, activeWallet, setActiveWallet }
}
