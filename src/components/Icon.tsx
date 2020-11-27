import React from 'react'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  IconDefinition,
  faSlash,
  faChevronCircleDown,
  faNetworkWired,
  faExclamationTriangle,
  faUserCircle,
  faChevronDown,
  faChevronUp,
  faArrowCircleDown,
  faArrowCircleUp,
  faDollarSign,
  faInfoCircle,
  faCode,
  faSync,
  faPaperPlane,
  faQrcode,
  faUndo,
  faCopy,
  faExternalLinkAlt,
  faHistory,
  faWallet,
  faArrowLeft,
  faArrowRight,
  faHandHoldingUsd,
  faGlobeAfrica,
  faPlus,
  faRocket,
  faTerminal,
  faTools,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

import {
  faTwitter,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

const ICONS: Record<string, [string, string, IconDefinition]> = {
  plus: ['fas', 'plus', faPlus],
  twitter: ['fab', 'twitter', faTwitter],
  telegram: ['fab', 'telegram', faTelegram],
  github: ['fab', 'github', faGithub],
  web: ['fas', 'globe-africa', faGlobeAfrica],
  copy: ['fas', 'copy', faCopy ],
  config: ['fas', 'tools', faTools],
  dapp: ['fas', 'rocket', faRocket],
  'open-external': ['fas', 'external-link-alt', faExternalLinkAlt],
  close: ['fas', 'times', faTimes],
  remove: ['fas', 'times', faTimes],
  loading: ['fas', 'slash', faSlash ],
  money: ['fas', 'dollar-sign', faDollarSign],
  info: ['fas', 'info-circle', faInfoCircle],
  code: ['fas', 'code', faCode],
  back: ['fas', 'arrow-left', faArrowLeft],
  forward: ['fas', 'arrow-right', faArrowRight],
  connected: ['fas',  'network-wired', faNetworkWired ],
  error: ['fas', 'exclamation-triangle', faExclamationTriangle],
  'ledger-error': ['fas', 'exclamation-triangle', faExclamationTriangle],
  'connection-error': ['fas', 'exclamation-triangle', faExclamationTriangle ],
  'browser-tab-error': ['fas', 'exclamation-triangle', faExclamationTriangle],
  user: ['fas', 'user-circle', faUserCircle],
  receiveArrow: ['fas', 'arrow-circle-down', faArrowCircleDown],
  downChevron: ['fas', 'chevron-circle-down', faChevronCircleDown],
  upArrow: ['fas', 'chevron-up', faChevronUp],
  downArrow: ['fas', 'chevron-down', faChevronDown],
  sendArrow: ['fas', 'arrow-circle-up', faArrowCircleUp],
  send: ['fas', 'paper-plane', faPaperPlane],
  ok: ['fas', 'check', faCheck],
  history: ['fas', 'history', faHistory],
  wallet: ['fas', 'wallet', faWallet],
  stake: ['fas', 'hand-holding-usd', faHandHoldingUsd],
  qrcode: ['fas', 'qrcode', faQrcode],
  refresh: ['fas', 'sync', faSync],
  undo: ['fas', 'undo', faUndo],
  devTools: ['fas', 'terminal', faTerminal ],
}

library.add(...(
  Object.values(ICONS).map(a => a[2])
))

interface Props {
  className?: string,
  name: string,
  spin?: boolean,
  title?: string,
}

const Icon: React.FunctionComponent<Props> = ({ className, name, spin, ...props }) => {
  if (!ICONS[name]) {
    return null
  }

  const ic: any = [ ICONS[name][0], ICONS[name][1] ]

  return <FontAwesomeIcon className={className} icon={ic} spin={spin} {...props} />
}

export default Icon