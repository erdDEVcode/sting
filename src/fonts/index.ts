// @ts-ignore
import OpenSans from './OpenSans.ttf'
// @ts-ignore
import OpenSansBold from './OpenSans-Bold.ttf'
// @ts-ignore
import OpenSansBoldItalic from './OpenSans-BoldItalic.ttf'
// @ts-ignore
import OpenSansItalic from './OpenSans-Italic.ttf'
// @ts-ignore
import OpenSansLight from './OpenSans-Light.ttf'
// @ts-ignore
import OpenSansLightItalic from './OpenSans-LightItalic.ttf'
// @ts-ignore
import OpenSansSemiBold from './OpenSans-SemiBold.ttf'
// @ts-ignore
import OpenSansSemiBoldItalic from './OpenSans-SemiBoldItalic.ttf'
// @ts-ignore
import Raleway from './Raleway-Regular.ttf'
// @ts-ignore
import RalewayThin from './Raleway-Thin.ttf'
// @ts-ignore
import RalewayBold from './Raleway-Bold.ttf'


interface FontAttributes {
  weight?: string,
  style?: string,
}

export const addWebFont = (url: string, name: string, attrs: FontAttributes = {}) => {
  // Generate required css
  const fontStyles = `@font-face {
    src: url(${url});
    font-family: ${name}${attrs.weight || ''}${attrs.style || ''};
  }`

  // Create stylesheet
  const styleElem = document.createElement('style')
  styleElem.type = 'text/css'
  if ((styleElem as any).styleSheet) {
    (styleElem as any).styleSheet.cssText = fontStyles
  } else {
    styleElem.appendChild(document.createTextNode(fontStyles))
  }

  // Inject stylesheet
  document.head.appendChild(styleElem)
}

export const setupCoreFonts = () => {
  addWebFont(Raleway, 'Raleway')
  addWebFont(RalewayThin, 'Raleway', { weight: 'Light' })
  addWebFont(RalewayBold, 'Raleway', { weight: 'Bold' })

  addWebFont(OpenSans, 'OpenSans')
  addWebFont(OpenSansBold, 'OpenSans', { weight: 'Bold' })
  addWebFont(OpenSansItalic, 'OpenSans', { style: 'Italic' })
  addWebFont(OpenSansBoldItalic, 'OpenSans', {
    weight: 'Bold',
    style: 'Italic'
  })
  addWebFont(OpenSansLight, 'OpenSans', { weight: 'Light' })
  addWebFont(OpenSansLightItalic, 'OpenSans', {
    weight: 'Light',
    style: 'Italic'
  })
  addWebFont(OpenSansSemiBold, 'OpenSans', { weight: 'SemiBold' })
  addWebFont(OpenSansSemiBoldItalic, 'OpenSans', {
    weight: 'SemiBold',
    style: 'Italic'
  })

  const nameMap: Record<string, string> = {
    '': 'OpenSans',
    'body': 'OpenSans',
    'header': 'Raleway',
    'data': 'monospace',
  }

  const weightMap: Record<string, string> = {
    light: 'Light',
    '': '',
    'regular': '',
    'normal': '',
    bold: 'Bold',
    semiBold: 'SemiBold',
    extraBold: 'ExtraBold',
  }

  const styleMap: Record<string, string> = {
    '': '',
    regular: '',
    normal: '',
    italic: 'Italic',
  }

  return (name: string = '', weight: string = '', style: string = '') => `
    font-family: ${nameMap[name]}${weightMap[weight]}${styleMap[style]};
  `
}
