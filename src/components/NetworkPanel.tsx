import React, { useMemo, useCallback } from 'react'
import styled from '@emotion/styled'

import { Network, NetworkEndpoint } from '../types/all'
import {
  GlobalConsumer,
  GlobalContextValue,
} from '../contexts'
import ErrorBox from './ErrorBox'
import LoadingIcon from './LoadingIcon'
import Icon from './Icon'
import InfoBox from './InfoBox'


const Container = styled.div`
  background-color: ${(p: any) => p.theme.networkPanel.bgColor};
  padding: 1rem;
`

const TextSpan = styled(InfoBox)`
  svg {
    margin-right: 0.5em;
  }
`

const List = styled.ul`
  display: block;
`

const ListItem = styled.li`
  display: block;
  cursor: pointer;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: ${(p: any) => p.theme.networkPanel.item[p.active ? 'active' : 'inactive'].bgColor};
  color: ${(p: any) => p.theme.networkPanel.item[p.active ? 'active' : 'inactive'].textColor};

  &:hover {
    border: 1px solid ${(p: any) => p.theme.networkPanel.item.active.bgColor};
  }
`

const Name = styled.p``

const Url = styled.p`
  font-size: 70%;
  ${(p: any) => p.theme.font('body', 'normal', 'italic')};
  color: ${(p: any) => p.theme.networkPanel.item.url.textColor};
  margin-top: 0.4rem;
`

const Status = styled.div`
  margin-top: 1rem;
`

const Connected = styled(TextSpan)`
`

const ConnectingText = styled(TextSpan)`
  ${(p: any) => p.theme.font('body', 'normal', 'italic')};
`

interface ItemProps {
  network?: Network,
  endpoint: NetworkEndpoint,
  switchNetwork: (endpoint: NetworkEndpoint) => void,
}

const Item: React.FunctionComponent<ItemProps> = ({ network, endpoint, switchNetwork }) => {
  const { name, url } = endpoint

  const active = useMemo(() => url === network?.endpoint.url, [ url, network ])

  const onClick = useCallback(() => switchNetwork(endpoint), [ endpoint, switchNetwork ])

  return (
    <ListItem key={name} network={network} active={active} onClick={onClick}>
      <Name>{name}</Name>
      <Url>{url}</Url>
      {active ? (
        <Status>
          {network?.failure ? <ErrorBox error={network?.failure} /> : null}
          {(network?.connection && !(network?.failure)) ? (
          <Connected>
              <Icon name='connected' /> Connected
            </Connected>
          ) : (
              <ConnectingText>
                <LoadingIcon /> Connecting
              </ConnectingText>
            )}
        </Status>
      ) : null}
    </ListItem>
  )
}


interface Props {
  className?: string,
  endpoints: NetworkEndpoint[],
}

const NetworkInfo: React.FunctionComponent<Props> = ({ className, endpoints, ...props }) => {
  return (
    <GlobalConsumer>
      {({ network, switchNetwork }: GlobalContextValue) => (
        <Container className={className} {...props}>
          <List>
            {endpoints.map(endpoint => (
              <Item key={endpoint.url} network={network} switchNetwork={switchNetwork} endpoint={endpoint} />
            ))}
          </List>
        </Container>
      )}
    </GlobalConsumer>
  )
}

export default NetworkInfo

