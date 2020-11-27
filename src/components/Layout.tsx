import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { headerHeight } from './units'
import NetworkPanel from './NetworkPanel'
import WalletStatus from './WalletStatus'
import NetworkStatus from './NetworkStatus'
import AboutModal from './AboutModal'
import LogoSvg from './LogoSvg'
import VersionString from './VersionString'
import { NETWORKS } from '../data'

const Container = styled.div`
  background-color: ${(p: any) => p.theme.layout.bgColor};
  color: ${(p: any) => p.theme.layout.textColor};
  width: 100vw;
  height: 100vh;
`

const Header = styled.div`
  height: ${headerHeight};
  padding-top: 0.2rem;
  width: 100vw;
  ${flex({ direction: 'row', justify: 'flex-end', align: 'center' })};
  padding-right: 20px;
  -webkit-app-region: drag;
`

const StyledWalletStatus = styled(WalletStatus)`
  z-index: 10;
`

const StyledNetworkStatus = styled(NetworkStatus)`
  margin-left: 3rem;
  z-index: 10;
`

const Content = styled.div`
  width: 100%;
  padding-top: 1rem;
  height: calc(100% - ${headerHeight});
  overflow: hidden;
`

const NetworkPanelOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p: any) => p.theme.modal.overlay.bgColor};
  opacity: ${(p: any) => p.visible ? '1' : '0'};
  pointer-events: ${(p: any) => p.visible ? 'auto' : 'none'};
  z-index: 11;

  & > div {
    &:first-of-type {
      width: calc(100vw - 300px);
      height: 100%;
    }
  }
`

const StyledNetworkPanel = styled(NetworkPanel)`
  position: absolute;
  top: 0;
  right: ${(p: any) => p.visible ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  z-index: 12;
  transition: all 0.5s ease-in-out;
`

const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 0 1rem 2rem;

  color: ${(p: any) => p.theme.footer.textColor};

  &:hover {
    color: ${(p: any) => p.theme.footer.hover.textColor};
  }
`

const logoWidth = 40

const FooterLogo = styled.div`
  display: inline-block;

  svg {
    width: ${logoWidth}px;
    height: ${logoWidth * 1.96}px;

    &:first-of-type {
      display: block;
      path {
        fill: ${(p: any) => p.theme.footer.textColor};
      }
    }

    &:last-of-type {
      display: none;
    }
  }

  &:hover {
    cursor: pointer;

    svg {
      &:first-of-type {
        display: none;
      }

      &:last-of-type {
        display: block;
      }
    }
  }
`

const FooterVersionString = styled(VersionString)`
  display: block;
  text-align: center;
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
`

const Layout: React.FunctionComponent = ({ children }) => {
  const [panelShown, setPanelShown] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const togglePanel = useCallback(() => {
    setPanelShown(!panelShown)
  }, [panelShown])

  const toggleAboutModal = useCallback(() => {
    setShowAboutModal(!showAboutModal)
  }, [showAboutModal ])

  return (
    <Container>
      <NetworkPanelOverlay visible={panelShown}>
        <div onClick={togglePanel} />
        <StyledNetworkPanel
          visible={panelShown}
          endpoints={NETWORKS}
        />
      </NetworkPanelOverlay>
      <Header>
        <StyledWalletStatus />
        <StyledNetworkStatus togglePanel={togglePanel} />
      </Header>
      <Content>
        {children}
      </Content>
      <Footer>
        <FooterLogo onClick={toggleAboutModal}>
          <LogoSvg />
          <LogoSvg />
        </FooterLogo>
        <FooterVersionString/>
      </Footer>
      <AboutModal isOpen={showAboutModal} onRequestClose={toggleAboutModal} />
    </Container>
  )
}

export default Layout

