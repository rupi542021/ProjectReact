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
      fields: {
        email:''
      },
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = 'הכנס כתובת דוא"ל';
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "הכתובת שהזנת לא תקינה";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      console.log(this.state.fields["email"].toLowerCase())

      this.apiUrl = 'https://localhost:44325/API/students?email=' + this.state.fields["email"].toLowerCase();
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
          console.log('res=', res);
          console.log('res.ok', res.ok);
          if (!res.ok) {
            if (res.status === 404) {
              throw Error('כתובת המייל אינה נמצאת במערכת')
            }
            if (res.status === 400) {
              throw Error('כתובת המייל כבר נמצאת במערכת')
            }

            if (res.status === 500) {
              throw Error('בעיה בהתחברות לשרת')
            }
          }
          return res.json();
        })
        .then(
          (result) => {
            console.log("fetch btnFetchGetStudents= ", result);
            //if (result.Mail !== null) {
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
          //  else {
            //   Swal.fire({
            //     title: 'כתובת המייל אינה נמצאת במערכת',
            //     icon: 'error',
            //     iconHtml: '',
            //     confirmButtonText: 'סגור',
            //     showCloseButton: true
            //   })
            // }
         // }
        )
        .catch((error) => {
          console.log("err get=", error.message);
          Swal.fire({
                title: error.message,
                icon: 'error',
                iconHtml: '',
                confirmButtonText: 'סגור',
                showCloseButton: true
              })
        })
      console.log('end');

      //alert("Form submitted");
    }
    //  else{
    //     //alert("Form has errors.")
    //  }

  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div>
          <div style={{ margin: 10, marginTop: 100 }}>
          <img src='icons/mail.png' alt='' style={{height:80, width:80}}/>
          <h4 style={{ margin: 10}}> הכנס כתובת דוא"ל </h4>
          </div>
          <form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>
            <div className="col-md-6">
              <fieldset>

                <br />
                <TextField label='דואר אלקטרוני' variant="outlined" refs="email" type="text" placeholder='כתובת דוא"ל' onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                <br />
                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                <br />

                <br />
              </fieldset>
            </div>
            <Button variant="contained" onClick={this.logIn} type='submit'
              style={{ backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI", marginTop: 20 }}>אימות</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(CCSignin1)


