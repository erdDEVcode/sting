export const makeConstants = (a: string[]): Record<string, string> => a.reduce((m, v) => {
  m[v] = v
  return m
}, {} as Record<string, string>)

