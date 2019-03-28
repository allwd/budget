import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Redirect } from 'react-router'
import { UserState } from '../Context/App'

const styles = theme => ({})

interface UserProps {
  classes?: any
  user?: UserState
}

class User extends React.Component<UserProps> {
  render() {
    return this.props.user.isAuthenticated ? (
      <h2>Hello {this.props.user.data.name}!</h2>
    ) : (
      <Redirect to={'/authenticate'} />
    )
  }
}

export default withStyles(styles)(User)
