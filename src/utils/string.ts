import { SHA3 } from 'sha3'

export const isJson = (str: any): boolean => {
  try {
    const obj = JSON.parse(str)
    return (obj instanceof Object)
  } catch (err) {
    return false
  }
}

export const sha3 = (str: string): string => {
  const s = new SHA3(512)
  s.update(str)
  return s.digest('hex')
}

