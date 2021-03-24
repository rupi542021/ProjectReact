import React, { Component } from 'react'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';


class CCSignin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passConfirmed: false,
      err: "",
      errConfirm: ""
    }
  }
  showUsingTerms = () => {
    Swal.fire({
      text: "תלחץ על מסכים נו",
      height: 1000,
      confirmButtonText: 'מסכים',
    })
  }

  handluserPassword = (e) => {
    if (this.validatePass(e.target.value) === true) {
      this.setState({ password: e.target.value, err: "" });
    }
    else {
      this.setState({ err: "הכתובת שהכנסת אינה תקינה" })
    }
  }

  validatePass = (pass) => {
    console.log("password for validation:", pass)
    // const reg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const reg = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
    if (pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {

      //  if (reg.test(pass)) {
      return true;
    }
    else return false;
  }


  handluserConfirmPassword = (e) => {
    if (e.target.value === this.state.password && this.state.password !== "")
      this.setState({ password2Confirm: e.target.value, errConfirm: "", passConfirmed: true });
    else this.setState({ errConfirm: "אנא הכנס סיסמת אימות זהה", passConfirmed: false })
  }

  btnNext2Confirm = () => {
    //להוסיף תנאי שהמשתמש אישר את תנאי השימוש
    if (this.state.passConfirmed === true) {
      let stud = localStorage.getItem('student');
      stud = JSON.parse(stud);
      stud.Password = this.state.password;
      localStorage.setItem('student', JSON.stringify(stud));
      console.log(stud);
      this.props.history.push("/signin3");
    }
    else this.setState({ message: "אימות הסיסמה נכשל!" });
  }
  render() {
    return (
      <div>
        <div className='rowC' style={{ width: '100%', height: 60, backgroundColor: "#FAE8BE" }}>
          <img src="icons/high-five.png" style={{ width: 30, height: 30, marginBottom: 15, marginRight: 10 }}></img>
          <h4 style={{ color: "#3D3D3D" }}>Better Together</h4>
        </div>

        <h4 style={{ marginTop: 80 }}>סיסמה</h4>

        <TextField
          id="outlined-password-input"
          label="סיסמה"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          // helperText={this.state.err}
          onChange={this.handluserPassword}
        />
        <br />
        <div style={{ color: "#de0d1b" }}>{this.state.err}</div>
        <h4 style={{ marginTop: 20 }}>אימות סיסמה</h4>

        <TextField

          id="outlined-password-input"
          label="אימות סיסמה"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          // helperText={this.state.errConfirm}
          onChange={this.handluserConfirmPassword}
        />
        <div style={{ color: "#de0d1b" }}>{this.state.errConfirm}</div>
        <br />
        <p onClick={this.showUsingTerms} style={{ marginTop: 30, color: "blue" }}>תנאי שימוש</p>

        <Button variant="contained"
          style={{
            paddingTop: 0, marginRight: 10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
            fontFamily: "Segoe UI", height: 35
          }}
          onClick={this.btnNext2Confirm}>
          <i class="bi bi-arrow-left-short"
            style={{ color: '#3D3D3D', fontSize: 32 }}></i>
        </Button>
        <br />

      </div>
    )
  }
}

export default withRouter(CCSignin2);
