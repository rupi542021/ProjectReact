import React, { Component } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Dimensions from 'react-dimensions'
import background from "../img/background.jpg";

class CCSignin1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      userEmail:""
    }
    
  }
  


  handluserEmail = (e) => {
    let input = {};
    input["email"] = e.target.value;
    this.setState({ input:input});
    console.log(this.state);
    if (this.validate()) {
      let input = {};
      input["email"] = "";
      this.setState({input:input});
      this.setState({ userEmail: e.target.value });
      console.log(this.state);
    }
  }
  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    // if (input["email"]=="") {
    //   isValid = false;
    //   errors["email"] = "Please enter your email Address.";
    // }

    if (typeof input["email"] !== "undefined") {
        
      var pattern = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }
    this.setState({
      errors: errors
    });

    return isValid;
  }

  logIn = () => {
    console.log(this.state.userEmail);
    this.apiUrl='https://localhost:44325/API/students?email='+this.state.userEmail;
    console.log('GETstart');
    fetch(this.apiUrl,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then((res)=>{
         console.log('res=', res);
         //console.log('res.status', res.status);
         console.log('res.ok', res.ok);
        return res.json();
      })
      .then(
        (result) => {
            console.log("fetch btnFetchGetStudents= ", result);
            if(result.Mail!==null)
            {
              localStorage.setItem('student', JSON.stringify(result));
              Swal.fire({
                    title: 'אימות המייל בוצע בהצלחה!',
                    icon: 'success',
                    iconHtml: '',
                    confirmButtonText: 'המשך',
                    showCloseButton: true
                  }).then(() => {
            
                    this.props.history.push("/signin2");
            
                  });
            }
            else {
                Swal.fire({
                  title: 'כתובת המייל אינה נמצאת במערכת',
                  icon: 'error',
                  iconHtml: '',
                  confirmButtonText: 'סגור',
                  showCloseButton: true
                })
              }
            // result.map(stud => console.log(stud.Mail));
            // console.log('result[0].FullName=', result[0].Name);
            // this.setState({allIng:result});
          },
        (error) => {
          console.log("err post=", error);
        });
    console.log('end');


    // if (this.state.userEmail === "avi@gmail.com") {
    //   this.setState({ message: "אימות המייל בוצע בהצלחה!" });
    //   Swal.fire({
    //     title: 'אימות המייל בוצע בהצלחה!',
    //     icon: 'success',
    //     iconHtml: '',
    //     confirmButtonText: 'המשך',
    //     showCloseButton: true
    //   }).then(() => {

    //     this.props.history.push("/signin2");

    //   });
    // }
    // else {
    //   this.setState({ message: "המייל לא נמצא במערכת" });
    //   Swal.fire({
    //     title: 'כתובת המייל אינה נמצאת במערכת',
    //     icon: 'error',
    //     iconHtml: '',
    //     confirmButtonText: 'סגור',
    //     showCloseButton: true
    //   })
    // }
  }


  render() {
    return (
      <div>
        <PrimarySearchAppBar/>

        <h4 style={{ margin: 20,marginTop:100 }}>כתובת מייל</h4>
        <TextField id="outlined-basic" label="Email" variant="outlined" onBlur={this.handluserEmail}
        onFocus={()=>{this.setState({errors:""})}} /><br />
        <div className="text-danger">{this.state.errors.email}</div>
        <Button variant="contained" onClick={this.logIn}  style={{backgroundColor:"#FAE8BE", fontSize:20,borderRadius:20,fontFamily:"Segoe UI",marginTop:20}}>אימות</Button>
      </div>
    )
  }
}

export default withRouter(CCSignin1)


