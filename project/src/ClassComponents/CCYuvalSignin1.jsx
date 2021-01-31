import React, { Component } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class CCYuvalSignin1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
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

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
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
    if (this.state.userEmail === "avi@gmail.com") {
      this.setState({ message: "אימות המייל בוצע בהצלחה!" });
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


  render() {
    return (
      <div>
        <h3 style={{ margin: 20 }}>כתובת מייל</h3>
        <TextField id="outlined-basic" label="Email" variant="outlined" onBlur={this.handluserEmail}
        onFocus={()=>{this.setState({errors:""})}} /><br />
        <div className="text-danger">{this.state.errors.email}</div>
        <Button variant="contained" color="primary" onClick={this.logIn} style={{ margin: 10 }}>אימות</Button>
      </div>
    )
  }
}
export default withRouter(CCYuvalSignin1)

