import classNames from 'classnames'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { OverflowXProperty, PositionProperty, WhiteSpaceProperty } from 'csstype'
import { DRAWER_WIDTH } from '../containers/Index'
import { mainListItems, secondaryListItems } from './mockup/items'

const styles = theme => ({
  drawerPaper: {
    position: 'relative' as PositionProperty,
    whiteSpace: 'nowrap' as WhiteSpaceProperty,
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden' as OverflowXProperty,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
})

interface SideMenu {
  classes?: any
  open?: boolean
  onChevronLeftIconClick?: (event: any) => void
}

const SideMenu = (props: SideMenu) => (
  <Drawer
    variant='permanent'
    classes={{
      paper: classNames(props.classes.drawerPaper, !props.open && props.classes.drawerPaperClose)
    }}
    open={props.open}
  >
    <div className={props.classes.toolbarIcon}>
      <IconButton onClick={props.onChevronLeftIconClick}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>{mainListItems}</List>
    <Divider />
    <List>{secondaryListItems}</List>
  </Drawer>
)

export default withStyles(styles)(SideMenu)
