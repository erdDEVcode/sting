import { useMemo } from 'react'
import { Balance, Delegation, Network } from '../../types/all'
import { AssetValue } from '../../utils/number'

interface UseDelegationDataResult {
  delegationsTotal?: Balance,
  activeStake?: Balance,
  waitingStake?: Balance,
  claimableRewards?: Balance,
  hasActiveStake?: boolean,
  hasWaitingStake?: boolean,
  hasClaimableRewards?: boolean,
}

export const useDelegationData = (network: Network, delegation?: Delegation): UseDelegationDataResult => {
  const delegationsSupported = useMemo(() => !!(network?.endpoint?.delegationContract), [network])

  const primaryToken = useMemo(() => network.endpoint.primaryToken!, [network])

  const {
    delegationsTotal,
    activeStake,
    waitingStake,
    claimableRewards,
    hasActiveStake,
    hasWaitingStake,
    hasClaimableRewards,
  } = useMemo(() => {
    if (!delegationsSupported || !delegation) {
      return {}
    }

    const aActiveStake = AssetValue.fromTokenAmount(primaryToken, delegation.activeStake || '0')
    const aWaitingStake = AssetValue.fromTokenAmount(primaryToken, delegation.waitingStake || '0')
    const aClaimable = AssetValue.fromTokenAmount(primaryToken, delegation.claimable || '0')
    const total = aActiveStake.add(aWaitingStake).add(aClaimable).toBalance()

    return {
      delegationsTotal: total,
      activeStake: aActiveStake.toBalance(),
      waitingStake: aWaitingStake.toBalance(),
      claimableRewards: aClaimable.toBalance(),
      hasActiveStake: aActiveStake.gt(0),
      hasWaitingStake: aWaitingStake.gt(0),
      hasClaimableRewards: aClaimable.gt(0),
    }
  }, [primaryToken, delegationsSupported, delegation])

  return {
    delegationsTotal,
    activeStake,
    waitingStake,
    claimableRewards,
    hasActiveStake,
    hasWaitingStake,
    hasClaimableRewards,
  }
}