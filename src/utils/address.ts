export const shortenAddress = (addr: string): string => `${addr.substr(0, 6)}...${addr.substr(-6)}`

export const shortenHash = (hash: string): string => `${hash.substr(0, 7)}...`

const ADDRESS_REGEX = /erd[A-Za-z0-9]{59}/

export const isValidAddress = (addr: string): boolean => !!ADDRESS_REGEX.exec(addr)
