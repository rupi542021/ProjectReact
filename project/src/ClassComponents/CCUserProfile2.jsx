import React, { Component } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import {  withRouter } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import {  Rectangle } from 'react-shapes';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';

class CCUserProfile2 extends Component {
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
    let studOBJ = localStorage.getItem('chooseUser');
    studOBJ = JSON.parse(studOBJ);

    //localStorage.setItem('student', JSON.stringify(studOBJ));
    console.log("studOBJ2show", studOBJ);
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: studOBJ.DateOfBirth, studDep: studOBJ.DepName
      , studHomeTown: studOBJ.HomeTown.Name, studAddressStudying: studOBJ.AddressStudying.Name,
      studStatus: studOBJ.PersonalStatus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist,
       stutsYear: studOBJ.StudyingYear,match:studOBJ.Match,studPhoto:studOBJ.Photo
    })

  }

  render() {
    return (

      <div>
        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl' ,height:551}}  >
          {/* https://icons.getbootstrap.com/ */}
          <div className='rowC' style={{ position: 'absolute', marginRight: 20 }}>
          <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={() => this.props.history.push("/showUsers")}></i>
            <i className="bi-chat" style={{ color: '#3D3D3D', fontSize: 28, marginRight: 20  }}></i>
            <i className="bi-star" style={{ color: '#3D3D3D', fontSize: 28, marginRight: 20 }}></i>

          </div>

          <svg style={{ position: 'absolute', zIndex: 15, marginRight: '20vw' }}>
            <circle cx="40" cy="40" r="6.5vw" fill="#FAE8BE" stroke="#3D3D3D" strokeWidth="2" />
            <text style={{ fontWeight: 'bold', color: '#3D3D3D', fontSize: '5vw', fontFamily: "Segoe UI" }} 
            textAnchor="middle" x="40" y="45">{this.state.match}%</text>
          </svg>

          <div className='rowC' style={{ position: 'absolute', zIndex: 10, marginTop: 17, marginRight: 0 }}>
            <div className='rowC' style={{width:230}}>
            <h3 style={{ marginLeft: 20, fontWeight: 'bold', fontSize: '6.5vw' }}>{this.state.studName}</h3>
            <h3 style={{ marginLeft: 0, fontSize: '6.5vw' }}>{this.state.studAge}</h3>
            </div>
            <ReactRoundedImage style={{ position: 'absolute', zIndex: 3 }}
                  image={this.state.studPhoto}

                  roundedColor="#3D3D3D"
                  imageWidth="115"
                  imageHeight="115"
                  roundedSize="0"

                /> 
          </div>




          <Rectangle width={'100%'} height={87} fill={{ color: '#FEFFAE' }} style={{ position: 'absolute', zIndex: 1 }} />
          <div style={{ textAlign: 'right', marginRight: 10 }}>
            <h5 style={{ fontWeight: 'bold', marginTop: 5, fontSize: '5.2vw' }}>{this.state.studDep + " - " + this.state.stutsYear + "'"}</h5>
            <p className='labelsRight' style={{ marginTop: 7, color: "#FEFFAE", fontSize: '5.2vw' }}>{"חברים משותפים: "}</p>
            <p className='labelsRight' style={{ marginTop: 7 }}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
            <p className='labelsRight'>{"מקום מגורים - נוכחי: " + this.state.studAddressStudying}</p>
            <p className='labelsRight'>{"סטטוס: " + this.state.studStatus}</p>

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
                  {this.state.studHList !== null ? this.state.studHList.map((h, index) => (<Grid key={index} item style={{ width: 65 }}>

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
          </div>
          {this.state.studCar?<div className='rowRight'><CheckIcon fontSize="small"/> <p className='labelsRight' style={{fontSize:15}}>מגיע עם רכב</p></div>:
<div className='rowRight'><CloseIcon fontSize="small"/> <p className='labelsRight' style={{fontSize:15}}>לא מגיע עם רכב</p></div>}      

{this.state.studCarPool?<div className='rowRight'><CheckIcon fontSize="small"/> <p className='labelsRight' style={{fontSize:15}}>מעוניין בנסיעות משותפות</p></div>:
<div className='rowRight' ><CloseIcon fontSize="small"/> <p className='labelsRight' style={{fontSize:15}}>לא מעוניין בנסיעות משותפות</p></div>}  

        </div>
        <FCTabNavigator/>
      </div>
    )
  }
}
export default withRouter(CCUserProfile2)
