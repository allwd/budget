import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MediaQuery from 'react-responsive'
import { CssBaseline, WithTheme } from '@material-ui/core'
import Dashboard from '../components/Dashboard'
import { AppState, BudgetElement } from '../Context/App'
import Header from '../components/Header'
import Footer from '../components/MobileMenu'
import { RouteComponentProps, withRouter } from 'react-router'
import { ApiFactory } from '../api/factory'
import { Account as AccountModel } from '../api/models'
import ElementForm from '../components/ElementForm'
import { PostAccountsBodyParameters, PostElementsBodyParameters } from '../api/client'
import Accounts from '../components/Accounts'
import User from '../components/User'
import SideMenu from '../components/SideMenu'

export const DRAWER_WIDTH = 240
export type ACTION_TYPES =
  | 'edit'
  | 'view'
  | 'create'
  | 'delete'
  | 'dashboard'
  | 'account'
  | 'login'
  | 'statistics'

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex'
  },
  title: {
    flexGrow: 1
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  },
  container: {
    height: 'calc(100vh - 113px)',
    width: '100%',
    margin: '57px 0',
    overflowY: 'scroll'
  }
})

export interface IndexProps extends RouteComponentProps {
  context?: AppState
  classes?: any
}

export interface IndexState {
  open: boolean
}

class Index extends React.Component<IndexProps, IndexState> {
  state = {
    open: true
  }

  handleDrawerToggle = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  fetch() {
    ApiFactory(this.props.context.api)
      .GetElements({})
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('Elements fetch returns incorrect status')
      })
      .then((data: BudgetElement[]) => {
        this.props.context.setState({
          data: data
        })
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })

    ApiFactory(this.props.context.api)
      .GetAccounts({})
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('Accounts fetch returns incorrect status')
      })
      .then((data: AccountModel[]) => {
        this.props.context.setState({
          accounts: data
        })
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  componentWillReceiveProps(nextProps: Readonly<IndexProps>, nextContext: any): void {
    if (
      nextProps.context.user.isAuthenticated &&
      this.props.context.user.jwt !== nextProps.context.user.jwt
    ) {
      this.fetch()
    }
  }

  handleUserIconClick = (event: React.SyntheticEvent<HTMLElement>) => {
    if (this.props.context.user.isAuthenticated) {
      this.props.history.push('/user')
    } else {
      this.props.history.push('/authenticate')
    }
  }

  handleElementFormSubmit = (data: PostElementsBodyParameters) => {
    ApiFactory(this.props.context.api)
      .PostElements(data, {})
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('Elements post returns incorrect status')
      })
      .then((data: any) => {
        this.props.history.push('/')
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  handleAccountsSubmit = (data: PostAccountsBodyParameters) => {
    ApiFactory(this.props.context.api)
      .PostAccounts(data, {})
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('Accounts post returns incorrect status')
      })
      .then((data: any) => {
        this.fetch()
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  handleAccountsRemove = (id: string) => {
    ApiFactory(this.props.context.api)
      .DeleteAccountsById(id, {})
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error('Accounts DELETE returns incorrect status')
      })
      .then((data: any) => {
        this.fetch()
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  handleFooterChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.props.history.push(`/${value}`)
  }

  render() {
    const { classes } = this.props
    const { action, id } = this.props.match.params as { action: string; id: string }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header
          open={this.state.open}
          onUserIconClick={this.handleUserIconClick}
          onMenuIconClick={this.handleDrawerToggle}
        />
        <MediaQuery query='(min-width: 768px)'>
          <SideMenu open={this.state.open} onChevronLeftIconClick={this.handleDrawerToggle} />
        </MediaQuery>
        <div className={classes.container}>
          {!action ? (
            <Dashboard
              data={this.props.context.data}
              user={this.props.context.user}
              accounts={this.props.context.accounts}
            />
          ) : ['edit', 'create'].includes(action) ? (
            <ElementForm
              action={action as ACTION_TYPES}
              id={id}
              accounts={this.props.context.accounts}
              onSubmit={this.handleElementFormSubmit}
            />
          ) : action === 'accounts' ? (
            <Accounts
              onRemove={this.handleAccountsRemove}
              accounts={this.props.context.accounts}
              onSubmit={this.handleAccountsSubmit}
            />
          ) : action === 'user' ? (
            <User user={this.props.context.user} />
          ) : (
            'Error 404'
          )}
        </div>
        <MediaQuery query='(max-width: 767px)'>
          <Footer
            active={(action || '') + (id !== undefined ? `/${id}` : '')}
            onChange={this.handleFooterChange}
          />
        </MediaQuery>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter<IndexProps>(Index))
