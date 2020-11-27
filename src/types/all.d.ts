import { Balance, Rate } from 'elrondjs'

export * from 'elrondjs'
export * from 'elrond-data'
export * from './network'

export type Rates = Record<string, Rate>

export type Balances = Record<string, Balance>

export interface Delegation {
  claimable: string,
  activeStake: string,
  waitingStake: string,
}
