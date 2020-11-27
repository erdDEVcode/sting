import { data } from 'elrond-data'

export const NETWORKS = [
  {
    name: 'Mainnet',
    url: 'https://gateway.elrond.com',
    primaryToken: 'egld',
    ...data.getNetwork('1')
  },
  {
    name: 'Testnet',
    url: 'https://testnet-gateway.elrond.com',
    primaryToken: 'xegld',
    ...data.getNetwork('T')
  }
]