import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Card } from '@material-ui/core'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { MoneyFormat } from '../../helpers/MoneyFormat'
import { MoneyElement } from '../../Context/App'
import { PositionProperty } from 'csstype'

const classNames = require('classnames')
const styles = theme => ({
  card: {
    width: '100%',
    maxWidth: 450
  },
  chartContainer: {
    margin: '5px 0 -20px -8px',
    width: 'calc(100% + 8px) !important' // @TODO get rid of !important
  },
  title: {
    fontSize: 14
  },
  overview: {
    lineHeight: '23px',
    verticalAlign: 'bottom',
    position: 'relative' as PositionProperty
  },
  money: {
    position: 'absolute' as PositionProperty,
    right: 0,
    color: theme.palette.primary.main
  },
  amount: {
    fontWeight: 600,
    fontSize: '22px'
  },
  currency: {
    fontSize: '16px'
  },
  pos: {
    marginBottom: 12
  }
})

interface BalanceProps {
  classes?: any
  scope?: string
  balance?: MoneyElement
  transactions?: number
  balanceHistory?: DayBalance[]
}

interface DayBalance {
  day: number | string
  amount: number
}

const BalanceOverview = (props: BalanceProps) => (
  <Card className={classNames(props.classes.card)}>
    <CardContent>
      <Typography className={props.classes.title} color='textSecondary' gutterBottom>
        {props.scope.toUpperCase()}
      </Typography>
      <Typography variant='h5' component='h2' className={props.classes.overview}>
        Overview
        <span className={props.classes.money}>
          <span className={props.classes.amount}>
            {props.balance.amount > 0 && '+'}
            <MoneyFormat money={props.balance} language={'de'} />
          </span>
          <span className={props.classes.currency}> {props.balance.currency}</span>
        </span>
      </Typography>
      <Typography className={props.classes.pos} color='textSecondary'>
        {props.transactions} transactions
      </Typography>
      {props.balanceHistory.length ? (
        <ResponsiveContainer height={140} className={props.classes.chartContainer}>
          <AreaChart data={props.balanceHistory}>
            <defs>
              <linearGradient id='colorAmount' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey={'day'} />
            <YAxis dataKey={'amount'} />
            <Area
              type='monotone'
              dataKey='amount'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorAmount)'
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </CardContent>
  </Card>
)

export default withStyles(styles)(BalanceOverview)
