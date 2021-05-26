import React, { Component } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { withRouter } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import { Rectangle } from 'react-shapes';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
class CCUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studName: [],
      studAge: "",
      studPList: [],
      studHList: [],
      studImg: "",
      source: null
    }
  }
  componentDidMount() {
    if (localStorage.getItem('photoChanged')) {
      window.location.reload();
      localStorage.removeItem("photoChanged");
    }

    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    let arr = studOBJ.DateOfBirth.split("T");
    var getAge = require('get-age')
    let age = getAge(arr[0])

    switch (studOBJ.StudyingYear) {
      case 1:
        studOBJ.StudyingYear = "א"
        break;
      case 2:
        studOBJ.StudyingYear = "ב"
        break;
      case 3:
        studOBJ.StudyingYear = "ג"
        break;
      case 4:
        studOBJ.StudyingYear = "ד"
        break;

      default:
        break;
    }
    localStorage.setItem('student', JSON.stringify(studOBJ));
    console.log("studOBJ2post", studOBJ);
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: age, studDep: studOBJ.Dep.DepartmentName
      , studHomeTown: studOBJ.HomeTown.Name, studAddressStudying: studOBJ.AddressStudying.Name,
      studStatus: studOBJ.PersonalStatus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist,
      stutsYear: studOBJ.StudyingYear, studCar: studOBJ.IsAvailableCar, studCarPool: studOBJ.IntrestedInCarPool,
      studPhoto: (studOBJ.Photo === "" || studOBJ.Photo === null) ? "images/avatar.jpg" : 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + studOBJ.Photo
    })

  }

  handleEditProfile = () => {
    this.props.history.push({
      pathname: '/editP',
      state: { PageBack: '/userProfile' }
    });
    //this.props.history.push("/editP");
  }

  render() {
    return (

      <div style={{ height: '100vh', width: '100%' }}>
        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl', height: '83vh', width: '100%' }}  >
          <div>
            <i className="bi bi-pencil-fill"
              style={{ right: '5%', position: 'absolute', color: '#3D3D3D', fontSize: 24 }}
              onClick={this.handleEditProfile} ></i>
          </div>


          <div style={{ position: 'absolute', zIndex: 10, top: '15%', marginRight: 10, display: 'flex', flexDirection: 'row', width: '100%' }}>
            <div style={{ marginTop: 25, display: 'flex', flexDirection: 'row' }}>
              <h3 style={{ marginLeft: '4vw', fontWeight: 'bold', fontSize: '7vw' }}>{this.state.studName}</h3>
              <h3 style={{ fontSize: '7vw' }}>{this.state.studAge}</h3>
            </div>
            <div style={{ position: 'absolute', left: '4%', top: '0%' }}>

              <ReactRoundedImage style={{ zIndex: 3, shadowColor: "#000" }}
                image={this.state.studPhoto}
                roundedColor="#3D3D3D"
                imageWidth="115"
                imageHeight="115"
                roundedSize="0"
              />
            </div>
          </div>

          <Rectangle width={'100%'} height={100} fill={{ color: '#FEFFAE' }} style={{ position: 'absolute', zIndex: 1 }} />

          <div style={{ textAlign: 'right', marginRight: 10 }}>

            <h5 style={{ width: '100%', fontWeight: 'bold', marginTop: 10, fontSize: '5vw' }}>{this.state.studDep + " - " + this.state.stutsYear + "'"}</h5>

            <p className='labelsRight' style={{ marginTop: 15 }}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
            <p className='labelsRight'>{"מקום מגורים - נוכחי: " + this.state.studAddressStudying}</p>
            {this.state.studStatus !== null && this.state.studStatus !== "" ? <p className='labelsRight'>{"סטטוס: " + this.state.studStatus}</p> : ""}


            {this.state.studPList !== null ? <p className='labelsRight'>מקומות בילוי:</p> : ""}


            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2} >
                  {this.state.studPList !== null ? this.state.studPList.map((p, index) => (<Grid key={index} item style={{ width: 60 }}>

                    <ReactRoundedImage
                      image={p.Picon}
                      roundedColor='#96a2aa'
                      imageWidth="45"
                      imageHeight="45"
                      roundedSize="5"

                    /><p className='labelsSmall'>{p.Pname}</p>
                  </Grid>)) : ""}
                </Grid>
              </Grid>
            </Grid>

            {this.state.studHList !== null ? <p className='labelsRight'>תחביבים:</p> : ""}
            <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {this.state.studHList !== null ? this.state.studHList.map((h, index) => (<Grid key={index} item style={{ width: 60 }}>

                    <ReactRoundedImage
                      image={h.Hicon}
                      roundedColor='#96a2aa'
                      imageWidth="45"
                      imageHeight="45"
                      roundedSize="5"

                    /><p className='labelsSmall'> {h.Hname}</p>
                  </Grid>)) : ""}
                </Grid>
              </Grid>
            </Grid>


            {this.state.studCar ? <div className='rowRight'><CheckIcon fontSize="small" /> <p className='labelsRight' style={{ fontSize: 16 }}>מגיע עם רכב</p></div> :
              <div className='rowRight'><CloseIcon fontSize="small" /> <p className='labelsRight' style={{ fontSize: 16 }}>לא מגיע עם רכב</p></div>}

            {this.state.studCarPool ? <div className='rowRight'><CheckIcon fontSize="small" /> <p className='labelsRight' style={{ fontSize: 16 }}>מעוניין בנסיעות משותפות</p></div> :
              <div className='rowRight' ><CloseIcon fontSize="small" /> <p className='labelsRight' style={{ fontSize: 16 }}>לא מעוניין בנסיעות משותפות</p></div>}
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}
export default withRouter(CCUserProfile)
