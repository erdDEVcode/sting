import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import { data } from 'elrond-data'


const Img = styled.img`
`

interface Props {
  className?: string,
  token: string,
}

const TokenIcon: React.FunctionComponent<Props> = ({ className, token }) => {
  const { symbol, img } = useMemo(() => {
    if (token) {
      const d = data.getToken(token)
      return { symbol: d.symbol, img: d.img }
    } else {
      return {}
    }
  }, [token])

  return img ? (
    <Img className={className} alt={symbol} src={img} />
  ) : null
}

export default TokenIcon

