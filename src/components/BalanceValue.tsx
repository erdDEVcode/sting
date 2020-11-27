import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { AssetValue, AssetValueNumberStyle } from '../utils/number'
import { Balance } from '../types/all'
import LoadingIcon from './LoadingIcon'
import Odometer from './Odometer'

const Container = styled.div`
  display: inline-block;
  ${(p: any) => p.theme.font('body')};
`

const StyledLoadingIcon = styled(LoadingIcon)`
  font-size: 50%;
`

const Num = styled.div`
  display: inline-block;
`

const Frac = styled.div`
  display: inline-block;
  font-size: 40%;
  margin-left: 0.2em;

  &:before {
    content: '.';
    margin: 0 0.1em;num
  }
`

interface Props {
  className?: string,
  balance?: Balance,
}

const BalanceValue: React.FunctionComponent<Props> = ({ className, balance }) => {
  const { num, frac } = useMemo(() => {
    let str = ''
    if (undefined !== balance?.amount) {
      str = AssetValue.fromBalance(balance).toString({ numberStyle: AssetValueNumberStyle.SUCCINCT_SCALED })
    }

    if (str) {
      const [num, frac]  = str.split('.')

      return {
        num,
        frac: (typeof frac !== 'undefined') ? `1${frac}${frac.length === 1 ? '0' : ''}` : null
      }
    } else {
      return {}
    }
  }, [ balance ])

  return (
    <Container className={className}>
      {num ? (
        <React.Fragment>
          <Num>
            <Odometer value={num} />
          </Num>{frac ? (
            <Frac><Odometer value={frac} decimals={true} /></Frac>
          ) : null}
        </React.Fragment>
      ) : <StyledLoadingIcon />}
    </Container>
  )
}

export default BalanceValue

