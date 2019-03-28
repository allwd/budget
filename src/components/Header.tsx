import classNames from 'classnames'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import LanguageIcon from '@material-ui/icons/Language'
import PersonIcon from '@material-ui/icons/Person'
import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { AppBar } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: 0,
    width: `calc(100% - ${0}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0
    }
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  }
})

interface HeaderProps {
  classes?: any
  open?: boolean
  onMenuIconClick?: (event: any) => void
  onUserIconClick?: (event: any) => void
  onNotificationsIconClick?: (event: any) => void
}

const Header = (props: HeaderProps) => (
  <AppBar
    position='absolute'
    className={classNames(props.classes.appBar, props.open && props.classes.appBarShift)}
  >
    <Toolbar disableGutters={!props.open} className={props.classes.toolbar}>
      <IconButton
        color='inherit'
        aria-label='Open drawer'
        onClick={props.onMenuIconClick}
        className={classNames(
          props.classes.menuButton,
          props.open && props.classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component='h1'
        variant='h6'
        color='inherit'
        noWrap
        className={props.classes.title}
      >
        Dashboard
      </Typography>
      <IconButton onClick={props.onUserIconClick} color='inherit'>
        <LanguageIcon />
      </IconButton>
      <IconButton onClick={props.onUserIconClick} color='inherit'>
        <PersonIcon />
      </IconButton>
      <IconButton onClick={props.onNotificationsIconClick} color='inherit'>
        <Badge badgeContent={4} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
