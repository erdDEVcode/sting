import { useEffect, useState, useCallback } from 'react'
import { NetworkConfig, Provider, ProxyProvider } from 'elrondjs'
import { NETWORKS } from '../data'

import { Network, NetworkEndpoint } from '../types/all'
import { doInterval } from '../utils/timer'

interface UseNetworkResult {
  network?: Network,
  switchNetwork: (endpoint: NetworkEndpoint) => void,
}

const testConnection = async (provider: Provider, setConfig: Function, setFailure: Function) => {
  try {
    setConfig(await provider.getNetworkConfig())
    setFailure() // clear previous failure flag
  } catch (err) {
    setConfig(undefined)
    setFailure(`Failed to connect: ${err.message}`)
  }
}

export const useNetwork = (): UseNetworkResult => {
  const [endpoint, setEndpoint] = useState<NetworkEndpoint>()
  const [connection, setConnection] = useState<Provider>()
  const [config, setConfig] = useState<NetworkConfig>()
  const [failure, setFailure] = useState<string>()

  // switch endpoint
  const switchNetwork = useCallback((endpoint: NetworkEndpoint) => {
    (async () => {
      if (endpoint) {
        const tmpProxy = new ProxyProvider(endpoint.url)
         await testConnection(tmpProxy, setConfig, setFailure)
        setEndpoint(endpoint)
        setConnection(tmpProxy)
      }
    })()
  }, [])

  // set initial endpoint
  useEffect(() => switchNetwork(NETWORKS[0]), [switchNetwork])

  // continous check
  useEffect(() => {
    const timer = doInterval(async () => {
      if (connection) {
        await testConnection(connection, setConfig, setFailure)
      }
    }, { delayMs: 10000, executeImmediately: true })

    return () => clearInterval(timer)
  },[ connection ])

  return {
    network: (connection && endpoint) ? {
      endpoint: endpoint!,
      config,
      connection: connection!,
      failure,
    } : undefined,
    switchNetwork
  }
}