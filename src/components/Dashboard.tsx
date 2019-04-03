import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { BudgetElement } from '../Context/App'
import { PositionProperty } from 'csstype'
import ElementList from './ElementList'
import Divider from '@material-ui/core/Divider'
import BalanceOverview from './Statistics/BalanceOverview'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterListOutlined'
import { Account as AccountModel } from '../api/models'
import { User } from '../api/models'

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  chartContainer: {
    margin: theme.spacing.unit,
    marginBottom: 30
  },
  listElement: {
    margin: 10
  },
  historyLabel: {
    fontSize: '22px'
  },
  headline: {
    margin: theme.spacing.unit,
    lineHeight: '48px',
    height: '48px',
    verticalAlign: 'middle',
    position: 'relative' as PositionProperty
  },
  filterButton: {
    position: 'absolute' as PositionProperty,
    right: 0,
    top: 0,
    fontSize: '30px'
  }
})

interface DashboardProps {
  classes?: any
  user?: User | any
  data?: BudgetElement[]
  accounts?: AccountModel[]
}

interface MonthlyHistoryBalance {
  day: number
  amount: number
}

interface DashboardState {
  lastMonthBalance: MonthlyHistoryBalance[]
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state: DashboardState = {
    lastMonthBalance: [] // @TODO fetch from API
  }

  setMonthlyBalanceHistory() {
    const accounts = Object.values(this.props.accounts)

    if (accounts.length) {
      const now = new Date()
      const history: MonthlyHistoryBalance[] = []
      let currentAmount = 1000
      const balance = []

      this.props.data // @TODO map other accounts or sth, also set up a default account for user
        .forEach(value => {
          const date = new Date(value.createdDate)
          if (date.getMonth() === now.getMonth() && value.type !== 'transfer') {
            // @TODO check for  type that doesn't change balance
            if (value.type !== 'transfer')
              balance[date.getDay()] += (value.type === 'income' ? 1 : -1) * value.money.amount
          }
        })

      for (let day = now.getDay(); day >= 1; day--) {
        currentAmount += balance[day] ? balance[day] : 0

        history.push({
          day: day,
          amount: currentAmount
        })
      }

      this.setState({
        lastMonthBalance: history
      })
    }
  }

  componentWillUpdate(
    nextProps: Readonly<DashboardProps>,
    nextState: Readonly<DashboardState>,
    nextContext: any
  ): void {
    this.setMonthlyBalanceHistory()
  }

  render() {
    return (
      <main className={this.props.classes.content}>
        <Typography component='div' className={this.props.classes.chartContainer}>
          <BalanceOverview
            scope={'ALL ACCOUNTS'}
            balance={{
              amount: Number(
                this.props.accounts.length
                  ? this.props.accounts.reduce(
                      (previousValue, currentValue) =>
                        previousValue + ((currentValue.money && currentValue.money.amount) || 0),
                      0
                    )
                  : 0
              ),
              currency: 'EUR'
            }}
            transactions={this.props.data.length}
            balanceHistory={this.state.lastMonthBalance}
          />
        </Typography>
        <div className={this.props.classes.headline}>
          <IconButton className={this.props.classes.filterButton}>
            <FilterListIcon />
          </IconButton>
          <span className={this.props.classes.historyLabel}>History</span>
        </div>
        <Divider variant='fullWidth' component='div' />
        <Typography component='div' className={this.props.classes.chartContainer}>
          {this.props.data ? (
            <ElementList data={this.props.data} />
          ) : (
            'You do not have any elements yet. Press + button to add new expenses or income :)'
          )}
        </Typography>
      </main>
    )
  }
}

export default withStyles(styles)(Dashboard)
