import React, { useMemo } from 'react'
import DefaultOdometer from 'react-odometerjs'
import styled from '@emotion/styled'

import './odometer-theme.css'

const Container = styled.div`
  display: inline-block;
  ${(p: any) => p.decimals ? `
    .odometer-digit:nth-of-type(1) {
      display: none;
    }
    .odometer-formatting-mark {
      display: none;
    }
  ` : ''};
`

interface Props {
  value: string,
  decimals? : boolean,
}

const FORMAT = '(,ddd).dd'

const Odometer: React.FunctionComponent<Props> = ({ value, decimals }) => {
  const val = useMemo(() => {
    return parseInt(value, 10)
  }, [ value ])

  return (
    <Container decimals={decimals}>
      <DefaultOdometer value={val} format={FORMAT} theme='minimal' />
    </Container>
  )
}

export default Odometer

