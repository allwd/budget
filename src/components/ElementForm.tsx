// on edit disable some parts of the form and show delete button
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
import { FlexDirectionProperty } from 'csstype'
import { ACTION_TYPES } from '../containers/Index'
import { PostElementsBodyParameters } from '../api/client'
import { Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { Account as AccountModel } from '../api/models'

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
    marginTop: theme.spacing.unit * 8,
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

interface ElementFormProps {
  classes?: any
  onSubmit?: any
  isFetching?: boolean
  accounts?: AccountModel[]
  error?: string
  id?: string
  action?: ACTION_TYPES
}

interface ElementFormState {
  data: Partial<PostElementsBodyParameters>
}

interface InputProps {
  name?: string
  label?: string
  callback?: any
  value?: string
  type?: string
}

interface SelectProps extends InputProps {
  values?: {
    [key: string]: string
  }
}

class ElementForm extends React.Component<ElementFormProps, ElementFormState> {
  state = {
    data: {
      account: '',
      tags: [],
      category: '',
      image: '',
      type: 'income',
      money: null
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!this.props.isFetching) {
      this.props.onSubmit(this.state.data)
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

  handleMoneyInputChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      data: Object.assign({}, this.state.data, {
        money: {
          amount: data.currentTarget.value,
          currency: 'EUR'
        }
      })
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          ElementForm
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin='normal' required fullWidth>
            {/*TODO*/}
            <InputLabel htmlFor='account'>Account</InputLabel>
            <Select
              value={this.state.data.account}
              onChange={event => this.handleSelectChange(event, 'account')}
              input={<Input name='account' id='account-helper' />}
            >
              {this.props.accounts && this.props.accounts.length > 0
                ? this.props.accounts.map(value => (
                    <MenuItem value={value._id} key={value._id}>
                      {value.title}
                    </MenuItem>
                  ))
                : null}
              {/*{Object.keys(this.props.accounts && this.props.accounts.length > 0 ? Object.assign({}, ...this.props.accounts.map(value => ({ [value._id]: value.title }))) : {}).map((key) => (*/}
            </Select>
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='tags'>Tags</InputLabel>
            <Input
              id='tags'
              name='tags'
              autoComplete='tags'
              value={this.state.data.tags || ''}
              autoFocus
              onChange={this.handleInputChange}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Input
              id='category'
              name='category'
              autoComplete='category'
              value={this.state.data.category || ''}
              autoFocus
              onChange={this.handleInputChange}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='type'>Type</InputLabel>
            <Select
              value={'income'}
              onChange={event => this.handleSelectChange(event, 'type')}
              input={<Input name='type' id='type-helper' />}
            >
              <MenuItem value={'income'}>Income</MenuItem>
              <MenuItem value={'expense'}>Expense</MenuItem>
              <MenuItem value={'transfer'}>Transfer</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='money'>Money</InputLabel>
            <Input
              id='money'
              name='money'
              autoComplete='money'
              value={this.state.data.money ? String(this.state.data.money.amount) : ''}
              autoFocus
              onChange={this.handleMoneyInputChange}
            />
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Save element
          </Button>
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(ElementForm)
