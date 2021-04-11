import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import ReactRoundedImage from "react-rounded-image";
//import { Radio } from 'antd';
import Button from '@material-ui/core/Button';
import 'antd/dist/antd.css';
import '../style.css';
import Switch from "react-switch";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2';
//const citiesList = [];

class CCeditp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studOBJ: {},
      switchChecked: false,
      comeWithCar: false,
      imgURL: null,
      selectedFile: null,
    }
this.citiesList=[];
  }

  componentDidMount = () => {
    console.log("start of componentDidMount");

    console.log("cities list before:", this.citiesList);
    this.fetchGetAllResidence();
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    this.setState({ imgURL: studOBJ.Photo === "" ? "images/avatar.jpg" :  'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/'+studOBJ.Photo })
    console.log(studOBJ.Photo);
    let isAvailableCar = studOBJ.IsAvailableCar;
    if (isAvailableCar === "") {
      isAvailableCar = false;
    }
    let intrestedInCarpool = studOBJ.IntrestedInCarPool;
    if (intrestedInCarpool === "") {
      intrestedInCarpool = false;
    }
    this.setState({ studOBJ: studOBJ, switchChecked: intrestedInCarpool, comeWithCar: isAvailableCar },
      () => { console.log("studOBJ", this.state.studOBJ); });
    console.log("cities list after:", this.citiesList);
    console.log("end of componentDidMount");
  }

  fetchGetAllResidence = () => {
    this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/GetAllResidences';
    console.log('GET cities start');
    fetch(this.apiUrl,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch GetAllResidences= ", result);
          result.forEach(s => {
            if (s.Name !== "") {
              let city = { Name: s.Name, Id: s.Id, X: s.X, Y: s.Y }
              this.citiesList.push(city);

            }

          });
          this.setState({ cities: this.citiesList },
            () => { console.log('GET cities end'); });


        }
      )

  }

  // btnFile = (event) => {
  //   console.log(event.target.files[0]);

  //   if (event.target.value.length > 0) {
  //     this.state.studOBJ.Photo = event.target.files[0].name
  //   }

  //   else {
  //     this.state.studOBJ.Photo = null;
  //   }

  // }

  btnFile = (event) => {
    console.log(event.target.files[0]);
    var data = new FormData();
    if (event.target.value.length > 0) {

      let studOBJ = localStorage.getItem('student');
      studOBJ = JSON.parse(studOBJ);
      const file = event.target.files[0];
      console.log(file);
      const newUrl = URL.createObjectURL(file);
      console.log(newUrl);
      this.setState({ imgURL: newUrl })

      data.append("UploadedImage", file);
      data.append("name", studOBJ.Mail);

      console.log("in post img function");
      this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/uploadedFiles'
      fetch(this.apiUrl,
        {
          method: 'POST',
          body: data,
        })
        .then(res => {
          console.log('res=', res);

          if (res.status === 201) {
            console.log('uploadedFile created:)');
          }
          if (res.status === 400) {
            throw Error('אופס! משהו לא עבד. אנא נסה שנית');
          }
          console.log('res.ok', res.ok);

          if (res.ok) {
            console.log('post succeeded');
          }

          return res.json()
        })
        .then(
          (result) => {
            console.log("fetch btnFetchuploadedFile= ", result);
            let imgNameInServer = result.split('\\').pop();
            console.log(imgNameInServer);
            this.setState({ urlimg: result, selectedFile: imgNameInServer })
            this.state.studOBJ.Photo = imgNameInServer;

          })
          .catch((error) => {
            console.log("err post=", error);
             this.setState({ imgURL: "images/avatar.jpg" })
             this.state.studOBJ.Photo = "";
            Swal.fire({
              text: error.message === 'Failed to fetch' ? 'אופס! משהו לא עבד. אנא נסה שנית' : error.message,
              icon: 'error',
              iconHtml: '',
              confirmButtonText: 'סגור',
              showCloseButton: true
            })
          });
      console.log('end');
    }

    else {
      this.setState({ selectedFile: null })
    }

  }

  chgGender = (e) => {
    let g = e.target.value;
    this.state.studOBJ.Gender = g;
    console.log("gender:", this.state.studOBJ.Gender);
  }

  chgCity = (event) => {
    let cityName = event.target.innerText;
    let city = this.citiesList.find(city => city.Name === cityName );
    console.log("cityName:", cityName);
    console.log("city:", city);
    this.state.studOBJ.HomeTown = city;
  }

  chgCurrentCity = (event) => {
    let cityName = event.target.innerText;
    let city = this.citiesList.find(city => city.Name === cityName );
    console.log("cityName:", cityName);
    console.log("city:", city);
    this.state.studOBJ.AddressStudying = city;
  }

  // chgStatus = (status) => {
  //   this.state.studOBJ.PersonalStatus = status;
  // }

  chgStatus = (event) => {
    let status = event.target.value
      console.log("status:", status);
      this.state.studOBJ.PersonalStatus = status;

  }

  chgSwitchWithCar = (checked) => {
    console.log("switch with car checked: ", checked);
    this.setState({ comeWithCar: checked },
      () => {
        if (this.state.comeWithCar === true) {
          this.state.studOBJ.IsAvailableCar = true;
        }
        else this.state.studOBJ.IsAvailableCar = false;
      });
  }

  chgSwitchCarpool = (checked) => {
    console.log("switch checked: ", checked)
    this.setState({ switchChecked: checked },
      () => {
        if (this.state.switchChecked === true) {
          this.state.studOBJ.IntrestedInCarPool = true;
        }
        else this.state.studOBJ.IntrestedInCarPool = false;
      });
  }

  btnSave = () => {
      //if (!this.state.errors.city && !this.state.errors.currentCity && this.state.studOBJ.HomeTown !== "choose" && this.state.studOBJ.AddressStudying !== "choose"&&this.state.selectedFile!==null) {
      let updatedProfile = this.state.studOBJ;
      localStorage.setItem('student', JSON.stringify(updatedProfile));
      console.log("updated profile: ", updatedProfile);
      this.updateInDB(updatedProfile);
      this.props.history.push("/userProfile");
  }

  updateInDB = (stud) => {
    console.log('start updating');
    fetch('http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/updateStudentPtofile',
      {
        method: 'Put',
        body: JSON.stringify(stud),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);

        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('updateStudentPtofile succeeded');
        }

        return res.json()
      })
      .then(
        (result) => {
          console.log("fetch btnFetchupdateStudentPtofile= ", result);
        },
        (error) => {
          console.log("err put=", error);
        });
    console.log('end');
  }
  deleteImg=()=>{
    this.setState({imgURL:"images/avatar.jpg"});
    this.state.studOBJ.Photo="";
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div className='container' style={{ direction: 'rtl',marginBottom:15 }}>
          <h4 style={{ fontSize: '6vw', marginTop: '2vw' }}>עריכת פרופיל</h4>
          <div className='rowC' style={{ marginTop: 10 }}>

            <h4 style={{ color: '#3D3D3D', marginLeft: 20, fontWeight: 'bold', fontSize: '6vw' }}> {this.state.studOBJ.Fname} {this.state.studOBJ.Lname}  </h4>
<div>
            <ReactRoundedImage
              image={this.state.studOBJ !== {} ? this.state.imgURL : ''}
              roundedColor="#96a2aa"
              imageWidth="80"
              imageHeight="80"
              roundedSize="5" />
              <i className="bi bi-trash-fill"
              onClick={this.deleteImg}
              style={{ color: '#3D3D3D', fontSize: 24, position: 'absolute', zIndex: 15, marginRight: -40, marginTop: -25 }}></i>
            <i className="bi bi-pencil-fill"
              onClick={() => this.fileInput.click()}
              style={{ color: '#3D3D3D', fontSize: 24, position: 'absolute', zIndex: 15, marginRight: 20, marginTop: -25 }}></i>
          </div>
          </div>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={this.btnFile}
            ref={fileInput => this.fileInput = fileInput} />

        </div>

        <div>
          <p className='labels'> עיר קבע </p>

          <Autocomplete
                options={this.citiesList}
                getOptionLabel={(city) => city.Name}
                style={{ width: '50vw', margin: '0px auto', direction:'rtl',backgroundColor:'white' }}
                renderInput={(params) => <TextField {...params} label={this.state.studOBJ.HomeTown===undefined?"בחר עיר":this.state.studOBJ.HomeTown.Name} variant="outlined" />}
                size='small'
               // value={this.state.city}
                onChange={this.chgCity}
              />

          <p className='labels'> מקום מגורים נוכחי </p>

          <Autocomplete
                options={this.citiesList}
                getOptionLabel={(city) => city.Name}
                style={{ width: '50vw', margin: '0px auto',direction:'rtl' ,backgroundColor:'white'}}
                renderInput={(params) => <TextField {...params} label={this.state.studOBJ.AddressStudying===undefined?"בחר עיר":this.state.studOBJ.AddressStudying.Name} 
                variant="outlined"/>}
                size='small'
                onChange={this.chgCurrentCity}
              
              />
        </div>
        <div>
          <p className='labels'> סטטוס </p>

          <FormControl variant="outlined" style={{ width: '50vw',margin: '0px auto',paddingInlineStart:0 ,backgroundColor:'white'}}>
<InputLabel htmlFor="filled-age-native-simple">{this.state.studOBJ.PersonalStatus ==="" ? " בחר סטטוס " :this.state.studOBJ.PersonalStatus}</InputLabel>
<Select

value={this.state.status}
onChange={this.chgStatus}
label="בחר סטטוס"
>
<option value="">בחר</option>
<option value="רווק/ה">רווק/ה</option>
<option  value="נשוי/ה">נשוי/ה</option>
<option value="ידוע/ה בציבור">ידוע/ה בציבור</option>
</Select>
</FormControl>
        </div>
        <div>
          <p className='labels'> מגיע עם רכב </p>
          <Switch
            height={20}
            width={40}
            onColor='#1b84fb'
            onChange={this.chgSwitchWithCar} checked={this.state.comeWithCar} />
          <p className='labels'> מעוניין בנסיעות משותפות </p>
          <Switch
            height={20}
            width={40}
            onColor='#1b84fb'
            onChange={this.chgSwitchCarpool} checked={this.state.switchChecked} />
        </div>

        <div className='rowC' style={{ marginTop: '2vh', marginBottom: '2.9vh' }}>
          <Button variant="contained"
            style={{ marginRight: 20, fontFamily: "Segoe UI",backgroundColor:"#96a2aa" }}
            onClick={(e) => {
              this.props.history.push("/editHobbies")
            }}><i className="bi bi-pencil-fill" style={{ marginRight: 8 }}></i>תחביבים</Button>

          <Button variant="contained"
            color="#96a2aa"
            style={{ fontFamily: "Segoe UI",backgroundColor:"#96a2aa" }}
            onClick={() => { this.props.history.push("/editHangouts") }}>
            <i className="bi bi-pencil-fill" style={{ marginRight: 8 }}></i>מקומות בילוי</Button>
        </div>

        <div>
          <Button variant="contained"
            style={{ paddingTop: 0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
            onClick={this.btnSave}> שמור </Button>


<Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
         fontFamily: "Segoe UI",height:35}}
         onClick={() => this.props.history.push("/userprofile")}
        > <i className="bi bi-arrow-right-short"
        style={{ paddingTop:0,color: '#3D3D3D', fontSize: 32}}></i>
        </Button>
        </div>
      </div>


    )
  }
}

export default withRouter(CCeditp)
