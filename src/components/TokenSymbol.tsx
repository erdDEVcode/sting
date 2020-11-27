import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { data } from 'elrond-data'

import TokenIcon from './TokenIcon'

const Container = styled.div`
  display: inline-block;
  ${(p: any) => p.theme.font('body')};
`

const StyledTokenIcon = styled(TokenIcon)`
  width: 1em;
  margin-right: 0.5em;
`

interface Props {
  className?: string,
  token?: string,
  showIcon?: boolean,
}

const TokenSymbol: React.FunctionComponent<Props> = ({ className, token, showIcon }) => {
  const symbol = useMemo(() => {
    if (token) {
      return data.getToken(token).symbol
    } else {
      return null
    }
  }, [token])

  return (
    <Container className={className}>
      {(token && showIcon) ? <StyledTokenIcon token={token} /> : null}
      {symbol}
    </Container>
  )
}

export default TokenSymbol

