import React, { useState, useMemo, useEffect, useCallback } from 'react'
// import { ErdConnect } from 'erdbox'

import { Wallet, Network, NetworkEndpoint, Signer } from '../types/all'
import { setupThemes } from '../themes'
import { setupCoreFonts } from '../fonts'
import { useNetwork, useWallets } from '../hooks'

// setup fonts
const font = setupCoreFonts()

// setup themes
const themes = setupThemes()

export interface GlobalContextValue {
  experimentalFeaturesEnabled: boolean,
  setExperimentalFeaturesEnabled: Function,
  theme: object,
  setThemeName: Function,
  network?: Network,
  switchNetwork: (endpoint: NetworkEndpoint) => void,
  activeWallet?: Wallet,
  changeWallet: Function,
}


const GlobalContext = React.createContext({} as GlobalContextValue);

// load erd-connect widget
(() => {
  const g = window.document.createElement('script')
  g.id = 'erdboxScript'
  g.type = 'text/javascript'
  g.async = true
  g.defer = true
  g.src = 'https://cdn.jsdelivr.net/npm/erdbox@1.9.0/dist/erdbox.js';
  // g.src = 'http://localhost:9000/erdbox.js'
  window.document.body.appendChild(g)
})();

export const GlobalProvider: React.FunctionComponent = ({ children }) => {
  const [ experimentalFeaturesEnabled, setExperimentalFeaturesEnabled ] = useState(false)
  const [ themeName, setThemeName ] = useState('light')
  const { network, switchNetwork } = useNetwork()
  const { addWallet, removeWallet, activeWallet } = useWallets()

  const theme = useMemo(() => {
    const r = themes.get(themeName)
    r.font = font
    return r
  }, [ themeName ])

  const _loadWallet = useCallback(async () => {
    if (window.erdbox) {
      const connector = window.erdbox //: ErdConnect = window.elrond

      try {
        // get wallet 
        const cachedWallet = window.localStorage.getItem('wallet')
        const a = cachedWallet || await connector.getWalletAddress({ mustLoadWallet: true })
        window.localStorage.setItem('wallet', a)

        const s: Signer = connector.getSigner()

        addWallet({
          address: () => a,
          signTransaction: s.signTransaction.bind(s),
        })

      } catch (err) {
        console.error('Error fetching wallet', err)
      }
    }
  }, [ addWallet ])

  useEffect(() => {
    window.addEventListener('erdbox:ready', _loadWallet, { once: true })
  }, [_loadWallet])

  useEffect(() => {
    if (network?.connection && !network.failure) {
      if (window.erdbox) {
        const connector = window.erdbox //: ErdConnect = window.elrond

        if (connector.getProvider() !== network!.connection) {
          connector.setProvider(network!.connection)
        }
      }
    }
  }, [ network  ])

  const changeWallet = useCallback(async () => {
    if (window.erdbox) {
      await window.erdbox.closeWallet()
      await _loadWallet()
      window.localStorage.removeItem('wallet')
      if (activeWallet) {
        removeWallet(activeWallet)
      }
    }
  }, [_loadWallet, activeWallet, removeWallet])
    
  return (
    <GlobalContext.Provider value={{
      experimentalFeaturesEnabled,
      setExperimentalFeaturesEnabled,
      theme,
      setThemeName,
      network,
      switchNetwork,
      activeWallet,
      changeWallet,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const GlobalConsumer = GlobalContext.Consumer
