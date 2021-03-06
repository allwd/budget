import * as React from 'react'
import { BottomNavigation } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HistoryIcon from '@material-ui/icons/HistoryRounded'
import AssesmentIcon from '@material-ui/icons/AssessmentRounded'
import AddCircleIcon from '@material-ui/icons/AddCircleRounded'
import CreditCardIcon from '@material-ui/icons/CreditCardRounded'
import PeopleIcon from '@material-ui/icons/PeopleRounded'
import { PositionProperty } from 'csstype'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'

const classNames = require('classnames')

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed' as PositionProperty,
    padding: '0 10px',
    bottom: 0,
    left: 0,
    borderTop: '1px solid #bbbbbb'
  },
  bottomNavigation: {
    width: '100%'
  },
  icon: {
    fontSize: '30px'
  },
  addIcon: {
    position: 'absolute' as PositionProperty,
    fontSize: '62px',
    color: theme.palette.primary.main,
    marginTop: '-25px'
  }
})

interface FooterProps extends RouteComponentProps {
  classes?: any
  active?: string
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void
}

const MobileMenu = (props: FooterProps) => (
  <div className={props.classes.root}>
    <BottomNavigation
      value={props.active || ''}
      onChange={props.onChange}
      showLabels
      className={props.classes.bottomNavigation}
    >
      <BottomNavigationAction
        label='Dashboard'
        value={''}
        icon={<HistoryIcon className={props.classes.icon} />}
      />
      <BottomNavigationAction
        label='Statistics'
        value={'statistics'}
        icon={<AssesmentIcon className={props.classes.icon} />}
      />
      <BottomNavigationAction
        label=''
        value={'create'}
        icon={<AddCircleIcon className={classNames(props.classes.icon, props.classes.addIcon)} />}
      />
      <BottomNavigationAction
        label='Accounts'
        value={'accounts'}
        icon={<CreditCardIcon className={props.classes.icon} />}
      />
      <BottomNavigationAction
        label='Family'
        value={'family'}
        icon={<PeopleIcon className={props.classes.icon} />}
      />
    </BottomNavigation>
  </div>
)

export default withStyles(styles)(withRouter<FooterProps>(MobileMenu))
