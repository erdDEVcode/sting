import React from 'react'
import styled from '@emotion/styled'

import LoadingIcon from './LoadingIcon'
import Icon from './Icon'
import { GlobalConsumer, GlobalContextValue } from '../contexts'
import HeaderClickable from './HeaderClickable'

const Container = styled(HeaderClickable)`
`

const TextSpan = styled.span`
  svg {
    margin-right: 0.5em;
  }
`

const StyledIcon = styled(Icon)`
  color: ${(p: any) => p.failurestate ? p.theme.networkState.failIcon.color : p.theme.networkState.passIcon.color};
`

interface Props {
  className?: string,
  togglePanel: () => void
}

const NetworkStatus: React.FunctionComponent<Props> = ({ className, togglePanel }) => {
  return (
    <GlobalConsumer>
      {({ network }: GlobalContextValue) => (
        <Container className={className} onClick={togglePanel}>
          {network ? (
            <TextSpan>
              <StyledIcon
                failurestate={network.failure}
                name={network.failure ? 'connection-error' : 'connected'}
              />
              {network?.endpoint.name}
            </TextSpan>
          ) : <LoadingIcon />}
        </Container>
      )}
    </GlobalConsumer>
  )
}

export default NetworkStatus

