import React, { useState, useMemo, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { Provider } from 'elrondjs'

import { Network, Wallet, Balances, Delegation, Rates } from '../../types/all'
import {
  ChainConsumer,
  GlobalConsumer,
  GlobalContextValue,
  WalletConsumer,
  WalletContextValue,
} from '../../contexts'
import { AssetValue } from '../../utils/number'
import LoadingIcon from '../LoadingIcon'
import QrCodeModal from '../QrCodeModal'
import { ViewAddressInExplorer, ViewInExplorerContext } from '../ViewInExplorer'
import IconButton from '../IconButton'
import CopyToClipboardButton from '../CopyToClipboardButton'
import BalanceValueWithSymbol from '../BalanceValueWithSymbol'
import BalanceValueRow from './BalanceValueRow'
import ValueBox from '../ValueBox'
import BalancesTable from './BalancesTable'
import ClaimDelegationRewardsRow from './ClaimDelegationRewardsRow'
import DelegationQueueRow from './DelegationQueueRow'

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'center', align: 'center' })};
  background-color: ${(p: any) => p.theme.content.bgColor};
  color: ${(p: any) => p.theme.content.textColor};
  width: 100%;
  min-height: 100%;
`

const AddressContainer = styled.div`
  ${(p: any) => p.theme.font('data')};
  font-size: 0.8rem;
  margin: 2rem 0;
  ${flex({ direction: 'row', justify: 'center', align: 'center', basis: 0 })};

  button {
    margin-left: 0.5rem;
  }
`

const AddressValueBox = styled(ValueBox)``

const TotalContainer = styled.div`
  position: relative;
  border-radius: 12em;
  background-color: ${(p: any) => p.theme.overview.totalContainer.bgColor};
  min-width: 30rem;
  padding: 3rem 0;
  margin: 1rem 0;
`

const TotalBalanceValue = styled(BalanceValueWithSymbol)`
  font-size: 3rem;
`

const NoPricingInfoText = styled.div`
  ${(p: any) => p.theme.font('body', 'regular', 'italic')};
  text-align: center;
`

const BreakdownContainer = styled.div`
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
  font-size: 1rem;
`

const TableContainer = styled(BalancesTable)`
  width: 100%;
  text-align: left;
  margin-bottom: 2rem;

  h2 {
    padding-bottom: 0;
    font-size: 1rem;
    text-transform: uppercase;
    width: 100%;
  }

  table {
    width: 100%;
    border: 1px solid ${(p: any) => p.theme.overview.tableContainer.table.borderColor};
    border-radius: 5px;
    font-size: 1rem;

    thead {
      tr {
        ${(p: any) => p.theme.font('body', 'bold')};
        font-size: 70%;
        color: ${(p: any) => p.theme.overview.tableContainer.table.header.textColor};
      }
      th {
        padding: 1rem;
      }
    }

    td {
      text-align: left;
      padding: 1rem;
    }
  }
`


interface DataProps {
  network: Network,
  wallet: Wallet,
  provider: Provider,
  balances: Balances,
  delegation?: Delegation,
  rates: Rates,
}

const NoPricingInfo = () => {
  return (
    <NoPricingInfoText>No pricing info available 😕</NoPricingInfoText>
  )
}

const OverviewData: React.FunctionComponent<DataProps> = props => {
  const { balances, delegation, rates, wallet, network, provider } = props

  const delegationsSupported = useMemo(() => !!(network?.endpoint?.delegationContract), [ network ])

  const primaryToken = useMemo(() => network.endpoint.primaryToken!, [ network ])

  const [ showQrCode, setShowQrCode ] = useState(false)

  const rate = useMemo(() => {
    const r = rates[primaryToken]
    return (r && !Number.isNaN(r.value)) ? r : undefined
  }, [rates, primaryToken])

  const balance = useMemo(() => balances[primaryToken], [ balances, primaryToken ])

  const {
    delegationsTotal,
    activeStake,
    hasActiveStake,
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
  }, [ primaryToken, delegationsSupported, delegation ])

  const totalBalance = useMemo(() => {
    const { showValueInToken } = network?.endpoint || {}

    if (balance) {
      if (showValueInToken) {
        return balance
      } else if (rate) {
        let aBalance: AssetValue = AssetValue.fromBalance(balance)

        if (delegationsSupported && delegationsTotal) {
          aBalance = aBalance.add(AssetValue.fromBalance(delegationsTotal))
        }

        return aBalance.toCurrencyValue(rate).toBalance()
      }
    }
     
    return undefined
  }, [balance, delegationsSupported, delegationsTotal, network?.endpoint, rate])

  const toggleQrCode = useCallback(() => {
    setShowQrCode(!showQrCode)
  }, [showQrCode ])

  return (
    <Container>
      <AddressContainer>
        <AddressValueBox>{wallet.address()}</AddressValueBox>
        <CopyToClipboardButton value={wallet.address()} />
        <IconButton icon='qrcode' tooltip='View QR code' onClick={toggleQrCode} />
        <ViewAddressInExplorer address={wallet.address()}>
          {({ onClick }: ViewInExplorerContext) => <IconButton icon='open-external' tooltip='View in explorer' onClick={onClick}/>}
        </ViewAddressInExplorer>
        <QrCodeModal
          title='Your wallet address'
          value={wallet.address()}
          onRequestClose={toggleQrCode}
          isOpen={showQrCode}
        />
      </AddressContainer>
      <TotalContainer>
        {totalBalance ? (
          <TotalBalanceValue balance={totalBalance!} />
        ) : (
          <NoPricingInfo />
        )}
      </TotalContainer>
      <BreakdownContainer>
        <TableContainer title='Wallet'>
          <BalanceValueRow balance={balance} rate={rate} />
        </TableContainer>
        {delegationsTotal ? (
          <TableContainer title='Staking'>
            {hasActiveStake ? <BalanceValueRow label='Fully delegated' balance={activeStake} rate={rate} /> : null}
            <DelegationQueueRow
              network={network}
              delegation={delegation}
              provider={provider}
              wallet={wallet}
              rate={rate} 
            />
          </TableContainer>
        ) : null}
        {(delegationsTotal/* && hasClaimableRewards*/) ? (
          <TableContainer title='Rewards' columnNames={[ 'Asset', 'Claimable reward', 'Value' ]}>
            <ClaimDelegationRewardsRow 
              network={network} 
              delegation={delegation}
              provider={provider}
              wallet={wallet}
              rate={rate} 
            />
          </TableContainer>
        ) : null}
      </BreakdownContainer>
    </Container>
  )
}

interface Props {
  isActive: boolean,
  className?: string,
}

const Overview: React.FunctionComponent<Props> = ({ isActive }) => {
  if (!isActive) {
    return null
  }

  return (
    <GlobalConsumer>
      {({ network }: GlobalContextValue) => (
        <WalletConsumer>
          {(props: WalletContextValue) => (
            (network && props.wallet) ? (
              <ChainConsumer>
                {(provider: Provider) => (
                  <OverviewData 
                    {...props} 
                    wallet={props.wallet!} 
                    network={network!} 
                    provider={provider}
                  />
                )}
              </ChainConsumer>
            ) : <LoadingIcon />
          )}
        </WalletConsumer>
      )}
    </GlobalConsumer>
  )
}

export default Overview