import { Color } from 'emotion-styled-utils'

export const lighten = (c: string, a: number) => Color(c).lightness(a).toString()
export const opacify = (c: string, a: number) => Color(c).alpha(a).toString()
