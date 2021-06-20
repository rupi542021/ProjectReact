import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import '../style.css';
import loaderGIF from '../img/loader.gif';
import {getLocation} from '../App'

class CCLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errors: {},
      isChecked: false,
     loading:true
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
        this.setState({loading:false});
      //this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + this.state.email + '/' + this.state.password;
      this.apiUrl = 'https://localhost:44325/API/students/' + this.state.email + '/' + this.state.password;
     //לבדוק פונקצית getURL ולעשות תנאי
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

              let userToken = localStorage.getItem('MyToken');
              if(userToken!==null)
                result.Token=userToken;
              localStorage.setItem('student', JSON.stringify(result));
              let studOBJ = localStorage.getItem('student');
              studOBJ = JSON.parse(studOBJ);       
              getLocation(studOBJ.Mail)
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
                let userToken = localStorage.getItem('MyToken');
                console.log("userToken:",userToken);
                if (userToken!==null) {
                  this.updateTokenInDB(studOBJ,userToken);
              
                 
                } 
                this.props.history.push("/showUsers");

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
            }).then(()=>{
              this.setState({loading:true});}
              )
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

  updateTokenInDB = (studOBJ,token) =>{
    console.log("in postTokenInDB function");
    console.log("token:", token);
    console.log("studOBJ:", studOBJ);
    //this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/'+ studOBJ.Mail + '/updateToken';
    this.apiUrl = 'https://localhost:44325/api/students/' + studOBJ.Mail + '/updateToken';
    fetch(this.apiUrl,
      {
        method: 'PUT',
        body: JSON.stringify(token),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {

        if (res.ok) {
          console.log('post token succeeded');
          studOBJ.Token = token;                    
        }

        else if (!res.ok) {
          console.log("error in post token:" , res)
        }
      })
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
        <div className='rowC' style={{ width: '100%', height: 60, backgroundColor: "#FAE8BE" ,position:'fixed',top:0, zIndex:100}}>
          <img src="icons/high-five.png" alt="" style={{ width: 30, height: 30, marginBottom: 15, marginRight: 10 }}></img>
          <h4 style={{ color: "#3D3D3D" ,fontSize:'7vw'}}>Better Together</h4>
        </div>
        {this.state.loading===false?<img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '40vh' }} />
        :<div>
        <h2 style={{ marginTop: 100,marginBottom: 20 }}> ! ברוכים הבאים </h2>
        
        <div style={{textAlign:'end',width: '54vw', margin: '0px auto',marginBottom: 20}}>
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
        <span className='labelsSmall' style={{paddingRight:'2vw', fontSize:'2.3vh'}}>זכור אותי</span>
        <input type='checkbox' checked={this.state.isChecked} onChange={this.onChangeCheckbox} />
        </div>
        
        </div>
        <Button variant="contained"
          style={{ marginTop: 0, backgroundColor: "#FAE8BE", fontSize: 22, borderRadius: 20, fontFamily: "Segoe UI", width: '60%' }}
          onClick={this.btnLogin}
        //disabled={this.state.password=""?false:true} 
        >כניסה</Button><br />
        <div style={{marginTop:'4vh'}}>
        <span className='pressSignUp' 
        style={{fontSize:'2.3vh'}}
        onclick={{}}
        >?שכחת סיסמה</span>
        </div>
        <div style={{ marginTop: 20, direction: 'rtl' }}>
          
          {/* <Button variant="contained" color="default" style={{ margin: 10 }} ><Link to="/signin"
        >להירשם</Link></Button> */}
          <span style={{fontWeight:'bold'}}> עדיין אין לך חשבון אצלנו ? </span>
          <span className="pressSignUp" onClick={() => { this.props.history.push("/signin") }}> להרשמה :) </span>
        </div>
        </div>}
      </div>
    )
  }
}
export default withRouter(CCLogin)