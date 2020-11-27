import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { flex, boxShadow } from 'emotion-styled-utils'

import Address from './Address'
import { GlobalConsumer, GlobalContextValue } from '../contexts'
import Icon from './Icon'
import Button from './Button'
import CopyToClipboardButton from './CopyToClipboardButton'
import HeaderClickable from './HeaderClickable'

const Container = styled.div`
  position: relative;
`

const TextSpan = styled(HeaderClickable)`
  cursor: pointer;
`

const StyledIcon = styled(Icon)`
  color: ${(p: any) => p.theme.walletState.icon.color};
  margin-right: 0.5em;
`

const ArrowIcon = styled(Icon)`
  color: transparent;
  margin-left: 0.5em;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0);
`

const Menu = styled.ul`
  display: block;
  position: absolute;
  top: 2rem;
  left: -10rem;
  width: 400px;
  ${(p: any) => boxShadow({ color: p.theme.walletState.menu.shadowColor })};
  border-radius: 10px;
`

const itemNormalStyles= (p: any) => `
  background-color: ${p.theme.walletState.menu.item.bgColor};
  color: ${p.theme.walletState.menu.item.textColor};
`

const itemSelectedStyles = (p: any) => `
  background-color: ${p.theme.walletState.menu.item.selected.bgColor};
  color: ${p.theme.walletState.menu.item.selected.textColor};
`

const MenuItem = styled.li`
  ${flex({ direction: 'row', justify: 'space-between', align: 'center' })};
  ${(p: any) => p.theme.font('header')};
  ${(p: any) => p.active ? itemSelectedStyles(p) : itemNormalStyles(p)};
  border-bottom: 1px solid ${(p: any) => p.theme.walletState.menu.item.borderColor};
  font-size: 1rem;
  padding: 1em;

  &:last-of-type {
    border-bottom: none;
  }
`

const StyledCopyToClipboardButton = styled(CopyToClipboardButton)`
  background-color: ${(p: any) => p.theme.walletState.menu.item.selected.bgColor};
  color: ${(p: any) => p.theme.walletState.menu.item.selected.textColor};
  border-color: ${(p: any) => p.theme.walletState.menu.item.selected.textColor};

  &:hover {
    background-color: ${(p: any) => p.theme.walletState.menu.item.bgColor};
    color: ${(p: any) => p.theme.walletState.menu.item.textColor};
    border-color: ${(p: any) => p.theme.walletState.menu.item.selected.textColor};
  }
`

const ItemAddress = styled(Address)`
  cursor: pointer;
  font-size: 80%;
  word-break: break-all;
  line-height: 1.2em;
  margin-right: 1rem;
`


const AddWalletButton = styled(Button)`
  padding: 0.4em 0.8em;
  font-size: 80%;
`

interface Props {
  className?: string,
}

const WalletStatus: React.FunctionComponent<Props> = ({ className }) => {
  const [ showMenu, setShowMenu ] = useState(false)

  const toggleWalletMenu = useCallback(() => {
    setShowMenu(!showMenu)
  }, [ showMenu ])


  const switchToWallet = useCallback((setActiveWallet: Function, a: any) => {
    setActiveWallet(a)
    setTimeout(toggleWalletMenu, 100)
  }, [ toggleWalletMenu ])

  return (
    <GlobalConsumer>
      {({ wallets, activeWallet, setActiveWallet }: GlobalContextValue) => (
        activeWallet ? (
          <Container className={className}>
            <TextSpan onClick={toggleWalletMenu}>
              <StyledIcon name='user' />
              <Address address={activeWallet.address()} shorten={true} />
              <ArrowIcon name='downChevron' />
            </TextSpan>
            {showMenu ? (
              <React.Fragment>
                <Overlay onClick={toggleWalletMenu} />
                <Menu>
                  {wallets.map(a => (
                    <MenuItem
                      key={a.address()}
                      active={a.address() === activeWallet.address()}
                    >
                      <ItemAddress address={a.address()} onClick={() => switchToWallet(setActiveWallet, a)} />
                      <StyledCopyToClipboardButton value={a.address()} />
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : null}
          </Container>
        ) : null
      )}
    </GlobalConsumer>
  )
}

export default WalletStatus

