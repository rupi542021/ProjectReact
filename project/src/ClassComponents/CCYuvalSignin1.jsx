import React, { Component } from 'react';
import Swal from 'sweetalert2';

export default class CCYuvalSignin1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password:"",
      str: <div><h3>כתובת מייל</h3>
        <input type="text" onChange={this.handluserEmail}></input><br />
        <button onClick={this.logIn}>אימות</button>
      </div>
    }

  }

  handluserPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  handluserConfirmPassword = (e) => {
    this.setState({ password2Confirm: e.target.value });
  }

  btnNext2Confirm = () => {
    if (this.state.password !== this.state.password2Confirm) {
      this.setState({ message: "אימות הסיסמה נכשל!" });
    }
    else {
      // this.setState({str: })
    }

  }

  handluserEmail = (e) => {
    this.setState({ userEmail: e.target.value });
  }


  logIn = () => {
    if (this.state.userEmail === "avi@gmail.com") {
      this.setState({ message: "אימות המייל בוצע בהצלחה!" });
      Swal.fire({
        title: 'אימות המייל בוצע בהצלחה!',
        icon: 'success',
        iconHtml: '',
        confirmButtonText: 'המשך',
        showCloseButton: true
      }).then (() => {
        this.setState({
          str: <div><h3>סיסמה</h3>
            <input type="text" onChange={this.handluserPassword} value={this.state.password}></input><br />
            <h3>אימות סיסמה</h3>
            <input type="text" onChange={this.handluserConfirmPassword}></input><br />
            <p onClick={this.showUsingTerms}>תנאי שימוש</p>
            <button onClick={this.btnNext2Confirm}>הבא</button><br />
            {this.state.password}
          </div>
        })
        });
    }
    else {
      this.setState({ message: "המייל לא נמצא במערכת" });
      Swal.fire({
        title: 'כתובת המייל אינה נמצאת במערכת',
        icon: 'error',
        iconHtml: '',
        confirmButtonText: 'סגור',
        showCloseButton: true
      })
    }

  }

  showUsingTerms = () => {
    Swal.fire({
      text: "תלחץ על מסכים נו",
      height: 1000,
      confirmButtonText: 'מסכים',
    })
  }



  render() {
    return (
      <div>
        {this.state.str}
      </div>
    )
  }
}


