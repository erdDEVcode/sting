import React, { useCallback } from 'react'
import { useTransactionToasts } from 'react-transaction-toasts'

import { Network, Provider, ContractQueryParams, SignedTransaction, NetworkConfig, Address, ContractQueryResult, TransactionReceipt, TransactionOnChain, TokenData } from '../types/all'

export interface ChainContextValue extends Provider {

}

const ChainContext = React.createContext({} as ChainContextValue)

interface Props {
  network?: Network,
}

const ensureNetwork = (network?: Network) => {
  if (network?.connection) {
    return
  } else {
    throw new Error('Not connected to Elrond network')
  }
}

export const ChainProvider: React.FunctionComponent<Props> = ({ network, children }) => {
  const { trackTransaction, showError } = useTransactionToasts({
    disableAutoCloseOnSuccess: true,
  })

  const getNetworkConfig = useCallback(async (): Promise<NetworkConfig> => {
    ensureNetwork(network)
    return network!.config!
  }, [ network ])

  const getAddress = useCallback(async (address: string): Promise<Address> => {
    ensureNetwork(network)
    return await network!.connection.getAddress(address)
  }, [ network ])

  const getESDTData = useCallback(async (address: string, token: string): Promise<TokenData> => {
    ensureNetwork(network)
    return await network!.connection.getESDTData(address, token)
  }, [network])

  const queryContract = useCallback(async (params: ContractQueryParams): Promise<ContractQueryResult> => {
    ensureNetwork(network)
    return await network!.connection.queryContract(params)
  }, [ network])

  const sendSignedTransaction = useCallback(async (signedTx: SignedTransaction): Promise<string> => {
    ensureNetwork(network)
    let hash

    try {
      hash = await network!.connection.sendSignedTransaction(signedTx)
    } catch (err) {
      showError(err.message)
      throw err
    }
    
    trackTransaction(hash, {
      provider: network!.connection
    })

    return hash
  }, [network, trackTransaction, showError])

  const getTransaction = useCallback(async (txHash: string): Promise<TransactionOnChain> => {
    ensureNetwork(network)
    return await network!.connection.getTransaction(txHash)
  }, [network])

  const waitForTransaction = useCallback(async (txHash: string): Promise<TransactionReceipt> => {
    ensureNetwork(network)
    return await network!.connection.waitForTransaction(txHash)
  }, [network])

  return (
    <ChainContext.Provider value={{
      getNetworkConfig,
      getAddress,
      getESDTData,
      queryContract,
      sendSignedTransaction,
      getTransaction,
      waitForTransaction,
    }}>
      {children}
    </ChainContext.Provider>
  )
}

export const ChainConsumer = ChainContext.Consumer

