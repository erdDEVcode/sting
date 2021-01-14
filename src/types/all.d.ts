import { Balance, Rate } from 'elrondjs'

export { Provider, NetworkConfig, Wallet, ContractQueryParams, SignedTransaction, Transaction, ContractQueryResult, Address, TransactionReceipt, TransactionOnChain, TokenData, Signer } from 'elrondjs'
export * from 'elrond-data'
export * from './network'

export type Rates = Record<string, Rate>

export type Balances = Record<string, Balance>

export interface Delegation {
  claimable: string,
  activeStake: string,
  waitingStake: string,
}
