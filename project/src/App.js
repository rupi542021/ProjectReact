import './App.css';
import CCSignin1 from './ClassComponents/CCSignin1';
import { Switch, Route, withRouter } from 'react-router-dom';
import CCLogin from './ClassComponents/CCLogin';
import CCSignin2 from './ClassComponents/CCSignin2';
import CCUserProfile from './ClassComponents/CCUserProfile';
import Form from './ClassComponents/Form';
import CCHangout from './ClassComponents/CCHangout';
import CCHobbies from './ClassComponents/CCHobbies';
import CCSignin3 from './ClassComponents/CCSignin3';
import CCShowUsers from './ClassComponents/CCShowUsers';
//import CCEditProfile from './ClassComponents/CCEditProfile';
import CCeditp from './ClassComponents/CCeditp';
import CCEditHobbies from './ClassComponents/CCEditHobbies';
import CCEditHangouts from './ClassComponents/CCEditHangouts';
import CCUserProfile2 from './ClassComponents/CCUserProfile2';
import CCFavorites from './ClassComponents/CCFavorites';
import FCChat from './FunctionalComponents/FCChat';
import CCAllChats from './ClassComponents/CCAllChats';
import CCTheUnit from './ClassComponents/CCTheUnit';
import CCPreferncesRanges from './ClassComponents/CCPreferncesRanges';
import CCUserPrefernces from './ClassComponents/CCUserPrefernces';
import CCQuestionnaire from './ClassComponents/CCQuestionnaire';
import CCSettings from './ClassComponents/CCSettings';
import CCChangePassword from './ClassComponents/CCChangePassword';
import {onMessageListener } from './FunctionalComponents/push-notification';
import React, { useEffect,useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { store } from 'react-notifications-component';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { blueGrey } from '@material-ui/core/colors';
function App() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [payloadTitle, setPayloadTitle] =useState('mgs');
  console.log("start");

  onMessageListener().then(payload => {

    setOpen(true);
   
    setPayloadTitle(payload.notification.title)
    console.log(payload.notification.title);
  }).catch(err => console.log('failed: ', err));
  
  useEffect(()=>{

    console.log("in use effect");

  })

  let studOBJ = localStorage.getItem('student');
  studOBJ = JSON.parse(studOBJ);
  console.log("studOBJ",studOBJ)
if(studOBJ!==null){
    getLocation(studOBJ.Mail)
    console.log("in get location",studOBJ.Mail)
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const go2Chats = () =>{ 
   
    history.push(`AllChats2`);
  }
  const { vertical, horizontal } = state;
  return (
    <div className="App">
      {/* <ReactNotification /> */}
              {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="info" >
       {payloadTitle}
        </Alert>
        </Snackbar>
         */}



        <Snackbar
        action={
          <React.Fragment>
                        <IconButton
              aria-label="close"
              color="inherit"
              //className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Button color="secondary" size="small" onClick={go2Chats}>
              להודעות
            </Button>

          </React.Fragment>
        }
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        
        message={payloadTitle}
        key={vertical + horizontal}
        style={{marginTop:60,backgroundColor:"#FAE8BE",color:"#FAE8BE"}}
      />
      

      <Switch>
        <Route exact path="/" >
          <CCLogin />
        </Route>
        <Route path="/signin">
          <CCSignin1 />
        </Route>
        <Route path="/signin2" >
          <CCSignin2 />
        </Route>
        <Route path="/signin3" >
          <CCSignin3 />
        </Route>
        <Route path="/hangout" >
          <CCHangout />
        </Route>
        <Route path="/hobbies" >
          <CCHobbies />
        </Route>
        <Route path="/userProfile" >
          <CCUserProfile />
        </Route>
        <Route path="/showUsers" >
          <CCShowUsers />
        </Route>

        <Route path="/userProfile2" >
          <CCUserProfile2 />
        </Route>
        {/* <Route path="/editProfile" >
            <CCEditProfile/>
          </Route> */}
        <Route path="/editP" >
          <CCeditp />
        </Route>
        <Route path="/editHobbies" >
          <CCEditHobbies />
        </Route>
        <Route path="/editHangouts" >
          <CCEditHangouts />
        </Route>
        <Route path="/form" >
          <Form />
        </Route>
        <Route path="/Favorites" >
          <CCFavorites/>
        </Route>
        <Route path="/chat" >
          <FCChat/>
        </Route>
        <Route path="/AllChats2" >
          <CCAllChats/>
        </Route>

        <Route path="/TheUnit" >
          <CCTheUnit/>
        </Route>
        <Route path="/Settings" >
          <CCSettings/>
        </Route>
        <Route path="/userPrefernces" >
          <CCUserPrefernces/>
        </Route>
        <Route path="/ChangePassword" >
          <CCChangePassword/>
        </Route>
        <Route path="/PreferncesRanges" >
          <CCPreferncesRanges/>
        </Route>
        <Route path="/ranges" >
          <CCPreferncesRanges/>
        </Route>
        <Route path="/Questionnaire" >
          <CCQuestionnaire/>
        </Route>
      </Switch>
     

    </div>
  );
}


export const getLocation= (studMail) =>{
  console.log("in get location222",studMail)
  if ("geolocation" in navigator) {
    console.log("Available");
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log(position)
  //   },
  //   function(error) {
  //     console.error("Error Code = " + error.code + " - " + error.message);
  //   });
    navigator.geolocation.watchPosition(function(position) {
      console.log("Latitude X is :", position.coords.latitude);
      console.log("Longitude Y is :", position.coords.longitude);

      console.log("in post locations function");
      let location = {
        Mail:studMail,
        X: position.coords.latitude,
        Y: position.coords.longitude
      }
      console.log("location",location)
      
      let apiUrl = 'https://localhost:44325/API/students/PostLocation';
      fetch(apiUrl,
        {
          method: 'POST',
          body: JSON.stringify(location),
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
          })
        })
        .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          console.log('end post locations function')
      
        },
          (error) => {
            console.log("err post=", error);
          });
  
    

    },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
  } else {
    console.log("Not Available");
  }
}
export default withRouter(App);
