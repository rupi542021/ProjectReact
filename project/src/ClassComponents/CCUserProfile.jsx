import React, { Component } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';


class CCUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        studName:[],
        studAge:""


    }
  }
  componentDidMount() {
    let studOBJ=localStorage.getItem('student');
    studOBJ=JSON.parse(studOBJ);

    let arr=studOBJ.DateOfBirth.split("T");
    var getAge = require('get-age')
    let age=getAge(arr[0])
    console.log(age);
    this.setState({studName:studOBJ.Fname+" "+studOBJ.Lname,studAge:age})

  }

  
  render() {
    return (
        
        <div>        
            <PrimarySearchAppBar />
            <h3>{this.state.studName}</h3>
            <h3>{this.state.studAge}</h3>

        
        
        </div>
    )
  }
}
export default withRouter(CCUserProfile)
