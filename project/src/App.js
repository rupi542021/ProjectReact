import './App.css';
import CCSignin1 from './ClassComponents/CCSignin1';
import background from "./img/background.jpg";
import { Switch, Route ,withRouter } from 'react-router-dom';
import CCLogin from './ClassComponents/CCLogin';
import CCSignin2 from './ClassComponents/CCSignin2';

import Form from './ClassComponents/Form';
const names=["avi","ben","char"];

function App() {

  let namelist=names.map((name, index)=>
    (<a href="#" className="list-group-item list-group-item-action"
    key={index}>{index}.{name}</a>));


  function getDateFromChild(data){
    console.log('in parent from data=',data)
  }

  return (
    <div className="App">
      <Switch>
          <Route  exact path="/" >
            <CCLogin />
          </Route>
          <Route path="/signin">
            <CCSignin1 />
          </Route>
          <Route path="/signin2" >
            <CCSignin2 />
          </Route>
          <Route path="/form" >
            <Form />
          </Route>
        </Switch>
    </div>
  );
}

export default withRouter(App);
