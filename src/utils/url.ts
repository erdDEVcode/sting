export const getReleasePageUrl = (version: string): string => {
  return `https://github.com/erdDEVcode/sting/releases/tag/v${version}`
}

export const openExternalUrl = (url: string) => {
  window.open(url)
}
