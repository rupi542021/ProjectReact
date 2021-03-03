import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import '../style.css';

class CCLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
    }


  }
  handluserEmail = (e) => {
    this.setState({ email: e.target.value.toLowerCase() })
  }
  handluserPassword = (e) => {
    this.setState({ password: e.target.value })
  }


  btnLogin = () => {
    if (this.state.email != "" && this.state.password != "") {
      this.apiUrl = 'https://localhost:44325/API/students/' + this.state.email + '/' + this.state.password;
      console.log('GETstart');
      fetch(this.apiUrl,
        {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
          })
        })
        .then((res) => {
          console.log('res.ok', res.ok);
          return res.json();
        })
        .then(
          (result) => {
            console.log("fetch btnFetchGetStudents= ", result);
            console.log(result.Mail)
            if (result.Mail !== null && result.Password !== null) {

              switch (result.StudyingYear) {
                case 1:
                  result.StudyingYear = "א"
                  break;
                case 2:
                  result.StudyingYear = "ב"
                  break;
                case 3:
                  result.StudyingYear = "ג"
                  break;
                case 4:
                  result.StudyingYear = "ד"
                  break;

                default:
                  break;
              }

              localStorage.setItem('student', JSON.stringify(result));
              Swal.fire({
                title: 'היי ' + result.Fname,
                text: 'ההתחברות בוצעה בהצלחה',
                icon: 'success',
                iconHtml: '',
                confirmButtonText: 'המשך',
                showCloseButton: true
              }).then(() => {

                this.props.history.push("/userProfile");

              });
            }
            else if (result.Mail !== null) {
              Swal.fire({
                title: 'היי ' + result.Fname,
                text: 'הסיסמא לא נכונה',
                icon: 'error',
                iconHtml: '',
                confirmButtonText: 'סגור',
                showCloseButton: true,             
              })
            }
            else {
              Swal.fire({
                title: 'המייל לא נמצא במערכת',
                text: 'אנא הכנס מייל מחדש',
                icon: 'error',
                iconHtml: '',
                confirmButtonText: 'סגור',
                showCloseButton: true
              })
            }

          },
          (error) => {
            console.log("err post=", error);
          });
      console.log('end');
    }


  }



  render() {
    return (
      <div>
        <div style={{ width: '100%', height: 50, backgroundColor: "#FAE8BE" }}>
          <h2>Better Together</h2>
        </div>
        <h3 style={{ marginTop: 100 }}> ! ברוכים הבאים </h3>

        <TextField
          id="outlined-basic"
          label="Email" variant="outlined"
          onChange={this.handluserEmail}
          style={{ margin: 10 }} />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={this.handluserPassword}
          style={{ margin: 10 }}
        /><br />
        <Button variant="contained"
          style={{ marginTop: 20, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI", width: '60%' }}
          onClick={this.btnLogin}
        //disabled={this.state.password=""?false:true} 
        >כניסה</Button><br />
        <div style={{ marginTop: 20 }}>
          {/* <Button variant="contained" color="default" style={{ margin: 10 }} ><Link to="/signin"
        >להירשם</Link></Button> */}
          <span> ? אין לך עדיין חשבון אצלנו </span>
          <span onClick={() => { this.props.history.push("/signin") }}> :) הרשמה  </span>
        </div>
      </div>
    )
  }
}
export default withRouter(CCLogin)