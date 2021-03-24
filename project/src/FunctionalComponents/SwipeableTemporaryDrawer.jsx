import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../style.css';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{ direction: 'rtl' ,fontFamily: "Segoe UI" }}  
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <div className='rowC' style={{ width: '100%', height: 50, backgroundColor: "#FAE8BE" }}>
        <h4 style={{color:"#3D3D3D"}}>Better Together</h4>
          <img src="icons/high-five.png" style={{width:25,height:25,marginBottom:15,marginRight:10}}></img>
        </div>
      <List>
        {['ראשי', 'כל המשתמשים', 'המועדפים שלי', 'היחידה ליזמות'].map((text, index) => (
          <ListItem button key={text} >
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text}  />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['הפרופיל שלי', 'עריכת פרופיל', 'הודעות'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div  >
      {
        <React.Fragment>
          <Button onClick={toggleDrawer('right', true)}>{          
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{marginRight:0,paddingRight:0}}
            // color="#3D3D3D"
            aria-label="open drawer"
            //onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>}</Button>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}