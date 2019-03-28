import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { FlexDirectionProperty, PositionProperty } from 'csstype'
import { PostAccountsBodyParameters } from '../api/client'
import { Account as AccountModel, Money } from '../api/models'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import StarIcon from '@material-ui/icons/Star'
import RemoveIcon from '@material-ui/icons/Remove'
import Balance from './Balance'
import { Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    display: 'flex',
    flexDirection: 'column' as FlexDirectionProperty,
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

interface AccountsProps {
  onSubmit?: any
  onRemove?: any
  onEdit?: any
  accounts?: AccountModel[]
  isFetching?: boolean
  classes?: any
}

interface AccountsState {
  data: Partial<PostAccountsBodyParameters>
}

class Accounts extends React.Component<AccountsProps, AccountsState> {
  state = {
    data: {
      title: '',
      type: 'bank',
      money: null as Money
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!this.props.isFetching) {
      console.log(this.state.data)
      this.props.onSubmit(this.state.data)
    }
  }

  handleRemove = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    console.log(event.currentTarget)
    if (!this.props.isFetching) {
      this.props.onRemove(event.currentTarget.id)
    }
  }

  handleInputChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      data: Object.assign({}, this.state.data, {
        [data.currentTarget.name]: data.currentTarget.value
      })
    })
  }

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, target: string): void => {
    this.setState({
      data: Object.assign({}, this.state.data, { [target]: event.target.value })
    })
  }

  handleMoneyInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      data: Object.assign({}, this.state.data, {
        money: {
          amount: event.currentTarget.value,
          currency: (this.state.data.money && this.state.data.money.currency) || 'EUR'
        }
      })
    })
  }

  handleCurrencySelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({
      data: Object.assign({}, this.state.data, {
        money: {
          amount: (this.state.data.money && this.state.data.money.amount) || 0,
          currency: event.target.value
        }
      })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Accounts
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='title'>Account name</InputLabel>
              <Input
                id='title'
                name='title'
                autoComplete='title'
                autoFocus
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='money'>Money</InputLabel>
              <Input
                id='money'
                name='money'
                autoComplete='money'
                autoFocus
                onChange={this.handleMoneyInputChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='currency'>Account currency</InputLabel>
              <Select
                value={(this.state.data.money && this.state.data.money.currency) || 'EUR'}
                onChange={this.handleCurrencySelectChange}
                input={<Input name='currency' id='currency-helper' />}
              >
                <MenuItem value={'EUR'}>Euro</MenuItem>
                <MenuItem value={'PLN'}>Złoty</MenuItem>
              </Select>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Add new account
            </Button>
            <Divider />
            {this.props.accounts && this.props.accounts.length > 0 && (
              <List component='nav'>
                <ListItem button>
                  <ListItemAvatar>
                    <StarIcon />
                  </ListItemAvatar>
                  <ListItemText inset primary='Star signifies default' />
                </ListItem>
                {this.props.accounts.map(value => (
                  <ListItem key={value._id} button>
                    <ListItemText
                      inset
                      primary={value.title}
                      secondary={<Balance money={value.money} auto />}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        id={value._id}
                        component={props => <div onClick={this.handleRemove} {...props} />}
                        aria-label='Delete'
                      >
                        <RemoveIcon color={'secondary'} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Accounts)
