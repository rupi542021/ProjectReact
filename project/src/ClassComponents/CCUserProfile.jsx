import React, { Component,StyleSheet } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import { Circle,Rectangle} from 'react-shapes';



class CCUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studName: [],
      studAge: "",
      studPList: [],
      studHList: []


    }
  }
  componentDidMount() {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);

    let arr = studOBJ.DateOfBirth.split("T");
    var getAge = require('get-age')
    let age = getAge(arr[0])

    switch (studOBJ.StudyingYear) {
      case 1:
        studOBJ.StudyingYear="א"
        break;
      case 2:
        studOBJ.StudyingYear="ב"
        break;
      case 3:
        studOBJ.StudyingYear="ג"
        break;
      case 4:
        studOBJ.StudyingYear="ד"
        break;

      default:
        break;
    }
    localStorage.setItem('student', JSON.stringify(studOBJ));
    //this.props.history.push("/hobbies");
    console.log("studOBJ2post", studOBJ);
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: age, studDep: studOBJ.Dep.DepartmentName
      , studHomeTown: studOBJ.HomeTown, studAddressStudying: studOBJ.AddressStudying,
      studStatus: studOBJ.PersonalStatus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist,stutsYear:studOBJ.StudyingYear
    })

  }

  handleEditProfile = () =>
  {
    this.props.history.push("/editP");
  }



  render() {
    return (

      <div style={{ direction: 'rtl' }}  >
        <PrimarySearchAppBar />
        <img src="icons/edit.png" alt="" style={{marginRight:5, marginTop:10, position:'absolute'}} onClick={this.handleEditProfile}/>
        <div className='rowC' style={{position: 'absolute',zIndex:10,marginTop:30,marginRight:20}}>
        <h3 style={{marginLeft:20,fontWeight:'bold'}}>{this.state.studName}</h3>
        <h3 style={{marginLeft:40}}>{this.state.studAge}</h3>
        <Circle r={55} fill={{color:'#3D3D3D'}}
         style={{position: 'absolute',zIndex:6}}> </Circle>
        </div>

        <Rectangle width={400} height={100} fill={{color:'#FEFFAE'}} style={{  position: 'absolute',zIndex:1}} />
<div style={{textAlign:'right',marginRight:10}}>
        <h5 style={{fontWeight:'bold',marginTop:10}}>{this.state.studDep + " - " + this.state.stutsYear + "'"}</h5>
        <p className='labelsRight' style={{marginTop:20}}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
        <p className='labelsRight'>{"מקום מגורים - נוכחי: " + this.state.studAddressStudying}</p>
         <p className='labelsRight'>{"סטטוס: " + this.state.studStatus}</p>

        {this.state.studPList !== null ? <p className='labelsRight'>מקומות בילוי:</p>:""}
        
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2} >
              {this.state.studPList !== null ? this.state.studPList.map((p, index) => (<Grid key={index} item style={{width:60}}>

                <ReactRoundedImage
                  image={p.Picon}
                  roundedColor='#96a2aa'
                  imageWidth="45"
                  imageHeight="45"
                  roundedSize="5"

                /><p className='labels'>{p.Pname}</p>
              </Grid>)) : ""}
            </Grid>
          </Grid>
        </Grid>

        {this.state.studHList !== null ?<p className='labelsRight'>תחביבים:</p>:""}
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {this.state.studHList !== null ? this.state.studHList.map((h, index) => (<Grid key={index} item style={{width:60}}>

                <ReactRoundedImage
                  image={h.Hicon}
                  roundedColor='#96a2aa'
                  imageWidth="45"
                  imageHeight="45"
                  roundedSize="5"

                /><p className='labels'> {h.Hname}</p>
              </Grid>)) : ""}
            </Grid>
          </Grid>
        </Grid>
        </div>



      </div>
    )
  }
}
export default withRouter(CCUserProfile)
