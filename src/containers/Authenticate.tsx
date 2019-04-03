import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { AppState, UserState } from '../Context/App'
import { RouteComponentProps, withRouter } from 'react-router'
import { ApiFactory } from '../api/factory'
import { PostUsersAuthenticateBodyParameters, PostUsersRegisterBodyParameters } from '../api/client'
import Register from '../components/Authenticate/Register'
import Button from '@material-ui/core/Button'
import Login from '../components/Authenticate/Login'
import { User } from '../api/models'

const styles = theme => ({
  root: {
    padding: 15,
    marginTop: theme.spacing.unit * 6
  }
})

export interface AuthenticateProps extends RouteComponentProps {
  context?: AppState
  classes?: any
}

type AuthenticateType = 'login' | 'register'

export interface AuthenticateState {
  type?: AuthenticateType
  data?: PostUsersRegisterBodyParameters | PostUsersAuthenticateBodyParameters
  response?: any
}

class Authenticate extends React.Component<AuthenticateProps, AuthenticateState> {
  state = {
    data: {
      email: '',
      password: '',
      name: '',
      language: 'en'
    },
    type: (this.props.context.user.jwt ? 'login' : 'register') as AuthenticateType,
    response: ''
  }

  // @TODO remove
  componentDidMount(): void {
    this.setState({
      data: {
        email: 'dasd@dasd',
        password: 'string',
        name: 'testName'
      }
    })
  }

  handleInputChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      data: Object.assign({}, this.state.data, {
        [data.currentTarget.name]: data.currentTarget.value
      })
    })
  }

  handleLogin = (): void => {
    ApiFactory(this.props.context.api)
      .PostUsersAuthenticate(this.state.data)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else if (response) throw new Error('Authenticate login returns incorrect status')
      })
      .then((data: UserState) => {
        localStorage.setItem('user', JSON.stringify(data))
        this.props.context.setState({
          user: data
        })
        this.props.history.push('/')
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  handleRegister = (): void => {
    ApiFactory(this.props.context.api)
      .PostUsersRegister(this.state.data)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else if (response) throw new Error('Authenticate registration returns incorrect status')
      })
      .then((data: any) => {
        this.setState({
          response: 'Successfully registered',
          type: 'login' as AuthenticateType
        })
      })
      .catch((e: any) => {
        // tslint:disable-next-line no-console
        console.warn(`API Error: `, e, this.props.context.api)
      })
  }

  handlePageTypeSwitch = (): void => {
    this.setState({
      type: this.state.type === 'login' ? 'register' : 'login'
    })
  }

  render() {
    const { email, password } = this.state.data

    return (
      <div className={this.props.classes.root}>
        <div onClick={this.handlePageTypeSwitch}>
          <Button size='small' variant='text' color='primary'>
            Change to {this.state.type === 'login' ? 'register' : 'login'}
          </Button>
        </div>
        {this.state.type === 'login' ? (
          <Login
            onInputChange={this.handleInputChange}
            onSubmit={this.handleLogin}
            data={this.state.data}
          />
        ) : (
          <Register
            onInputChange={this.handleInputChange}
            onSubmit={this.handleRegister}
            data={this.state.data}
          />
        )}
        <div>
          <div className='g-signin2' data-onsuccess='onSignIn' />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter<AuthenticateProps>(Authenticate))
