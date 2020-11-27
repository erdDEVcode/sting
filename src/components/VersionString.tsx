import React from 'react'
import styled from '@emotion/styled'

import { version } from '../../package.json'

const Container = styled.span`
  span {
    font-size: 70%;
  }
`

interface Props {
  className?: string,
}

const VersionString: React.FunctionComponent<Props> = ({ className }) => {
  return (
    <Container className={className}><span>v</span>{version}</Container>
  )
}

export default VersionString