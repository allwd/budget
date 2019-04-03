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
    marginTop: theme.spacing.unit * 2,
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

interface RegisterProps {
  data: {
    [key: string]: string
  }
  classes?: any
  onSubmit?: () => void
  onInputChange?: (data: React.ChangeEvent<HTMLInputElement>) => void
  isFetching?: boolean
  error?: string
}

class Register extends React.Component<RegisterProps> {
  state = {
    email: '',
    password: '',
    name: '',
    language: 'en',
    data: {}
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!this.props.isFetching) {
      this.props.onSubmit()
    }
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
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input
                id='email'
                name='email'
                autoComplete='email'
                value={this.props.data.email || ''}
                autoFocus
                onChange={this.props.onInputChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                name='name'
                type='name'
                id='name'
                autoComplete='name'
                value={this.props.data.name || ''}
                onChange={this.props.onInputChange}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.props.onInputChange}
              />
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Register)
