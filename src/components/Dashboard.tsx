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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    margin: theme.spacing.unit,
    marginBottom: 30
  },
  tableContainer: {
    height: 320
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

export interface DashboardProps {
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
    lastMonthBalance: [] // get it from API endpoints with params accountId possible null(for all accounts altogether) - returns MonthlyHistoryBalance
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
          const date = new Date(value.date)
          if (date.getMonth() === now.getMonth() && value.type !== 'transfer') {
            // @TODO check for  type that doesn't change balance
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
        <div className={this.props.classes.appBarSpacer} />
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
        <div className={this.props.classes.tableContainer} />
      </main>
    )
  }
}

export default withStyles(styles)(Dashboard)
