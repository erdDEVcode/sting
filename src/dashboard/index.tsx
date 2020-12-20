import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { flex, boxShadow } from 'emotion-styled-utils'
import { useTransactionToasts } from 'react-transaction-toasts'

import { t } from '../strings'
import { ChainConsumer, GlobalConsumer } from '../contexts'
import { DASHBOARD_MENU } from '../constants/app'
import Overview from '../components/overview/Overview'
import Icon from '../components/Icon'
import { Network, Provider, Wallet } from '../types/all'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'flex-end', align: 'stretch' })};
  height: 100%;
`

const sidebarWidth = '6rem'

const SideMenuContainer = styled.div`
  position: relative;
  top: 2rem;
  ${flex({ direction: 'column', justify: 'flex-start', align: 'center' })};
  width: ${sidebarWidth};
  min-width: ${sidebarWidth};
`

const SideMenuItem = styled.div`
  display: block;
  border-radius: 5px;
  background-color: ${(p: any) => p.theme.menu[p.active ? 'activeItem' : 'inactiveItem'].bgColor};
  color: ${(p: any) => p.theme.menu[p.active ? 'activeItem' : 'inactiveItem'].textColor};
  font-size: ${(p: any) => p.active ? '0.8rem' : '0.7rem'};
  width: 5em;
  ${(p: any) => p.active ? boxShadow({ color: p.theme.modal.shadowColor }) : ''};
  z-index: ${(p: any) => p.active ? '1' : '0'};
  padding: 1em 0;
  text-align: center;
  line-height: 1.2em;
  margin: 0.5rem 0;
  ${(p: any) => p.theme.font('header')};

  &:hover {
    background-color: ${(p: any) => p.theme.menu[p.active ? 'activeItem' : 'hoverInactiveItem'].bgColor};
    color: ${(p: any) => p.theme.menu[p.active ? 'activeItem' : 'hoverInactiveItem'].textColor};
    cursor: pointer;
  }
`

const MenuIcon = styled(Icon)`
  font-size: 1.5rem;
`

const MenuName = styled.div`
  font-size: 70%;
  text-align: center;
  margin-top: 0.5rem;
`

const Content = styled.div`
  width: calc(100% - ${sidebarWidth});
  max-width: calc(100% - ${sidebarWidth});
  border-top-left-radius: 5px;
  z-index: 2;
  max-height: 100%;
  overflow-y: scroll;
`

interface SideMenuProps {
  experimentalFeaturesEnabled: boolean,
  activePanel: string,
  wallet: Wallet,
  network?: Network,
  provider: Provider,
  setActivePanel: (panel: string) => void,
}

const ICONS: Record<string, string> = {
  OVERVIEW: 'wallet',
  SEND: 'send',
  TRANSACTIONS: 'history',
  DAPPS: 'dapp',
  STAKING: 'stake',
}

const SideMenu: React.FunctionComponent<SideMenuProps> = ({ 
  experimentalFeaturesEnabled,
  activePanel, 
  wallet,
  network,
  provider,
  setActivePanel 
}) => {
  const { showError } = useTransactionToasts({ disableAutoCloseOnSuccess: true })

  const selectItem = useCallback(async id => {
    if (id === 'SEND') {
      if (!network || network.failure) {
        showError(`Network not connected ${network?.failure ? `(${network.failure})` : ''}`)
        return
      }

      const signer = window.erdbox.getSigner()

      const signedTransaction = await signer.signTransaction({
        sender: wallet.address(),
        receiver: '',
        value: '0'
      })

      await provider.sendSignedTransaction(signedTransaction)
    } else {
      setActivePanel(id)
    }
  }, [network, wallet, provider, showError, setActivePanel])

  return (
    <SideMenuContainer>
      {Object.values(DASHBOARD_MENU).reduce((m: any[], cfg) => {
        const { id, experimental = false } = (cfg as any)

        if (!experimental || experimentalFeaturesEnabled) {
          m.push(
            <SideMenuItem
              key={id}
              active={activePanel === id}
              onClick={() => selectItem(id)}
            >
              <MenuIcon name={ICONS[id]} />
              <MenuName>{t(`dashboard.menu.${id.toLowerCase()}`)}</MenuName>
            </SideMenuItem>
          )
        }
        return m
      }, [])}
    </SideMenuContainer>
  )
}


const Dashboard = () => {
  const [activePanel, setActivePanel] = useState<string>(DASHBOARD_MENU[0].id)



  return (
    <GlobalConsumer>
      {({ network, activeWallet, experimentalFeaturesEnabled }) => (
        activeWallet ? (
          <ChainConsumer>
            {(provider: Provider) => (
              <Container>
                <SideMenu
                  wallet={activeWallet}
                  network={network}
                  provider={provider}
                  activePanel={activePanel}
                  setActivePanel={setActivePanel}
                  experimentalFeaturesEnabled={experimentalFeaturesEnabled}
                />
                <Content>
                  <Overview isActive={activePanel === 'OVERVIEW'} />
                </Content>
              </Container>
            )}
          </ChainConsumer>
        ) : null
      )}
    </GlobalConsumer>
  )
}

export default Dashboard
