import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from '../containers/Index'
import { AppState, AppContext } from '../Context/App'
import { getJwtHeader } from '../helpers/JWT'
import { ApiFactory } from '../api/factory'
import { User } from '../api/models'
import Authenticate from '../containers/Authenticate'

class App extends React.Component<{}, AppState> {
  setData = (data: Partial<AppState>) => {
    data.data && this.setState({ data: [...this.state.data, ...data.data] })
    data.accounts && this.setState({ accounts: data.accounts })

    if (data.user) {
      const { token, ...rest } = data.user as any

      this.setState({ user: rest })
    }
  }

  state: Partial<AppState> = {
    api: {
      host: process.env.API || '',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json; charset=utf-8',
        ...getJwtHeader(localStorage.getItem('user') || null)
      }
    },
    user: {
      jwt: localStorage.getItem('user') || null,
      isAuthenticated: false,
      data: {}
    },
    accounts: [],
    data: [],
    setState: this.setData
  }

  componentDidMount(): void {
    this.refreshTicket()
    setInterval(this.refreshTicket, 5000)
  }

  refreshTicket = () => {
    if (this.state.user.jwt) {
      ApiFactory(this.state.api)
        .GetUsers({})
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
          throw new Error('Elements fetch returns incorrect status')
        })
        .then((data: User) => {
          if (!this.state.user.isAuthenticated) {
            this.setState({
              user: { ...data, isAuthenticated: true }
            })
          }
        })
        .catch((e: any) => {
          this.setState({
            user: {}
          })
          // tslint:disable-next-line no-console
          console.warn(`API Error: `, e, this.state.api)
        })
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Router>
          <div className='container'>
            <Route exact path='/' render={() => <Index context={this.state} />} />
            <Route exact path='/index/:action/' render={() => <Index context={this.state} />} />
            <Route path='/index/:action/:id' render={() => <Index context={this.state} />} />
            <Route path='/authenticate' render={() => <Authenticate context={this.state} />} />
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App
