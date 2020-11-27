import { Color } from 'emotion-styled-utils'

import {
  gunMetal,
  deepSaffron,
  paleCerulean,
  bdazzledBlue,
  middleYellow,
  lightCyan,
  white,
  black,
  grey,
  lightGrey,
  lighterGrey,
  darkGrey,
  red,
  green,
  yellow,
  transparent,
  pastelGreen,
} from './colors'

const bgColor = gunMetal
const textColor = white//primary1
const lightYellow = new Color(middleYellow).lighten(0.6).toString()

export default (): any => ({
  layout: {
    bgColor,
    textColor,
  },
  footer: {
    textColor: bdazzledBlue,
    hover: {
      textColor: white,
    },
  },
  panelButton: {
    borderColor: white,
  },
  button: {
    disabledBgColor: grey,
    disabledTextColor: darkGrey,
    disabledBorderColor: grey,
    bgColor: transparent,
    textColor: deepSaffron,
    borderColor: deepSaffron,
    hoverBgColor: deepSaffron,
    hoverTextColor: black,
    hoverBorderColor: deepSaffron,
    shadowColor: darkGrey,
  },
  textInput: {
    borderColor: lightGrey,
    hover: {
      borderColor: darkGrey,
    },
    bgColor: white,
    errorBorderColor: red,
    errorBgColor: yellow,
    placeholderTextColor: lightGrey,
  },
  infoBox: {
    borderColor: middleYellow,
    bgColor: lightYellow,
    textColor: black,
  },
  errorBox: {
    bgColor: red,
    textColor: white,
    iconColor: yellow,
    anchor: {
      textColor: white,
      hoverTextColor: white,
      hoverBgColor: black,
      borderBottomColor: white,
    },
  },
  toast: {
    error: {
      bgColor: red,
      textColor: white,
      iconColor: yellow,
    },
    trackTransaction: {
      pending: {
        bgColor: lightYellow,
        textColor: black,
        iconColor: yellow,
      },
      success: {
        bgColor: pastelGreen,
        textColor: black,
        iconColor: green,
      },
    },
  },  
  headerClickable: {
    textColor: white,
    bgColor: transparent,
    hover: {
      bgColor: paleCerulean,
      textColor: bgColor,
    },
  },
  networkPanel: {
    bgColor: bdazzledBlue,
    item: {
      active: {
        bgColor: white,
        textColor: black,
      },
      inactive: {
        bgColor: transparent,
        textColor: white,
      },
      url: {
        textColor: grey,
      },
    },
  },
  networkState: {
    failIcon: {
      color: red,
    },
    passIcon: {
      color: paleCerulean,
    },
  },
  walletState: {
    icon: {
      color: paleCerulean,
    },
    menu: {
      shadowColor: black,
      item: {
        bgColor: gunMetal,
        textColor: paleCerulean,
        borderColor: paleCerulean,
        selected: {
          bgColor: paleCerulean,
          textColor: gunMetal,
        }
      }
    }
  },
  modal: {
    overlay: {
      bgColor: 'rgba(0, 0, 0, 0.8)',
    },
    bgColor: white,
    textColor: black,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
  },
  aboutModal: {
    bgColor,
    textColor,
  },
  valueBox: {
    bgColor: new Color(middleYellow).lighten(0.8).toString(),
    textColor: black,
  },
  menu: {
    activeItem: {
      bgColor: white,
      textColor: black,
    },
    inactiveItem: {
      bgColor: bdazzledBlue,
      textColor: paleCerulean,
    },
    hoverInactiveItem: {
      bgColor: paleCerulean,
      textColor: gunMetal,
    },
  },
  content: {
    bgColor: white,
    textColor: black,
  },
  send: {
    currency: {
      textColor: grey,
    },
    waitingForLedger: {
      textColor: grey,
    },
  },
  overview: {
    totalContainer: {
      bgColor: lightCyan,
    },
    tableContainer: {
      heading: {
        borderColor: darkGrey,
      },
      table: {
        borderColor: lighterGrey,
        header: {
          textColor: grey,
        }
      },
    },
    balanceRate: {
      textColor: gunMetal,
    },
    actionBox: {
      metaText: {
        color: grey,
      },
    },
  },
  transactionItem: {
    hover: {
      bgColor: lightCyan,
    },
    borderColor: paleCerulean,
    type: {
      send: {
        textColor: gunMetal,
      },
      earn: {
        textColor: new Color(green).darken(0.2).toString(),
      },
      contract: {
        textColor: new Color(middleYellow).darken(0.3).toString(),
      },
      receive: {
        textColor: new Color(green).darken(0.1).toString(),
      },
      failed: {
        textColor: lightGrey,
      }
    },
    description: {
      textColor: grey,
    },
    details: {
      borderColor: lightGrey,
      bgColor: lighterGrey,
    }
  },
  tokenValueStatic: {
    token: {
      textColor: grey,
    },
  },
  createPassphrase: {
    mnemonic: {
      borderColor: paleCerulean,
    }
  },
  addWallet: {
    button: {
      icon: {
        color: deepSaffron,
      },
    },
  },
  openLedger: {
    error: {
      icon: {
        color: red,
      }
    }
  },
  connectWalletModal: {
    footnote: {
      textColor: paleCerulean,
    },
  },
  browser: {
    configModal: {
      allowedDapps: {
        item: {
          hover: {
            borderColor: bdazzledBlue,
          },
        },
      },
    },
    tab: {
      active: {
        bgColor: lighterGrey,
        textColor: black,
      },
      inactive: {
        bgColor: bdazzledBlue,
        textColor: paleCerulean,
      },
      error: {
        textColor: red,
      },
    },
  },
  tooltip: {
    bgColor: black,
    textColor: white,
  }
})
