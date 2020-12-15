import React, { useState, useMemo, useEffect } from 'react'
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
  wallets: Wallet[],
  activeWallet?: Wallet,
  setActiveWallet: Function,
  addWallet: Function,
  removeWallet: Function,
}


const GlobalContext = React.createContext({} as GlobalContextValue);

// load erd-connect widget
(() => {
  const g = window.document.createElement('script')
  g.id = 'erdboxScript'
  g.type = 'text/javascript'
  g.async = true
  g.defer = true
  g.src = 'https://cdn.jsdelivr.net/npm/erdbox@1.6.3/dist/erdbox.js';
  // g.src = 'http://localhost:9000/erdbox.js'
  window.document.body.appendChild(g)
})();

export const GlobalProvider: React.FunctionComponent = ({ children }) => {
  const [ experimentalFeaturesEnabled, setExperimentalFeaturesEnabled ] = useState(false)
  const [ themeName, setThemeName ] = useState('light')
  const { network, switchNetwork } = useNetwork()
  const { wallets, addWallet, removeWallet, setActiveWallet, activeWallet } = useWallets()

  const theme = useMemo(() => {
    const r = themes.get(themeName)
    r.font = font
    return r
  }, [ themeName ])

  useEffect(() => {
    window.addEventListener('erdbox:ready', async () => {
      if (window.erdbox) {
        const connector = window.erdbox //: ErdConnect = window.elrond

        try {
          const a = await connector.getWalletAddress({ mustLoadWallet: true })
          const s: Signer = connector.getSigner()
          addWallet({
            address: () => a,
            signTransaction: s.signTransaction.bind(s),
          })
        } catch (err) {
          console.error('Error fetching wallet', err)
        }
      }
    }, { once: true })
  }, [addWallet])

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
    
  return (
    <GlobalContext.Provider value={{
      experimentalFeaturesEnabled,
      setExperimentalFeaturesEnabled,
      theme,
      setThemeName,
      network,
      switchNetwork,
      wallets,
      activeWallet,
      setActiveWallet,
      addWallet,
      removeWallet,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const GlobalConsumer = GlobalContext.Consumer
