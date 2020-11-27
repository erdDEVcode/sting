import React, { useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'

import { Balance, Rate } from '../../types/all'
import { AssetValue, AssetValueNumberStyle } from '../../utils/number'
import TokenValue from '../TokenValue'
import TokenIcon from '../TokenIcon'
import TokenSymbol from '../TokenSymbol'
import IconButton from '../IconButton'

const Row = styled.tr`
  border: ${(p: any) => `1px solid ${p.theme.overview.tableContainer.table.borderColor}`};
`

const FirstRow = styled(Row)`
  border-bottom: ${(p: any) => p.expanded ? 'none' : `1px solid ${p.theme.overview.tableContainer.table.borderColor}`};
`

const SecondRow = styled(Row)`
  border-top: none;
`

const StyledTokenIcon = styled(TokenIcon)`
  width: 1em;
  margin-right: 0.5em;
`

const ExpanderButton = styled(IconButton)`
  border: 0;
  padding: 0.5em 1em;
  font-size: 0.8rem;
  transform: rotate(${({ state }) => (state === 'expanded') ? '180deg' : '0deg'});
`

interface Props {
  label?: string,
  balance?: Balance,
  rate?: Rate,
  children?: Function | undefined,
}

const Empty = () => <span>-</span>

const BalanceValueRow: React.FunctionComponent<Props> = props => {
  const { balance, rate, label, children } = props

  const [ expanded, setExpanded ] = useState(true)

  const canExpand = !!children

  const toggle = useCallback(() => setExpanded(!expanded), [ expanded ])

  const currencyBalance = useMemo(() => {
    if (balance && rate) {
      return AssetValue.fromBalance(balance).toCurrencyValue(rate!).toBalance()
    } else {
      return undefined
    }
  }, [balance, rate])

  return balance ? (
    <React.Fragment>
      <FirstRow expanded={expanded}>
        <td>
          {label ? (
            <React.Fragment>
              <StyledTokenIcon token={balance.token} />
              <span>{label}</span>
            </React.Fragment>
          ) : (
              <TokenSymbol token={balance.token} showIcon={true} />
            )}
        </td>
        <td><TokenValue token={balance.token} amount={balance.amount} numberStyle={AssetValueNumberStyle.SUCCINCT_SCALED} /></td>
        <td>{(currencyBalance) ? (
          <TokenValue token={currencyBalance.token} amount={currencyBalance?.amount} numberStyle={AssetValueNumberStyle.SUCCINCT_SCALED} showSymbolPrefix={true} />
        ) : (
            <Empty />
          )}</td>
          <td>
            {canExpand ? (
              <ExpanderButton icon='downArrow' onClick={toggle} state={expanded ? 'expanded' : ''} />
            ) : null}
          </td>
      </FirstRow>
      {(canExpand && expanded) ? (
        <SecondRow>
          <td colSpan={3}>{(children as Function)()}</td>
        </SecondRow>
      ) : null}
    </React.Fragment>
  ) : null
}


export default BalanceValueRow