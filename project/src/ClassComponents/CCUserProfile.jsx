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
      stutYear: "",
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
        this.setState({ studYear: "א" })
        break;
      case 2:
        this.setState({ studYear: "ב" })
        break;
      case 3:
        this.setState({ studYear: "ג" })
        break;
      case 4:
        this.setState({ studYear: "ד" })
        break;

      default:
        break;
    }
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: age, studDep: studOBJ.Dep.DepartmentName
      , studHomeTown: studOBJ.HomeTown, studAddressStudying: studOBJ.AddressStudying,
      studStatus: studOBJ.PersonalStaus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist
    })

  }



  render() {
    return (

      <div style={{ direction: 'rtl' }}  >
        <PrimarySearchAppBar />
        
        <div className='rowC' style={{position: 'absolute',zIndex:10,marginTop:30,marginRight:20}}>
        <h3 style={{marginLeft:20,fontWeight:'bold'}}>{this.state.studName}</h3>
        <h3 style={{marginLeft:40}}>{this.state.studAge}</h3>

        <Circle r={55} fill={{color:'#3D3D3D'}}
         style={{position: 'absolute',zIndex:6}}> </Circle>
        </div>

        <Rectangle width={400} height={100} fill={{color:'#FEFFAE'}} style={{  position: 'absolute',zIndex:1}} />
<div style={{textAlign:'right',marginRight:10}}>
        <h5 style={{fontWeight:'bold',marginTop:10}}>{this.state.studDep + " - " + this.state.studYear + "'"}</h5>
        <p className='labelsRight' style={{marginTop:20}}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
        <p className='labelsRight'>{"מקום מגורים - נוכחי: " + this.state.studAddressStudying}</p>
         <p className='labelsRight'>{"סטטוס: " + this.state.studStatus}</p>

        {this.state.studPList !== null ? <p className='labelsRight'>מקומות בילוי:</p>:""}
        
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2} >
              {this.state.studPList !== null ? this.state.studPList.map((p, index) => (<Grid key={index} item style={{width:60}}>

                <ReactRoundedImage
                  image={p.Image}
                  roundedColor='#96a2aa'
                  imageWidth="45"
                  imageHeight="45"
                  roundedSize="5"

                /><p className='labels'>{p.Name}</p>
              </Grid>)) : ""}
            </Grid>
          </Grid>
        </Grid>

        {this.state.studHList !== null ?<p className='labelsRight'>תחביבים:</p>:""}
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {this.state.studHList !== null ? this.state.studHList.map((p, index) => (<Grid key={index} item style={{width:60}}>

                <ReactRoundedImage
                  image={p.Image}
                  roundedColor='#96a2aa'
                  imageWidth="45"
                  imageHeight="45"
                  roundedSize="5"

                /><p className='labels'> {p.Name}</p>
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
