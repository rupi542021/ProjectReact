import './App.css';
import CCYuvalSignin1 from './ClassComponents/CCYuvalSignin1';



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
      <CCYuvalSignin1/>
    </div>
  );
}

export default App;
