import React, { Component } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';


class CCUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        studName:[],
        studAge:"",
        stutYear:""


    }
  }
  componentDidMount() {
    let studOBJ=localStorage.getItem('student');
    studOBJ=JSON.parse(studOBJ);

    let arr=studOBJ.DateOfBirth.split("T");
    var getAge = require('get-age')
    let age=getAge(arr[0])

    switch (studOBJ.StudyingYear) {
      case 1:
        this.setState({studYear:"א"})
        break;
        case 2:
        this.setState({studYear:"ב"})
        break;
        case 3:
        this.setState({studYear:"ג"})
        break;
        case 4: 
        this.setState({studYear:"ד"})
        break;
    
      default:
        break;
    }
    this.setState({studName:studOBJ.Fname+" "+studOBJ.Lname,studAge:age,studDep:studOBJ.Dep.DepartmentName
    ,studHomeTown:studOBJ.HomeTown,studAddressStudying:studOBJ.AddressStudying})

  }

  
  render() {
    return (
        
        <div style={{ direction: 'rtl' }}  >       
            <PrimarySearchAppBar />
            <h3>{this.state.studName}</h3>
            <h3>{this.state.studAge}</h3>
            <h3>{this.state.studDep+" - "+this.state.studYear+"'"}</h3>
            <p>{"מקום מגורים - מקור: "+this.state.studHomeTown}</p>
            <p>{"מקום מגורים - נוכחי: "+this.state.studAddressStudying}</p>

        
        
        </div>
    )
  }
}
export default withRouter(CCUserProfile)
