import { useEffect, useState } from 'react'
import { addressToHexString, ContractQueryResultDataType, parseQueryResult } from 'elrondjs'

import { doInterval } from '../utils/timer'
import { Wallet, Network, Delegation } from '../types/all'

const getDelegation = async (network: Network, address: string) => {
  const { delegationContract } = network.endpoint

  if (!delegationContract) {
    throw new Error('No delegation contract set')
  }

  const args = [addressToHexString(address)]

  const data1 = await network.connection.queryContract({
    contractAddress: delegationContract,
    functionName: 'getUserStakeByType',
    args,
  })

  /*
    0 => WithdrawOnly
    1 => Waiting
    2 => Active
    3 => UnStaked
    4 => DeferredPayment
  */

  const waitingStake = parseQueryResult(data1, { index: 1, type: ContractQueryResultDataType.INT })
  const activeStake = parseQueryResult(data1, { index: 2, type: ContractQueryResultDataType.INT })

  const data2 = await network.connection.queryContract({
    contractAddress: delegationContract,
    functionName: 'getClaimableRewards',
    args,
  })

  const claimable = parseQueryResult(data2, { type: ContractQueryResultDataType.INT })

  return {
    claimableRewards: String(claimable),
    userActiveStake: String(activeStake),
    userWaitingStake: String(waitingStake),
  }  
}

interface UseDelegationsResult {
  delegation?: Delegation,
}

export const useDelegations = (wallet?: Wallet, network?: Network): UseDelegationsResult => {
  const [delegation, setDelegation] = useState<Delegation | undefined>()

  useEffect(() => {
    const timer = doInterval(async () => {
      if (wallet && network?.connection && !(network.failure)) {
        if (!network?.endpoint.delegationContract) {
          setDelegation(undefined)
        } else {
          const address = wallet.address()
          
          try {
            const ret = await getDelegation(network, address)
            setDelegation({
              claimable: ret.claimableRewards,
              activeStake: ret.userActiveStake,
              waitingStake: ret.userWaitingStake,
            })
          } catch (err) {
            console.error(`Error fetching delegation: ${err.message}`)
            // TODO: notify user somehow
          }
        }
      }
    }, { delayMs: 5000, executeImmediately: true })

    return () => clearInterval(timer)
  }, [wallet, network])

  return { delegation }
}
