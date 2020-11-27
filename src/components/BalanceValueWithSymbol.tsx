import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { data } from 'elrond-data'

import { Balance } from '../types/all'
import BalanceValue from './BalanceValue'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'flex-end' })};
`

const StyledBalanceValue = styled(BalanceValue)`
  display: block;
  font-size: 130%;
`

const Symbol = styled.span`
  ${(p: any) => p.theme.font('header')};
  padding-bottom: 0.5em;
  margin-right: 0.8em;
  font-size: 50%;
`

interface Props {
  className?: string,
  balance?: Balance,
}

const BalanceValueWithSymbol: React.FunctionComponent<Props> = ({ className, balance }) => {
  return (
    <Container className={className}>
      <Symbol>{balance ? data.getToken(balance.token).symbol : null}</Symbol>
      <StyledBalanceValue balance={balance} />
    </Container>
  )
}

export default BalanceValueWithSymbol

