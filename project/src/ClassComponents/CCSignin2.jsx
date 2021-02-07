import React, { Component } from 'react'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { withRouter } from 'react-router-dom';

class CCSignin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
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
    //var pass = e.target.value;
    const reg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    //var test = reg.test(pass);
    if (reg.test(e.target.value)) {
      //alert('pass');
      this.setState({ password: e.target.value, err: "" });
    } else {
      this.setState({ err: "enter a valid password!" })
    }
  }

  handluserConfirmPassword = (e) => {
    if (e.target.value === this.state.password)
      this.setState({ password2Confirm: e.target.value, errConfirm: "" });
    else this.setState({ errConfirm: "אנא הכנס סיסמת אימות זהה" })
  }

  btnNext2Confirm = () => {
    if (this.state.err === "" && this.state.errConfirm === "") {
      this.props.history.push({
        pathname: '/signin3',
      });

    }
    else this.setState({ message: "אימות הסיסמה נכשל!" });
  }
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <h4 style={{ marginTop: 80 }}>סיסמה</h4>

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          helperText={this.state.err}
          onBlur={this.handluserPassword}
          onChange={this.chgPassword}
        />
        <br />

        <h4 style={{ marginTop: 20 }}>אימות סיסמה</h4>

        <TextField

          id="outlined-password-input"
          label="Password Confirm"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          helperText={this.state.errConfirm}
          onChange={this.handluserConfirmPassword}
        /><br />
        <p onClick={this.showUsingTerms} style={{ marginTop: 30, color: "blue" }}>תנאי שימוש</p>
        <Button variant="contained" style={{ backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }} onClick={this.btnNext2Confirm}>הבא</Button>
        <br />
        {this.state.password}
      </div>
    )
  }
}

export default withRouter(CCSignin2);
