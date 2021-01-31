import React, { Component } from 'react'
import { Link ,withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CCLogin extends Component {
    render() {
        return (
            <div>
                <h3 style={{margin:20}}>התחברות</h3>
                 <TextField id="outlined-basic" label="Email" variant="outlined" onChange={this.handluserEmail} style={{margin:10}}/><br />
                 <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={this.handluserPassword}
          style={{margin:10}}
        /><br/>
                       <Button variant="contained" color="secondary" style={{margin:10}} >כניסה</Button><br/>
               <Button variant="contained" color="default" style={{margin:10}} ><Link to="/signin">להירשם</Link></Button>

            </div>
        )
    }
}
export default withRouter(CCLogin)