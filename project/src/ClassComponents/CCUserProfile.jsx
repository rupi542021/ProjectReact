import React, { Component,StyleSheet } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import { Circle,Rectangle} from 'react-shapes';
import axios from 'axios';



class CCUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studName: [],
      studAge: "",
      studPList: [],
      studHList: [],
      studImg:"",
      source: null


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
    console.log("studOBJ2post", studOBJ);
    this.setState({
      studName: studOBJ.Fname + " " + studOBJ.Lname, studAge: age, studDep: studOBJ.Dep.DepartmentName
      , studHomeTown: studOBJ.HomeTown.Name, studAddressStudying: studOBJ.AddressStudying.Name,
      studStatus: studOBJ.PersonalStatus, studPList: studOBJ.Plist, studHList: studOBJ.Hlist,
      stutsYear:studOBJ.StudyingYear,studPhoto:"http://127.0.0.1:8887/"+studOBJ.Photo
    })
    console.log(this.state.studImg);





      // axios
      // .get(
      //   'https://localhost:44325/API/students/'+studOBJ.Photo+'/photos',
      //   { responseType: 'arraybuffer' },
      // )
      // .then(response => {
      //   const base64 = btoa(
      //     new Uint8Array(response.data).reduce(
      //       (data, byte) => data + String.fromCharCode(byte),
      //       '',
      //     ),
      //   );
      //   let objectURL = 'data:image/jpeg;base64,'+window.btoa(base64);
      //   //let imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      //   this.setState({ source: objectURL });
      //   console.log(objectURL)
      // });

        fetch('https://localhost:44325/API/students/'+studOBJ.Photo+'/photos').then(r => r.blob()).then(blob => {
          const newUrl = URL.createObjectURL(blob);  
          console.log(newUrl)
        this.setState({
            source: newUrl
           });

      //     var reader = new FileReader();
      //     var b64 =null;
      //     reader.onload = function() {
      //          b64 = reader.result.replace(/^data:.+;base64,/, '');
 
      //     };
      //     this.setState({
      //       source: b64
      //      });
      //     console.log(b64)
      //     reader.readAsDataURL(blob);
      //     const newUrl = URL.createObjectURL(blob);
      // console.log(newUrl);
        });
      

  }

  handleEditProfile = () =>
  {
    this.props.history.push("/editP");
  }



  render() {
    return (

      <div>
        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl' }}  >
       
        <i className="bi bi-pencil-fill" 
        style={{marginRight:5, position:'absolute',color: '#3D3D3D', fontSize: 24}} 
        onClick={this.handleEditProfile} ></i>



        <div className='rowC' style={{ position: 'absolute', zIndex: 10, marginTop: 30, marginRight: 20 }}>
            <h3 style={{ marginLeft: 20, fontWeight: 'bold', fontSize: '7vw' }}>{this.state.studName}</h3>
            <h3 style={{ marginLeft: '15vw', fontSize: '6.5vw' }}>{this.state.studAge}</h3>
            {/* <Circle r={55} fill={{ color: '#3D3D3D' }}
              style={{ position: 'absolute', zIndex: 3 }}> </Circle> */}
<ReactRoundedImage style={{ position: 'absolute', zIndex: 3 }}
                  image={this.state.studPhoto}

                  roundedColor="#3D3D3D"
                  imageWidth="115"
                  imageHeight="115"
                  roundedSize="0"

                /> 
          </div>

          <Rectangle width={'100%'} height={100} fill={{ color: '#FEFFAE' }} style={{ position: 'absolute', zIndex: 1 }} />
          <div style={{ textAlign: 'right', marginRight: 10 }}>
            <h5 style={{ fontWeight: 'bold', marginTop: 10, fontSize: '5.5vw' }}>{this.state.studDep + " - " + this.state.stutsYear + "'"}</h5>
           
            <p className='labelsRight' style={{ marginTop: 15 }}>{"מקום מגורים - מקור: " + this.state.studHomeTown}</p>
            <p className='labelsRight'>{"מקום מגורים - נוכחי: " + this.state.studAddressStudying}</p>
            <p className='labelsRight'>{"סטטוס: " + this.state.studStatus}</p>

            {this.state.studPList !== null ? <p className='labelsRight'>מקומות בילוי:</p> : ""}


            <img height='20' width='20' src={this.state.source} alt="Logo" />


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
      </div>
    )
  }
}
export default withRouter(CCUserProfile)
