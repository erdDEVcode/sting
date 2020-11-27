import { NetworkMetadata } from "elrond-data"

export interface NetworkEndpoint extends NetworkMetadata {
  name: string,
  url: string,
  showValueInToken?: boolean,
}

export interface Network {
  endpoint: NetworkEndpoint,
  connection: Provider,
  config?: NetworkConfig,
  failure?: string,
}