import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { MoneyFormat } from '../helpers/MoneyFormat'
import { MoneyElement } from '../Context/App'

const classNames = require('classnames')
const styles = theme => ({
  root: {},
  expense: {
    color: theme.palette.error.main
  },
  income: {
    color: theme.palette.primary.main
  }
})

interface BalanceProps {
  classes?: any
  money: MoneyElement
  type?: string
  className?: string
  auto?: boolean
}

const Balance = (props: BalanceProps) => {
  const { classes, money, className, auto } = props

  const type = !auto ? props.type : money.amount > 0 ? 'income' : 'expense'

  return (
    <span
      className={classNames(
        classes.root,
        {
          [classes.expense]: type === 'expense',
          [classes.income]: type === 'income'
        },
        className
      )}
    >
      {type === 'income' && '+'}
      <MoneyFormat money={money} language={'de'} /> {money.currency}
    </span>
  )
}

export default withStyles(styles)(Balance)
