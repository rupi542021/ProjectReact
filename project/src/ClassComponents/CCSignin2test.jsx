import React, { Component } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Dimensions from 'react-dimensions'
import background from "../img/background.jpg";

class CCSignin2test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //password con
    if (!fields["password2"]) {
      formIsValid = false;
      errors["password2"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    let errors = {};
    if (this.handleValidation()&&this.state.fields["password"]===this.state.fields["password2"]) {
      console.log(this.state.fields["password"])

  let stud=localStorage.getItem('student');
      stud=JSON.parse(stud);
      stud.Password = this.state.fields["password"];
      localStorage.setItem('student',JSON.stringify(stud));
      console.log(stud);
      this.props.history.push("/signin3");

      //alert("Form submitted");
    }
    else {
      errors["password2"] = "אימות הסיסמא לא תואם. אנא הכנס שנית";
      //alert("Form has errors. password dont much")
    }

  }
  handleValidationPassword(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
        formIsValid = false;
        errors["password"] = "סיסמה לא תקינה";
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
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
          <h4 style={{ marginTop: 80 }}>סיסמה</h4>
          <form name="contactform" className="contactform" onSubmit={this.contactSubmit.bind(this)}>
            <div className="col-md-6">
              <fieldset>

                <br />
                <TextField id="outlined-basic" label="סיסמה"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined" refs="password" placeholder="Password" 
                  onChange={this.handleChange.bind(this, "password")} 
                  onBlur={this.handleValidationPassword.bind(this, "password")}
                  value={this.state.fields["password"]} />
                <br />
                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                <br />
                <h4 style={{ marginTop: 20 }}>אימות סיסמה</h4>
                <TextField id="outlined-basic" label="אימות סיסמה"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined" refs="password2" placeholder="Password2" 
                  onChange={this.handleChange.bind(this, "password2")} 
                  value={this.state.fields["password2"]} />
                <br />
                <span style={{ color: "red" }}>{this.state.errors["password2"]}</span>

                <br />
              </fieldset>
              <p onClick={this.showUsingTerms} style={{ marginTop: 30, color: "blue" }}>תנאי שימוש</p>
            </div>
            <Button variant="contained" onClick={this.logIn} type='submit'
              style={{ backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI", marginTop: 20 }}
              >הבא</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(CCSignin2test)


