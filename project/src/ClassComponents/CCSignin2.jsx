import React, { Component } from 'react'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class CCSignin2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: ""
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
        var pass = e.target.value;
        var reg = /^[@#][A-Za-z0-9]{7,13}$/;
        var test = reg.test(pass);
        if (test) {
           alert('pass');
           this.setState({ password: e.target.value });
        }else{
          alert('fail');
        }

        
      }
    
      handluserConfirmPassword = (e) => {
        this.setState({ password2Confirm: e.target.value });
      }
    
      btnNext2Confirm = () => {
        if (this.state.password !== this.state.password2Confirm) {
          this.setState({ message: "אימות הסיסמה נכשל!" });
        }
        else {
          // this.setState({str: })
        }
    }
    render() {
        return (
            <div>
                <h3>סיסמה</h3>
              
                <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onBlur={this.handluserPassword}
        />
        <br/>
                <h3>אימות סיסמה</h3>

                <TextField
          id="outlined-password-input"
          label="Password Confirm"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={this.handluserConfirmPassword}
        /><br/>
                <p onClick={this.showUsingTerms}>תנאי שימוש</p>
                <br/>
                <Button variant="contained" color="primary" style={{margin:10}} onClick={this.btnNext2Confirm}>הבא</Button>
                <br/>
                {this.state.password}
            </div>
        )
    }
}
