import React, { useCallback } from 'react'
import { Contract } from 'elrondjs' 

import { useDelegationData } from './hooks'
import { Delegation, Network, Wallet, Provider, Rate } from '../../types/all'
import BalanceValueRow from './BalanceValueRow'
import ActionButton from './ActionButton'

interface Props {
  network: Network,
  provider: Provider,
  wallet: Wallet,
  rate?: Rate,
  delegation?: Delegation,
}

const ClaimDelegationRewardsRow: React.FunctionComponent<Props> = ({ network, delegation, provider, wallet, rate }) => {
  const { 
    delegationsTotal,
    claimableRewards,
    hasClaimableRewards,
  } = useDelegationData(network, delegation)

  const claimRewards = useCallback(async () => {
    const c = await Contract.at(network.endpoint.delegationContract!, {
      provider,
      signer: window.erdbox.getSigner(),
      sender: wallet!.address()
    })

    try {
      await c.invoke('claimRewards', [], {
        gasLimit: 250000000,
        meta: {
          displayOptions: {
            excludeAmount: true,
            skipPreview: true,
          }
        }
      })
    } catch (err) {
      console.warn(err)
    }
  }, [network.endpoint.delegationContract, provider, wallet])

  return delegationsTotal ? (
    <BalanceValueRow 
      label='Delegation/Staking' 
      balance={claimableRewards} 
      rate={rate} 
    >
      {hasClaimableRewards ? () => (
        <ActionButton onClick={claimRewards}>Claim rewards</ActionButton>
      ) : undefined}
    </BalanceValueRow>
  ) : null
}


export default ClaimDelegationRewardsRow