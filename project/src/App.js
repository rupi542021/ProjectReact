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
function App() {
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
        //console.log("Latitude is :", position.coords.latitude);
        //console.log("Longitude is :", position.coords.longitude);
      },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        });
    } else {
      console.log("Not Available");
    }

  return (
    <div className="App">
      
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

export default withRouter(App);
