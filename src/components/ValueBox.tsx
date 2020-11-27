import React from 'react'
import styled from '@emotion/styled'

import { Wallet } from '../types/all'

const Container = styled.div`
  background-color: ${(p: any) => p.theme.valueBox.bgColor};
  color: ${(p: any) => p.theme.valueBox.textColor};
  padding: 1em;
  border-radius: 10px;
  ${(p: any) => p.theme.font('data')};
`

interface Props {
  wallet?: Wallet,
  className?: string,
}

const ValueBox: React.FunctionComponent<Props> = ({ className, children }) => (
  <Container className={className}>{children}</Container>
)


export default ValueBox