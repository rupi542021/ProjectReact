import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import ReactRoundedImage from "react-rounded-image";
import { Form, Select, Radio } from 'antd';
import Button from '@material-ui/core/Button';
import 'antd/dist/antd.css';
import '../style.css';
import Switch from "react-switch";
import FormItem from 'antd/lib/form/FormItem';

const citiesList = [];

class CCeditp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studOBJ: {},
      switchChecked: false,
      comeWithCar: false,
      errors: {},
      imgURL: null,
      selectedFile:null
    }

  }

  componentDidMount = () => {
    console.log("start of componentDidMount");
    
    console.log("cities list before:", citiesList);
    this.fetchGetAllResidence();
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    this.setState({imgURL:"http://127.0.0.1:8887/"+studOBJ.Photo})
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
    console.log("cities list after:", citiesList);
    console.log("end of componentDidMount");
  }

  fetchGetAllResidence = () => {
    this.apiUrl = 'https://localhost:44325/api/students/GetAllResidences';
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
              citiesList.push(city);

            }

          });
          this.setState({ cities: citiesList },
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

      //this.setState({ selectedFile: event.target.files[0].name });
      const file = event.target.files[0];
      console.log(file);
      const newUrl = URL.createObjectURL(file);
      console.log(newUrl);
      this.setState({ imgURL: newUrl })
      //this.state.studOBJ.Photo=newUrl;


      data.append("UploadedImage", file);
      data.append("name", studOBJ.Mail);

      console.log("in post img function");
      this.apiUrl = 'https://localhost:44325/api/students/uploadedFiles'
      fetch(this.apiUrl,
        {
          method: 'POST',
          body: data,
          // headers: new Headers({
          //   // 'Content-Type': 'application/json; charset=UTF-8',
          //   // 'Accept': 'application/json; charset=UTF-8'
          // })
        })
        .then(res => {
          console.log('res=', res);

          if (res.status === 201) {
            console.log('uploadedFile created:)');
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
            let imgNameInServer=result.split('\\').pop();
            console.log(imgNameInServer);
            this.setState({ urlimg: result,selectedFile:imgNameInServer })
            this.state.studOBJ.Photo=imgNameInServer;

          },
          (error) => {
            console.log("err post=", error);
          });
      console.log('end');


      //setSource(newUrl);
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

  chgCity = (city) => {
    if (city !== "choose") {
      let CityD = citiesList.find(s => s.Name === city);
      this.state.studOBJ.HomeTown = CityD;
      this.state.errors["city"] = "";
    }
    else {
      this.state.errors["city"] = " שדה זה הינו חובה ";
    }
  }

  chgCurrentCity = (currentCity) => {
    if (currentCity !== "choose") {
      let currentCityD = citiesList.find(s => s.Name == currentCity)
      this.state.studOBJ.AddressStudying = currentCityD;
      this.state.errors["currentCity"] = "";
    }
    else {
      this.state.errors["currentCity"] = " שדה זה הינו חובה ";
    }
  }

  chgStatus = (status) => {
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
    console.log("errors", this.state.errors);
    this.setState({ errors: this.state.errors }, () => {
      console.log("errors after change", this.state.errors);
      //if (!this.state.errors.city && !this.state.errors.currentCity && this.state.studOBJ.HomeTown !== "choose" && this.state.studOBJ.AddressStudying !== "choose"&&this.state.selectedFile!==null) {
        let updatedProfile = this.state.studOBJ;
        //updatedProfile = JSON.stringify(updatedProfile);
        localStorage.setItem('student', JSON.stringify(updatedProfile));
        console.log("updated profile: ", updatedProfile);
        this.updateInDB(updatedProfile);
        this.props.history.push("/userProfile");
      //}
    })

  }

  updateInDB = (stud) => {
    console.log('start updating');
    fetch('https://localhost:44325/api/students/updateStudentPtofile',
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
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div className='container' style={{ direction: 'rtl' }}>
        <h4 style={{fontSize:'6vw',marginTop:'2vw'}}>עריכת פרופיל</h4>
          <div className='rowC' style={{ marginTop: 10 }}>
            
            <h4 style={{ color: '#3D3D3D', marginLeft: 20, fontWeight: 'bold', fontSize: '6vw' }}> {this.state.studOBJ.Fname} {this.state.studOBJ.Lname}  </h4>

            <ReactRoundedImage
              image={this.state.studOBJ !== {} ? this.state.imgURL : ''}
              roundedColor="#96a2aa"
              imageWidth="80"
              imageHeight="80"
              roundedSize="5" />
            <i class="bi bi-pencil-fill"
            onClick={() => this.fileInput.click()}
              style={{ color: '#3D3D3D', fontSize: 24, position: 'absolute', zIndex: 15, marginRight: 170,marginTop: 50 }}></i>
          </div>

          <input
            type="file"
            style={{ display: 'none' }}
            onChange={this.btnFile}
            ref={fileInput => this.fileInput = fileInput} />
         
        </div>

        <div className='rowC' style={{ direction: 'rtl',marginTop: 10 }}>
          <p className='labels'> מגדר </p>
          <Radio.Group onChange={this.chgGender} defaultValue={this.state.studOBJ.Gender}>
            <Radio value="female">אישה</Radio>
            <Radio value="male">גבר</Radio>
            <Radio value="other">אחר</Radio>
          </Radio.Group>
        </div>
        <div>
          <p className='labels'> עיר קבע </p>
          <Select style={{ width: 200 }} placeholder={this.state.studOBJ.HomeTown === undefined ? "" : this.state.studOBJ.HomeTown.Name}
            onChange={this.chgCity}
          >
            <Select.Option value="choose"> בחר עיר</Select.Option>
            {citiesList.map((city) => (
              <Select.Option key={city.Id} value={city.Name}> {city.Name} </Select.Option>
            ))}
          </Select>
          <div style={{ color: "#de0d1b" }}>{this.state.errors.city}</div>

          <p className='labels'> מקום מגורים נוכחי </p>
          <Select style={{ width: 200 }} placeholder={this.state.studOBJ.AddressStudying === undefined ? "" : this.state.studOBJ.AddressStudying.Name}
            onChange={this.chgCurrentCity}
          >
            <Select.Option value="choose"> בחר עיר</Select.Option>
            {citiesList.map((city) => (
              <Select.Option key={city.Id} value={city.Name}> {city.Name} </Select.Option>
            ))}
          </Select>
          <div style={{ color: "#de0d1b" }}>{this.state.errors.currentCity}</div>
        </div>
        <div>
          <p className='labels'> סטטוס </p>
          <Select style={{ width: 200 }} placeholder={this.state.studOBJ.PersonalStatus} onChange={this.chgStatus}>
            <Select.Option value="בחר">בחר</Select.Option>
            <Select.Option value="רווק/ה">רווק/ה</Select.Option>
            <Select.Option value="נשוי/ה">נשוי/ה</Select.Option>
            <Select.Option value="ידוע/ה בציבור">ידוע/ה בציבור</Select.Option>
          </Select>
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

        <div className='rowC' style={{marginTop:'2vh',marginBottom:'2.5vh'}}>
<Button variant="contained"
        color="default"
        style={{marginRight:20,fontFamily: "Segoe UI"}}
        onClick={(e) => {
          this.props.history.push("/editHobbies")
        }}><i class="bi bi-pencil-fill" style={{marginRight:8}}></i>תחביבים</Button>

<Button variant="contained"
        color="default"
        style={{fontFamily: "Segoe UI"}}
        onClick={() => { this.props.history.push("/editHangouts") }}>
        <i class="bi bi-pencil-fill" style={{marginRight:8}}></i>מקומות בילוי</Button>
        </div>

        <div>
          <Button variant="contained"
            style={{ paddingTop: 0, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
            onClick={this.btnSave}> שמור </Button>
        </div>
      </div>


    )
  }
}

export default withRouter(CCeditp)
