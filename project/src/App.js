

import LogIn from './ClassComp/Login';
import CCSignin1 from './ClassComp/CCSignin1';
import './App.css';



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
      <header className="App-header">
        <CCSignin1/>
      </header>
    </div>
  );
}

export default App;
