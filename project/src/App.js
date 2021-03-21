import './App.css';
import CCSignin1 from './ClassComponents/CCSignin1';
import background from "./img/background.jpg";
import { Switch, Route, withRouter } from 'react-router-dom';
import CCLogin from './ClassComponents/CCLogin';
import CCSignin2 from './ClassComponents/CCSignin2';
import CCUserProfile from './ClassComponents/CCUserProfile';
import Form from './ClassComponents/Form';
import CCHangout from './ClassComponents/CCHangout';
import CCHobbies from './ClassComponents/CCHobbies';
import CCSignin3 from './ClassComponents/CCSignin3';
import CCSignin2test from './ClassComponents/CCSignin2test';
import CCShowUsers from './ClassComponents/CCShowUsers';
//import CCEditProfile from './ClassComponents/CCEditProfile';
import CCeditp from './ClassComponents/CCeditp';
import CCEditHobbies from './ClassComponents/CCEditHobbies';
import CCEditHangouts from './ClassComponents/CCEditHangouts';
import CCUserProfile2 from './ClassComponents/CCUserProfile2';
import CCRecommendUsers from './ClassComponents/CCRecommendUsers';

const names = ["avi", "ben", "char"];

function App() {

  let namelist = names.map((name, index) =>
  (<a href="#" className="list-group-item list-group-item-action"
    key={index}>{index}.{name}</a>));


  function getDateFromChild(data) {
    console.log('in parent from data=', data)
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
        <Route path="/RecommendUsers" >
          <CCRecommendUsers />
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

        <Route path="/CCSignin2test" >
          <CCSignin2test />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
