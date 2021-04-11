import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import '../style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


class CCLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errors: {},
      isChecked: false
    }


  }


  componentDidMount() {
    console.log(localStorage.checkbox, localStorage.student);
    let studOBJ = JSON.parse(localStorage.getItem('student'));
    console.log("studOBJ:", studOBJ)
    if (localStorage.checkbox && localStorage.student !== "") {
      console.log("condition is true");
      this.setState({
        isChecked: true,
        email: studOBJ.Mail,
        password: studOBJ.Password
      }, () => { console.log("this.state.email, pass ", this.state.email, this.state.password) })
    }
  }


  handluserEmail = (e) => {
    this.state.errors["email"] = "";
    this.setState({ errors: this.state.errors, email: e.target.value.toLowerCase() })
  }
  handluserPassword = (e) => {
    this.state.errors["pass"] = "";
    this.setState({ errors: this.state.errors, password: e.target.value })
  }

  onChangeCheckbox = (e) => {
    console.log("remember checbox: ", e.target.checked)
    this.setState({
      isChecked: e.target.checked
    })
  }

  btnLogin = () => {
    if (this.state.email !== "" && this.state.password !== "") {
      if (this.handleEmailValidation() === true) {
        this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + this.state.email + '/' + this.state.password;
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
            if (!res.ok) {
              switch (res.status) {
                case 404:
                  throw Error('כתובת המייל אינה נמצאת במערכת');
                case 400:
                  throw Error('הסיסמה שהזנת שגויה. אנא נסה שנית');
                default:
                  throw Error('אופס! משהו לא עבד. אנא נסה שנית');

              }
            }
            return res.json();
          })
          .then(
            (result) => {
              console.log("fetch btnFetchGetStudents= ", result);
              console.log(result.Mail)
              // if (result.Mail !== null && result.Password !== null) {

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
                text: ' :) ברוכים השבים',
                icon: 'success',
                iconHtml: '',
                confirmButtonText: 'המשך',
                showCloseButton: true,

              }).then(() => {
                if (this.state.isChecked)
                  localStorage.setItem('checkbox', this.state.isChecked);
                else localStorage.removeItem('checkbox');
                this.props.history.push("/userProfile");

              });
            })
          .catch((error) => {
            console.log("err get=", error);
            Swal.fire({
              text: error.message === 'Failed to fetch' ? 'אופס! משהו לא עבד. אנא נסה שנית' : error.message,
              icon: 'error',
              iconHtml: '',
              confirmButtonText: 'סגור',
              showCloseButton: true
            })
          });
      }
    }
    else {
      if (this.state.email === "") {
        this.state.errors["email"] = "שדה זה הינו חובה";
      }

      if (this.state.password === "") {
        this.state.errors["pass"] = "שדה זה הינו חובה"
      }

      this.setState({ errors: this.state.errors })


    }

  }

  handleEmailValidation = () => {
    let email = this.state.email;
    let emailIsValid = true;
    let lastAtPos = email.lastIndexOf('@');
    let lastDotPos = email.lastIndexOf('.');
    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
      emailIsValid = false;
      this.state.errors["email"] = "הכתובת שהזנת לא תקינה";
    }

    this.setState({ errors: this.state.errors });
    return emailIsValid;
  }



  render() {
    return (
      <div>
        <div className='rowC' style={{ width: '100%', height: 60, backgroundColor: "#FAE8BE" ,position:'fixed',top:0}}>
          <img src="icons/high-five.png" alt="" style={{ width: 30, height: 30, marginBottom: 15, marginRight: 10 }}></img>
          <h4 style={{ color: "#3D3D3D" }}>Better Together</h4>
        </div>
        <h3 style={{ marginTop: 100 }}> ! ברוכים הבאים </h3>
        <div style={{textAlign:'end',width: '50vw', margin: '0px auto',marginBottom: 40}}>
        <TextField
          label="Email"
          variant="outlined"
          onChange={this.handluserEmail}
          style={{ marginTop: 20 }}
          value={this.state.email}
        />
        <p style={{ color: "#de0d1b" }}>{this.state.errors.email}</p>
        <TextField
          label="Password"
          type="password"
         // autoComplete="current-password"
          variant="outlined"
          value = {this.state.password}
          onChange={this.handluserPassword}
        />
        <p style={{ color: "#de0d1b" }}>{this.state.errors.pass}</p>
        <div>
        <span className='labelsSmall' style={{paddingRight:'2vw', fontSize:'2vh'}}>זכור אותי</span>
        <input type='checkbox' checked={this.state.isChecked} onChange={this.onChangeCheckbox} />
        </div>
        </div>
        <Button variant="contained"
          style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI", width: '60%' }}
          onClick={this.btnLogin}
        //disabled={this.state.password=""?false:true} 
        >כניסה</Button><br />
        <div style={{ marginTop: 20, direction: 'rtl' }}>
          {/* <Button variant="contained" color="default" style={{ margin: 10 }} ><Link to="/signin"
        >להירשם</Link></Button> */}
          <span> עדיין אין לך חשבון אצלנו ? </span>
          <span className="pressSignUp" onClick={() => { this.props.history.push("/signin") }}> להרשמה :) </span>
        </div>
      </div>
    )
  }
}
export default withRouter(CCLogin)