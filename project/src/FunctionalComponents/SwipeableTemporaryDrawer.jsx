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
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../style.css';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
const ListIcons = [<HomeIcon />, <GroupIcon />, <StarRoundedIcon />, <ThumbUpIcon fontSize="small"/>]
const ListIcons2 = [<AccountCircleIcon />, <EditIcon />, <MailIcon />]
const ListIcons3 = [ <SettingsIcon />, <MeetingRoomIcon />]
export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({

        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const history = useHistory();

    const handleClick = (index) => (event) => {
        let path = '';
        switch (index) {
            case 0:
                break;
            case 1:
                path = `showUsers`;
                history.push(path);
                break;
            case 2:
                path = `Favorites`;
                history.push(path);
                break;
            case 3:
                path = `TheUnit`;
                history.push(path);
                break;
            default:
                break;
        }
    }
    const handleClick2 = (index) => (event) => {
        let path = '';
        switch (index) {
            case 0:
                path = `userProfile`;
                history.push(path);
                break;
            case 1:
                // path = `editP`;
                // history.push(path);
                history.push({
                    pathname: '/editP',
                    state: { PageBack: '/userProfile' }
                  });
                break;
            case 2:
                path = `AllChats2`;
                history.push(path);
                break;
            default:
                break;
        }
    }
    const handleClick3 = (index) => (event) => {
        let path = '';
        switch (index) {

            case 0:
                path = `Settings`;
                history.push(path);
                break;
            case 1:
                path = ``;
                let Ltoken=localStorage.getItem('MyToken');
                localStorage.clear();
                localStorage.setItem('MyToken',Ltoken)
                history.push(path);
                break;
            default:
                break;
        }
    }
    const list = (anchor) => (
        <div style={{ direction: 'rtl', fontFamily: "Segoe UI" }}
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className='rowC' style={{ width: '100%', height: 50, backgroundColor: "#FAE8BE" }}>
                <h4 style={{ color: "#3D3D3D" }}>Better Together</h4>
                <img src="icons/high-five.png" alt="" style={{ width: 25, height: 25, marginBottom: 15, marginRight: 10 }}></img>
            </div>
            <List>
                {['ראשי', 'כל המשתמשים', 'המועדפים שלי', 'היחידה ליזמות'].map((text, index) => (
                    <ListItem button key={text} onClick={handleClick(index)}>
                        <ListItemIcon>{ListIcons[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['הפרופיל שלי', 'עריכת פרופיל', 'הודעות'].map((text, index) => (
                    <ListItem button key={text} onClick={handleClick2(index)}>
                        <ListItemIcon>{ListIcons2[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[ 'הגדרות','התנתק'].map((text, index) => (
                    <ListItem button key={text} onClick={handleClick3(index)}>
                        <ListItemIcon>{ListIcons3[index]}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div style={{ direction: 'rtl', fontFamily: "Segoe UI" }}>
            {
                <React.Fragment>
                    <Button onClick={toggleDrawer('right', true)}>{
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            style={{ marginRight: 0, paddingRight: 0 }}
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