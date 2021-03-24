import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import '../style.css';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { withRouter } from 'react-router-dom';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(7),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function FCTabNavigator() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const history = useHistory();

  const toProflie = () =>{ 
    let path = `userProfile`; 
    history.push(path);
  }
  const toUsers = () =>{ 
    let path = `showUsers`; 
    history.push(path);
  }
 
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor:"#FAE8BE"}}>
        
        <Toolbar>
        <IconButton
            edge="start"
            className={classes.menuButton}
            style={{marginLeft:10}}
            // color="#3D3D3D"
            aria-label="open drawer"
          >
            <ThumbUpIcon fontSize="small"/>
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}

            // color="#3D3D3D"
            aria-label="open drawer"
          >
            <StarRoundedIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{}}
            size="28px"
            onClick={toUsers}
            aria-label="open drawer"
          >
            <GroupIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{}}
            onClick={toProflie}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

    </div>
  );
}
export default withRouter(FCTabNavigator)
