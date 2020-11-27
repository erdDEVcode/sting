import React, { useMemo } from 'react'

import { shortenAddress } from '../utils/address'

interface Props {
  className?: string,
  address: string,
  shorten?: boolean,
  onClick?: () => void,
}

const Address: React.FunctionComponent<Props> = ({ className, address, shorten, onClick }) => {
  const addressStr = useMemo(() => {
    return (shorten ? shortenAddress(address) : address)
  }, [address, shorten ])

  return (
    <span className={className} onClick={onClick}>{addressStr}</span>
  )
}

export default Address

