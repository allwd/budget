import * as React from 'react'
import { BudgetElement } from '../Context/App'
import withStyles from '@material-ui/core/styles/withStyles'
import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import CardActions from '@material-ui/core/es/CardActions'
import Button from '@material-ui/core/Button'

const classNames = require('classnames')

const styles = theme => ({
  card: {
    width: '100%',
    maxWidth: 350
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  income: {
    background: '#8dff8e'
  },
  expense: {
    background: '#dd9a9b'
  }
})

interface ElementProps extends BudgetElement {
  classes?: any
}

const Element = (props: ElementProps) => (
  <Card
    className={classNames(props.classes.card, {
      [props.classes.income]: props.type === 'income',
      [props.classes.expense]: props.type === 'expense'
    })}
  >
    <CardContent>
      <Typography className={props.classes.title} color='textSecondary' gutterBottom>
        {props.type.toUpperCase()}
      </Typography>
      <Typography variant='h5' component='h2'>
        + {props.money.amount} {props.money.currency}
      </Typography>
      <Typography className={props.classes.pos} color='textSecondary'>
        {props.tags.map((tag, index) => tag + (index + 1 < props.tags.length ? ', ' : ''))}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small' variant='contained'>
        Edit
      </Button>
      <Button size='small' variant='contained' color='secondary'>
        Remove
        <DeleteIcon />
      </Button>
    </CardActions>
  </Card>
)

export default withStyles(styles)(Element)
