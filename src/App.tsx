import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { TransactionToastsProvider } from 'react-transaction-toasts'

import GlobalStyles from './components/GlobalStyles'
import Layout from './components/Layout'
import {
  GlobalProvider,
  GlobalConsumer,
  GlobalContextValue,
  WalletProvider,
  ChainProvider,
} from './contexts'
import Dashboard from './dashboard'


const Bootstrap: React.FunctionComponent = () => {
  return (
    <GlobalConsumer>
      {({ theme = {}, activeWallet, network }: GlobalContextValue) => (
        <WalletProvider activeWallet={activeWallet} network={network}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Layout>
              <TransactionToastsProvider>
                <ChainProvider network={network}>
                  <Dashboard />
                </ChainProvider>
              </TransactionToastsProvider>
            </Layout>
          </ThemeProvider>
        </WalletProvider>
      )}
    </GlobalConsumer>
  )
}

export default class App extends React.Component {
  componentDidCatch (error: Error, info: React.ErrorInfo) {
    // toast.error(`Sorry, there was unexpected page rendering error!`)
    console.error(error, info)
    this.setState({ error }) // trigger the error page
  }

  render() {
    return (
      <GlobalProvider>
        <Bootstrap {...this.props} />
      </GlobalProvider>
    )
  }
}
