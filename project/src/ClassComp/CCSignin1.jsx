import React, { Component } from 'react';
import PropTypes from 'prop-types';


class CCSignin1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step:1
    };
  }

  handluserEmail = (e) => {
    this.setState({ userEmail: e.target.value });
  }


  logIn = () => {
    if (this.state.userEmail == "avi@gmail.com") {
      this.setState({ message: "אימות המייל בוצע בהצלחה!" });
    }
    else {
      this.setState({ message: "המייל לא נמצא במערכת" });
    }
  }
  renderSignin=()=> {
    if (this.state.step==1) {
      return <h3>כתובת מייל</h3>
        <input type="text" onChange={handluserEmail}></input><br />
        <button onClick={logIn}>אימות</button> 
}
    
  } 

  render() {
    return (
      <div style={{ margin: '50px' }}>
        {renderSignin()}

      </div>
    )
  }
}

export default CCSignin1;