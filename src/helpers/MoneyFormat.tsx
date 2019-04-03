import * as React from 'react'
import { MoneyElement } from '../Context/App'

interface MoneyFormatProps {
  money: MoneyElement
  language: string
}

export class MoneyFormat extends React.PureComponent<MoneyFormatProps> {
  static formatMoney(money: MoneyElement, language: string): string {
    return Number(money.amount).toLocaleString('de-DE', {
      minimumFractionDigits: 2
    })
  }

  static shortenMoney(money: number) {
    const n = money
    const m = String(money)
    if (n > Math.pow(10, 6)) {
      return `${m[0]}.${m[1]}KK`
    } else if (n > Math.pow(10, 5)) {
      return `${m[0]}${m[1]}${m[2]}K`
    } else if (n > Math.pow(10, 4)) {
      return `${m[0]}${m[1]}K`
    } else if (n > 1000) {
      return `${m[0]}.${m[1]}K`
    } else {
      return m
    }
  }

  render() {
    return MoneyFormat.formatMoney(this.props.money, this.props.language)
  }
}
