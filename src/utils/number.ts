import Decimal from 'decimal.js'
import { Balance, Rate, data, Token } from 'elrond-data'

const PreciseDecimal = Decimal.clone({ defaults: true, precision: 38, toExpNeg: -19, toExpPos: 38 })

export enum AssetValueNumberStyle {
  SUCCINCT_SCALED = 1,
  RAW = 2,
  RAW_SCALED = 3,
}

interface AssetValueStringOptions {
  numberStyle?: AssetValueNumberStyle,
  showSymbol?: boolean,
}

const isNotEmpty = (a: any) => a !== null && a !== undefined && a !== ''

const getDivider = (asset: Token) => new PreciseDecimal(10).pow(asset.decimals)

const toDec = (a: any) => new PreciseDecimal(a.toString())

export class AssetValue {
  _asset: Token
  _decimalDivider: Decimal
  _n: Decimal

  constructor(asset: Token, amount: any) {
    this._asset = asset
    this._decimalDivider = getDivider(asset)
    this._n = new PreciseDecimal(amount)
  }

  static fromTokenAmount (token: string, amount: any) {
    return new AssetValue(data.getToken(token), amount)
  }

  static fromTokenScaledAmount(token: string, scaledAmount: any) {
    return new AssetValue(
      data.getToken(token),
      new PreciseDecimal(scaledAmount).mul(getDivider(data.getToken(token))).toString()
    )
  }

  static fromBalance(balance: Balance) {
    return AssetValue.fromTokenAmount(balance.token, balance.amount)
  }

  static fromScaledBalance(balance: Balance) {
    return AssetValue.fromTokenScaledAmount(balance.token, balance.amount)
  }

  static fromTokenCurrencyValue(token: string, rate: Rate, currencyAmount: any) {
    return AssetValue.fromTokenScaledAmount(
      token,
      new PreciseDecimal(currencyAmount).div(rate.value).toString()
    )
  }

  getAsset (): Token {
    return this._asset
  }

  lt (val: any): boolean {
    return this._n.lt(toDec(val))
  }

  lte (val: any): boolean {
    return this._n.lte(toDec(val))
  }

  gt (val: any): boolean {
    return this._n.gt(toDec(val))
  }

  gte (val: any): boolean {
    return this._n.gte(toDec(val))
  }

  add (val: any): AssetValue {
    return AssetValue.fromTokenAmount(this._asset.id, (toDec(val).add(this._n)).toString())
  }

  sub(val: any): AssetValue {
    return AssetValue.fromTokenAmount(this._asset.id, this._n.sub(toDec(val)).toString())
  }

  mul (val: any): AssetValue {
    return AssetValue.fromTokenAmount(this._asset.id, (toDec(val).mul(this._n)).toString())
  }

  toCurrencyValue(rate: Rate): AssetValue {
    return new AssetValue(data.getToken(rate.currency), this._n.div(this._decimalDivider).mul(rate.value))
  }

  toBalance(): Balance {
    return {
      token: this._asset.id,
      amount: this.toString(),
    }
  }

  toNumber(options: AssetValueStringOptions = {}): number {
    return parseInt(this.toString({ ...options, showSymbol: false }), 10)
  }

  toString(options: AssetValueStringOptions = {}): string {
    let str

    const nScaled = this._n.div(this._decimalDivider)

    switch (options.numberStyle) {
      case AssetValueNumberStyle.SUCCINCT_SCALED:
        if (nScaled.greaterThanOrEqualTo(1)) {
          str = nScaled.toDecimalPlaces(2, Decimal.ROUND_DOWN).toString()
        } else if (nScaled.greaterThanOrEqualTo('0.000001')) {
          str = nScaled.toSignificantDigits(2, Decimal.ROUND_DOWN).toString()
        } else {
          str = `0`
        }
        break
      case AssetValueNumberStyle.RAW_SCALED:
        str = nScaled.toString()
        break
      case AssetValueNumberStyle.RAW:
      default:
        str = this._n.toString()
    }

    return this._formatString(str, this._asset, options)
  }

  toCurrencyValueString(rate: Rate, options: AssetValueStringOptions = {}): string {
    const value = this._n.div(this._decimalDivider).mul(rate.value)

    let str

    switch (options.numberStyle) {
      case AssetValueNumberStyle.SUCCINCT_SCALED:
        str = value.toDecimalPlaces(2, Decimal.ROUND_DOWN).toString()
        break
      case AssetValueNumberStyle.RAW:
        throw new Error('RAW number style not supported for currency value string')
      case AssetValueNumberStyle.RAW_SCALED:
      default:
        str = value.toString()
    }

    return this._formatString(str, data.getToken(rate.currency), options)
  }

  _formatString(valueStr: string, asset: Token, options: AssetValueStringOptions = {}): string {
    if (options.showSymbol) {
      if (asset.symbolFormatting) {
        return asset.symbolFormatting.replace('{symbol}', asset.symbol).replace('{value}', valueStr)
      } else {
        return `${valueStr} ${asset.symbol}`
      }
    } else {
      return valueStr
    }
  }
}

export const isValidGasLimit = (a: any): boolean => isNotEmpty(a) ? new PreciseDecimal(`${a}`).gt(0) : false
export const isValidGasPrice = (a: any): boolean => isNotEmpty(a) ? new PreciseDecimal(`${a}`).gt(0) : false
export const isValidValue = (a: any): boolean => isNotEmpty(a) ? new PreciseDecimal(`${a}`).gte(0) : false
