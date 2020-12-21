const { productName: appName } = require('../../../package.json')

module.exports = {
  label: 'English',
  strings: {
    appName,
    initializing: 'Initializing',
    comingSoon: 'Coming soon',
    dashboard: {
      menu: {
        overview: 'Overview',
        send: 'Send',
        tokens: 'Tokens',
      }
    }
  },
}

