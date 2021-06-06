import React, { Component } from 'react'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import swal from 'sweetalert';

class CCChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPassConfirmed: false,
      userPassErr: "",
      newPassErr: "",
      errConfirm: "",
      studOBJ: JSON.parse(localStorage.getItem('student'))
    }
  }

  handleuserPassword = (e) => {
    let userPass = this.state.studOBJ.Password;
    let pass = e.target.value;
    console.log("userPass:", userPass);
    console.log("pass:", pass);
    if (pass === userPass) {
      this.setState({ userPassErr: "" });
    }
    else {
      this.setState({ userPassErr: "הסיסמה שהזנת אינה תואמת" });
    }
    if (pass === "") {
      this.setState({ userPassErr: "" });
    }
  }

  handleNewPassword = (e) => {
    console.log("newPass:", e.target.value);
    if (this.validatePass(e.target.value) === true) {
      this.setState({ newPassword: e.target.value, newPassErr: "" });
    }
    else {
      this.setState({ newPassErr: "הסיסמה שהזנת אינה תקינה" });
    }
    if (e.target.value === "") {
      this.setState({ newPassErr: "" });
    }
  }

  validatePass = (pass) => {
    console.log("password for validation:", pass)
    if (pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
      return true;
    }
    else return false;
  }


  handleConfirmNewPassword = (e) => {
    if (e.target.value === this.state.newPassword && this.state.newPassword !== "")
      this.setState({ newPassConfirmed: e.target.value, errConfirm: "", passConfirmed: true });
    else this.setState({ errConfirm: "אנא הכנס סיסמת אימות זהה", passConfirmed: false });
    if (e.target.value==="") {
      this.setState({errConfirm:"",passConfirmed:false});
    }
  }

  btnNext2Confirm = () => {
    if (this.state.passConfirmed === true && this.state.newPassword !== "") {
      if (this.state.newPassConfirmed === this.state.newPassword) {
        this.handleSwal();
      }
      else{
        let msg = "הסיסמאות שהזנת אינן זהות";
        this.handleErrors(msg);
      }
    }
    else {
      let msg = "אימות הסיסמה נכשל";
      this.handleErrors(msg);
    }
  }

 handleSwal = () =>
 {
  swal({
    title: "השינויים שביצעת יישמרו",
    icon: "warning",
    buttons: true,    
  })
  .then((willSave) => {
    if (willSave) {
      this.UpdatePasswordInDB(this.state.studOBJ,this.state.newPassword);
    }
  });
 }

  handleErrors = (msg) => {
    Swal.fire({
      text: msg,
      icon: 'error',
      iconHtml: '',
      confirmButtonText: 'סגור',
      showCloseButton: true
    })
  }

  UpdatePasswordInDB = (stud,pass) => {
    console.log("in UpdatePasswordInDB ",stud, pass );
   let apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/'+ pass +'/updateUserPassword';
   //let apiUrl = 'https://localhost:44366/API/students/'+ pass +'/updateUserPassword';
    fetch(apiUrl,
      {
        method: 'Put',
        body: JSON.stringify(stud),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        if (res.ok) {
          console.log('UpdatePreferencesInDB succeeded');
          this.state.studOBJ.Password = pass;
          localStorage.setItem('student', JSON.stringify(this.state.studOBJ));
          console.log("this.state.studOBJ", this.state.studOBJ);
          swal(":) הסיסמה עודכנה בהצלחה", {
            icon: "success",
          }).then( ()=>{this.props.history.push("/Settings");}        
          );
        }
        else{
          Swal.fire({
            text: ":( אופס.. משהו השתבש",
            icon: 'error',
            iconHtml: '',
            confirmButtonText: 'סגור',
            showCloseButton: true
          })
        }
        //return res.json();
      })
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: '7vw',position:'absolute', right: '1vw' }} 
        onClick={()=>this.props.history.push('/Settings')}></i>
        <div>
          <h5 style={{ marginTop: '10vh', fontWeight: 500 }}>סיסמה נוכחית</h5>
          <TextField
            id="outlined-password-input"
            label="הכנס סיסמה"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={this.handleuserPassword}
          />
          <div style={{ color: "#de0d1b", fontSize: '2vh', fontWeight: 400 }}>{this.state.userPassErr}</div>
        </div>
        <div>
          <h5 style={{ marginTop: '5vh', fontWeight: 500 }}>סיסמה חדשה</h5>
          <TextField
            id="outlined-password-input"
            label="הכנס סיסמה"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={this.handleNewPassword}
          />
          <div style={{ color: "#de0d1b", fontSize: '2vh', fontWeight: 400 }}>{this.state.newPassErr}</div>
          <br />
        </div>
        <div>
          <h5 style={{ fontWeight: 500 }}>אימות סיסמה חדשה</h5>
          <TextField
            id="outlined-password-input"
            label="הכנס סיסמה"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={this.handleConfirmNewPassword}
          />
          <div style={{ color: "#de0d1b", fontSize: '2vh', fontWeight: 400 }}>{this.state.errConfirm}</div>
          <br />
        </div>
        <Button variant="contained"
          style={{
            paddingTop: 0, marginRight: 10, marginTop: 40, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
            fontFamily: "Segoe UI", height: 35
          }}
          onClick={this.btnNext2Confirm}>
          <i class="bi bi-check2"
            style={{ color: '#3D3D3D', fontSize: 32 }}></i>
        </Button>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCChangePassword);
