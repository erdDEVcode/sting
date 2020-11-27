import { Themes } from 'emotion-styled-utils'

import createLightTheme from './light'

export const setupThemes = (breakpoints: object = {}) => {
  const themes = new Themes({}, breakpoints)

  themes.add('light', createLightTheme())

  return themes
}