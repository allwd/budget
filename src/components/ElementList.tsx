import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { BudgetElement } from '../Context/App'
import { Chip, ListItem } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { PositionProperty } from 'csstype'
import Balance from './Balance'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Collapse from '@material-ui/core/Collapse'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const inherittedMargin = 24 + 8

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative' as PositionProperty
  },
  details: {
    position: 'absolute' as PositionProperty,
    right: 0
  },
  headline: {
    verticalAlign: 'middle',
    marginTop: '-5px',
    lineHeight: '30px'
  },
  chip: {
    position: 'absolute' as PositionProperty,
    right: 0
  },
  icon: {
    color: theme.palette.grey['700']
  },
  element: {
    // @TODO rm inherittedMargin and change it to absolute with static height element and left: 0 and width: 100% for mobile
    textDecoration: 'none',
    outline: 'none'
  },
  elementButton: {
    width: `calc(100% + ${inherittedMargin * 2}px)`,
    borderRadius: 0,
    margin: `0 -${inherittedMargin}px`,
    padding: `0 ${inherittedMargin}px`
  },
  elementItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  elementDate: {
    fontSize: 18
  }
})

export interface ElementListProps {
  data?: BudgetElement[]
  classes?: any
}

export interface ElementListState {
  expanded?: boolean
}

class ElementList extends React.Component<ElementListProps> {
  state: ElementListState = {
    expanded: true
  }

  handleExpandToggle = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  convertHistoryToDatedObjectCollection = () => {
    const datedHistory: {
      [key: string]: BudgetElement[]
    } = {}

    this.props.data.forEach(
      value => (datedHistory[value.createdDate] = [value, ...datedHistory[value.createdDate]])
    )

    return datedHistory
  }

  convertHistoryToDatedMap = () => {
    // @TODO get this map to state overall and calculate other values along the way - like last month's bilance and so on
    const datedHistory: Map<string, BudgetElement[]> = new Map()

    this.props.data.forEach(value => {
      const date = new Date(Number(value.createdDate))
      const key = String(date.getFullYear() + date.getMonth() + date.getDay())

      datedHistory.set(key, [value, ...(datedHistory.get(key) || [])])
    })

    return datedHistory
  }

  render() {
    const amount = this.props.data.length
      ? this.props.data.reduce(
          (a: number, b) =>
            b.money.amount !== null && ['income', 'expense'].includes(b.type)
              ? a + b.money.amount
              : a,
          0
        )
      : 0
    const map = this.convertHistoryToDatedMap()

    return (
      <List className={this.props.classes.root}>
        {Array.from(map).map(([key, value]) => (
          <div key={key}>
            <div className={this.props.classes.headline}>
              <Chip
                label={
                  <Balance
                    money={{
                      amount: value.reduce(
                        (previousValue, currentValue) =>
                          previousValue +
                          (currentValue.type === 'income' ? 1 : -1) * currentValue.money.amount,
                        0
                      ),
                      currency: 'EUR'
                    }}
                    auto
                  />
                }
                className={this.props.classes.chip}
                onDelete={this.handleExpandToggle}
                deleteIcon={
                  this.state.expanded ? (
                    <KeyboardArrowDownIcon className={this.props.classes.icon} />
                  ) : (
                    <KeyboardArrowRightIcon className={this.props.classes.icon} />
                  )
                }
              />
              <span className={this.props.classes.elementDate}>{new Date(key).toDateString()}</span>
            </div>
            <Collapse in={this.state.expanded} unmountOnExit>
              {value.map((Element, index) => (
                <Link
                  key={index}
                  to={`/index/view/${Element._id}`}
                  className={this.props.classes.element}
                >
                  <Button className={this.props.classes.elementButton}>
                    <ListItem className={this.props.classes.elementItem}>
                      <Avatar />
                      <div className={this.props.classes.details}>
                        <Balance money={Element.money} type={Element.type} />
                      </div>
                      <ListItemText
                        primary={Element.category}
                        secondary={Element.tags.join(', ')}
                      />
                    </ListItem>
                  </Button>
                </Link>
              ))}
            </Collapse>
          </div>
        ))}
      </List>
    )
  }
}

export default withStyles(styles)(ElementList)
