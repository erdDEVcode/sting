const I21n = require('i21n')

const locales = {
  /* eslint-disable global-require */
  'en-gb': require('./lang/en-gb'),
  /* eslint-enable global-require */
}

const i21n = new I21n({}, { defaultLocale: 'en-gb' })

Object.entries(locales).forEach(([ locale, data ]) => {
  i21n.loadLocale(locale, data.strings)
})

export const languages = Object.keys(locales).reduce((m, k) => {
  m[k] = locales[k].label
  return m
}, {})

export const t = (id, args) => i21n.t(id, args)

export const tSub = (id, args) => i21n.sub(id, args)
