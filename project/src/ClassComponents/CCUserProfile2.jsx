import React, { Component,StyleSheet } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import { Circle,Rectangle} from 'react-shapes';
import Button from '@material-ui/core/Button';


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

    localStorage.setItem('student', JSON.stringify(studOBJ));
    console.log("studOBJ2post", studOBJ);
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: studOBJ.DateOfBirth, studDep: studOBJ.DepName
      , studHomeTown: studOBJ.HomeTown, studAddressStudying: studOBJ.AddressStudying,
      studStatus: studOBJ.PersonalStatus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist,stutsYear:studOBJ.StudyingYear
    })

  }

  render() {
    return (

      <div style={{ direction: 'rtl' }}  >
        <PrimarySearchAppBar />

        <div className='rowC' style={{position:'absolute', marginRight:40}}>
        <i className="bi-chat" style={{color:'#3D3D3D',fontSize:28}}></i>
        <i className="bi-star" style={{color:'#3D3D3D',fontSize:28,marginRight:20}}></i>
        </div>

        <svg style={{position:'absolute',zIndex:15, marginRight:78}}>
    <circle cx="50" cy="55" r="25" fill="#FAE8BE" stroke="#3D3D3D" strokeWidth="2" />
    <text style={{fontWeight:'bold',color:'#3D3D3D',fontSize:18,fontFamily: "Segoe UI"}} textAnchor="middle" x="50" y="60">45%</text>
</svg>

        <div className='rowC' style={{position: 'absolute',zIndex:10,marginTop:30,marginRight:20}}>
        <h3 style={{marginLeft:20,fontWeight:'bold'}}>{this.state.studName}</h3>
        <h3 style={{marginLeft:40}}>{this.state.studAge}</h3>
        <Circle r={55} fill={{color:'#3D3D3D'}}
         style={{position: 'absolute',zIndex:3}}> </Circle>
        </div>




        <Rectangle width={400} height={100} fill={{color:'#FEFFAE'}} style={{  position: 'absolute',zIndex:1}} />
<div style={{textAlign:'right',marginRight:10}}>
        <h5 style={{fontWeight:'bold',marginTop:10}}>{this.state.studDep + " - " + this.state.stutsYear + "'"}</h5>
        <p className='labelsRight' style={{marginTop:15,color:"#FEFFAE",fontSize:19}}>{"חברים משותפים: "}</p>
        <p className='labelsRight' style={{marginTop:15}}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
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

        <Button variant="contained" style={{ paddingTop: 0, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
          onClick={() => this.props.history.push("/showUsers")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCUserProfile2)
