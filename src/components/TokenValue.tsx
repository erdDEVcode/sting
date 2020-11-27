import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import { AssetValue, AssetValueNumberStyle } from '../utils/number'
import LoadingIcon from './LoadingIcon'
import TokenSymbol from './TokenSymbol'

import Odometer from './Odometer'
import CopyToClipboardButton from './CopyToClipboardButton'

const Container = styled.div`
  display: inline-block;
  position: relative;
  ${(p: any) => p.theme.font('body')};

  button {
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    button {
      opacity: 1;
      pointer-events: auto;
    }
  }
`

const StyledCopyButton = styled(CopyToClipboardButton)`
  display: inline-block;
  font-size: 50%;
  padding: 0.4em;
  margin-left: 0.2em;
`

const StyledLoadingIcon = styled(LoadingIcon)`
`

const Num = styled.div`
  display: inline-block;
`

const Frac = styled.div`
  display: inline-block;

  &:before {
    content: '.';
    margin: 0 0.05em;
  }
`

const StyledTokenSymbol = styled(TokenSymbol)`
  font-size: 80%;
  margin-right: 0.2em;
`

interface Props {
  className?: string,
  token?: string,
  amount?: any,
  showSymbolPrefix?: boolean,
  numberStyle?: AssetValueNumberStyle,
}

const TokenValue: React.FunctionComponent<Props> = ({ 
  className, token, amount, showSymbolPrefix, numberStyle = AssetValueNumberStyle.SUCCINCT_SCALED
}) => {
  const { str, num, frac } = useMemo(() => {
    let str

    if (token && undefined !== amount) {
      const ab = AssetValue.fromTokenAmount(token, amount)
      str = ab.toString({ numberStyle })
    }

    if (str) {
      const [num, frac] = str.split('.')

      return {
        str,
        num,
        frac: (typeof frac !== 'undefined') ? `1${frac}${frac.length === 1 ? '0' : ''}` : null
      }
    } else {
      return {}
    }
  }, [token, amount, numberStyle])

  let content = <StyledLoadingIcon />

  if (num) {
    content = (
      <React.Fragment>
        {showSymbolPrefix ? <StyledTokenSymbol token={token} /> : null}
        <Num>
          <Odometer value={num} />
        </Num>
        {frac ? (
          <Frac><Odometer value={frac} decimals={true} /></Frac>
        ) : null}
        {str ? <StyledCopyButton value={str} /> : null}
      </React.Fragment>
    )
  }

  return (
    <Container className={className}>{content}</Container>
  )
}

export default TokenValue

