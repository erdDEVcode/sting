const { productName: appName } = require('../../../package.json')

module.exports = {
  label: 'English',
  strings: {
    appName,
    initializing: 'Initializing',
    comingSoon: 'Coming soon',
    menu: {
      application: 'Application',
      about: `About ${appName}`,
      devTools: 'Developer tools',
      reload: 'Reload',
      quit: 'Quit',
      edit: 'Edit',
      developer: 'Developer',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectAll: 'Select all',
      dappBrowser: 'Dapp browser',
    },
    browser: {
      reload: 'Refresh',
      'home': 'Goto homepage',
      'go-forward': 'Go forward',
      'go-back': 'Go back',
      'close-tab': 'Close tab',
      'new-tab': 'Open new tab',
      'show-next-tab': 'Goto next tab',
      'show-prev-tab': 'Goto previous tab',
      'toggle-tab-devtools': 'Developer tools',
      'open-in-external-browser': 'Open in external browser',
    },
    dashboard: {
      menu: {
        overview: 'Overview',
        send: 'Send',
        transactions: 'History',
        staking: 'Stake & Delegate',
        dapps: 'Dapps',
      }
    }
  },
}

