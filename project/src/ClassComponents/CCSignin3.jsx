import React, { Component, StyleSheet } from 'react';
import { Form, Radio, Select, DatePicker, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Button from '@material-ui/core/Button';
import { Circle } from 'react-shapes';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { Progress } from 'antd';
import ReactRoundedImage from "react-rounded-image";
import { withRouter } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';
import Rotation from 'react-rotation';
import '../style.css';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { IconButton } from '@material-ui/core';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { SplitButton } from 'react-bootstrap';
import Switch from "react-switch";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import '../style.css';




const citiesList = [];

class CCSignin3 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gender: "",
      // birthDate: "",
      city: null,
      currentCity: null,
      status: "",
      // intrestedInCarPool: "",
      switchChecked: false,
      comeWithCar: false,
      input: {
        // gender: "",
        // birthDate: "",
        city: "",
        currentCity: "",
        status: "",
      },
      errors: {},
      selectedFile: null,
      yes_CBX: false,
      no_CBX: false,
      imgURL: null,
      val: ''
    }
  }

  componentDidMount = () => {
    this.apiUrl = 'https://localhost:44325/api/students/GetAllResidences';
    console.log('GETstart');
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
            if (s.Name != "") {
              let city = { Name: s.Name, Id: s.Id, X: s.X, Y: s.Y }
              citiesList.push(city);
            }

          });

        }
      )
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    if (studOBJ.HomeTown != null) {
      this.setState({ currentCity: studOBJ.AddressStudying, city: studOBJ.HomeTown })
    }

  }

  chgGender = (e) => {
    let g = e.target.value;
    this.setState({ gender: g }, () => {
      //let input = {};
      console.log("gender:", this.state.gender);
      //this.state.input["gender"] = this.state.gender;
    });
  }

  // chgBirthDate = (date) => {
  //   if (date !== "" && date !== null) {
  //     let bdate = date.format("DD-MM-YYYY")
  //     console.log("bday:", bdate);
  //     this.setState({ birthDate: bdate }, () => {
  //       //let input = {};
  //       this.state.input["birthDate"] = this.state.birthDate;
  //     })
  //   }
  //   else {
  //     this.setState({ birthDate: "" }, () => {
  //       //let input = {};
  //       this.state.input["birthDate"] = this.state.birthDate;
  //     })
  //   }
  // }

  chgCity = (event) => {
    console.log("city:", event.target.innerText);
    this.setState({city:event.target.innerText}, () => {
    this.state.input["city"] = this.state.city;
    })
    // if (city != "choose") {
    //   let CityD = citiesList.find(s => s.Name == city)
    //   console.log("city found:", CityD)
    //   this.setState({ city: CityD }, () => {
    //     //let input = {};
    //     this.state.input["city"] = this.state.city.Name;
    //   });
    // }
    // else {
    //   this.setState({ city: null })
    //   this.state.input["city"] = "";
    // }

  }

  chgCurrentCity = (event) => {
    console.log("CurrentCity:", event.target.innerText);
    this.setState({currentCity:event.target.innerText},() => {
      this.state.input["currentCity"] = this.state.currentCity;
    })
    // if (currentCity != "choose") {
    //   let currentCityD = citiesList.find(s => s.Name == currentCity)
    //   console.log("CurrentCityhhh:", currentCityD);
    //   this.setState({ currentCity: currentCityD }, () => {
    //     //let input = {};
    //     this.state.input["currentCity"] = this.state.currentCity.Name;
    //   })

    // }
    // else {
    //   this.setState({ currentCity: null })
    //   this.state.input["currentCity"] = ""
    // }
  }

  chgStatus = (status) => {
    if (status !== "choose") {
      console.log("status:", status);
      this.setState({ status: status });
    }
    //let input = {};
    this.state.input["status"] = this.state.status;
  }

  btnNext = () => {
    if (this.validate()) {

      let input = {};
      // this.setState({ intrestedInCarPool: this.setIntrestedInCarPool() },
      // () => {
      // input["gender"] = "";
      //  input["birthDate"] = "";
      input["city"] = "";
      input["currentCity"] = "";
      input["status"] = "";
      this.setState({ input: input });
      let studOBJ = localStorage.getItem('student');
      studOBJ = JSON.parse(studOBJ);
      studOBJ.Gender = this.state.gender;
      studOBJ.HomeTown = this.state.city;
      studOBJ.AddressStudying = this.state.currentCity;
      studOBJ.PersonalStatus = this.state.status;
      studOBJ.Photo = this.state.selectedFile;
      studOBJ.PhotoURL = this.state.selectedFile;
      studOBJ.IsAvailableCar = this.state.comeWithCar;
      studOBJ.IntrestedInCarPool = this.state.switchChecked;
      console.log("student details: ", studOBJ);
      localStorage.setItem('student', JSON.stringify(studOBJ));
      this.props.history.push("/hangout");
      // });
    }
  }


  validate = () => {
    let input = this.state.input;
    console.log("input validate:", input)
    let errors = {};
    let isValid = true;

    // if (input["birthDate"] === "") {
    //   isValid = false;
    //   errors["birthDate"] = "שדה זה הינו חובה";
    // }
    // if (input["city"] === "" || input["city"] === "choose") {
    //   isValid = false;
    //   errors["city"] = "שדה זה הינו חובה";
    // }
    // if (input["currentCity"] === "" || input["currentCity"] === "choose") {
    //   isValid = false;
    //   errors["currentCity"] = "שדה זה הינו חובה";
    // }
    // if (this.state.yes_CBX === this.state.no_CBX && this.state.yes_CBX === true) {
    //   isValid = false;
    //   errors["intrestedInCarPool"] = "יש לבחור רק אפשרות אחת"
    // }
    if (input["city"] === "" || input["city"] === undefined) {
      isValid = false;
      errors["city"] = "שדה זה הינו חובה";
    }
    if (input["currentCity"] === "" || input["currentCity"] === undefined) {
      isValid = false;
      errors["currentCity"] = "שדה זה הינו חובה";
    }
    this.setState({ errors: errors });
    console.log("errors", errors)
    return isValid;
  }

  chgSwitchWithCar = (checked) => {
    console.log("switch with car checked: ", checked);
    this.setState({ comeWithCar: checked });
  }

  chgSwitchCarpool = (checked) => {
    console.log("switch checked: ", checked)
    this.setState({ switchChecked: checked });
  }
  // setIntrestedInCarPool = () => {
  //   if (this.state.yes_CBX === true) {
  //     return true
  //   }
  //   else if (this.state.no_CBX === true) {
  //     return false
  //   }
  //   return "";
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
            let imgNameInServer = result.split('\\').pop();
            console.log(imgNameInServer);
            this.setState({ urlimg: result, selectedFile: imgNameInServer })

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

  chgYesCarpoolCBX = () => {
    this.setState({
      yes_CBX: !this.state.yes_CBX
    }, () => {
      console.log("yes checkbox:", this.state.yes_CBX);
    }
    );
    this.setState({ errors: {} });
  }

  chgNoCarpoolCBX = () => {
    this.setState({
      no_CBX: !this.state.no_CBX
    }, () => {
      console.log("no checkbox:", this.state.no_CBX);
    }
    );
    this.setState({ errors: {} });
  }




  render() {

    return (
      <div>
        <PrimarySearchAppBar />
        <div>
          <Progress percent={33} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15}
            style={{ width: 300, marginTop: 10, transform: `rotate(180deg)` }} />
          <h4 style={{ marginTop: 5, direction: 'rtl', color: '#3D3D3D' }}>יצירת פרופיל חדש!</h4>
          <Form style={{ direction: 'rtl' }}>
            <Form.Item style={{ marginBottom: 8, width: '100%' }}>
              <p className='labels' >התמונה שלי  </p>
              <div className='rowC'>
                {/* <img src={this.state.imgURL} alt="Logo" /> */}
                {this.state.imgURL !== null ? <ReactRoundedImage
                  image={this.state.imgURL}

                  roundedColor="#96a2aa"
                  imageWidth="80"
                  imageHeight="80"
                  roundedSize="15"

                /> :
                  <div>
                    <input
                      accept="image/*"

                      id="icon-button-file"
                      type="file"
                      capture="environment"
                      hidden
                      onChange={this.btnFile} ref={fileInput => this.fileInput = fileInput}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddAPhotoIcon style={{ fontSize: 40, color: "#3D3D3D", marginLeft: 20 }} />

                      </IconButton>
                    </label></div>}


                {/* // <input
              //   type="file"
              //   style={{ display: 'none' }}
              //   onChange={this.btnFile}
              //   ref={fileInput => this.fileInput = fileInput} /> */}
                {/* <Button variant="contained"
                style={{ height: 30, backgroundColor: "#FAE8BE", fontSize: 11, borderRadius: 20, fontFamily: "Segoe UI" }}
                onClick={() => this.fileInput.click()}> בחירת תמונה</Button> */}
              </div>
            </Form.Item>
            <Form.Item style={{ marginBottom: 30, width: '100%' }}>
              {/* <div className='rowC'> */}
              <p className='labels' style={{ marginBottom: 10 }}> מגדר </p>
              <Radio.Group onChange={this.chgGender}>
                <Radio value="female"><span className='genderRB'>אישה</span></Radio>
                <Radio value="male"><span className='genderRB'>גבר</span></Radio>
                <Radio value="other"><span className='genderRB'>אחר</span></Radio>
              </Radio.Group>
              {/* </div> */}
            </Form.Item>
            {/* 
          <Form.Item>
          <p className='labels'>תאריך לידה </p>
            <DatePicker required placeholder="בחר תאריך" onChange={this.chgBirthDate}
              onFocus={() => { this.setState({ errors: {} }) }} />
            <div style={{ color: "#de0d1b" }}>{this.state.errors.birthDate}</div>
          </Form.Item> */}

            <Form.Item required style={{ marginBottom: 30 }}>
              <p className='labels' style={{ marginBottom: 10 }}> עיר קבע </p>
              <Autocomplete
                options={citiesList}
                getOptionLabel={(city) => city.Name}
                style={{ width: '50vw', margin: '0px auto' }}
                renderInput={(params) => <TextField {...params} label="בחר עיר" variant="outlined" />}
                size='small'
               // value={this.state.city}
                onChange={this.chgCity}
                onFocus={() => { this.setState({ errors: {} }) }}
              />
              {/* <Select style={{ width: 200 }} placeholder="בחר עיר"
                onChange={this.chgCity}
                onFocus={() => { this.setState({ errors: {} }) }}
                value={this.state.city!=null?this.state.city.Name:"choose"}
              >
                <Select.Option value="choose"> בחר עיר</Select.Option>
                {citiesList.map((city) => (
                  <Select.Option key={city.Id} value={city.Name}>{city.Name}</Select.Option>
                ))}
              </Select> */}

              <div style={{ color: "#de0d1b" }}>{this.state.errors.city}</div>
            </Form.Item>

            <Form.Item required style={{ marginBottom: 30 }}>
              <p className='labels' style={{ marginBottom: 10 }}> מקום מגורים נוכחי </p>
              <Autocomplete
                options={citiesList}
                getOptionLabel={(city) => city.Name}
                style={{ width: '50vw', margin: '0px auto' }}
                renderInput={(params) => <TextField {...params} label="בחר עיר" variant="outlined" />}
                size='small'
                onChange={this.chgCurrentCity}
                onFocus={() => { this.setState({ errors: {} }) }}
              />
              {/* <Select style={{ width: 200 }} placeholder="בחר עיר"
                onChange={this.chgCurrentCity}
                onFocus={() => { this.setState({ errors: {} }) }}
                value={this.state.currentCity!=null?this.state.currentCity.Name:"choose"}
              >
                <Select.Option value="choose"> בחר עיר</Select.Option>
                {citiesList.map((city) => (
                  <Select.Option key={city.Id} value={city.Name}> {city.Name} </Select.Option>
                ))}
              </Select> */}
              <div style={{ color: "#de0d1b" }}>{this.state.errors.currentCity}</div>
            </Form.Item>

            <Form.Item style={{ marginBottom: 12 }}>
              <p className='labels'> סטטוס </p>
              <Select style={{ width: 200 }} placeholder="בחר" onChange={this.chgStatus}>
                <Select.Option value="בחר">בחר</Select.Option>
                <Select.Option value="רווק/ה">רווק/ה</Select.Option>
                <Select.Option value="נשוי/ה">נשוי/ה</Select.Option>
                <Select.Option value="ידוע/ה בציבור">ידוע/ה בציבור</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              {/* <p className='labels'> מעוניין בנסיעות משותפות </p>
              <Checkbox onChange={this.chgYesCarpoolCBX}> כן </Checkbox>
              <Checkbox onChange={this.chgNoCarpoolCBX}> לא </Checkbox>
              <div style={{ color: "#de0d1b" }}>{this.state.errors.intrestedInCarPool}</div> */}
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
            </Form.Item>
            <Form.Item>
              <Button variant="contained"
                style={{ paddingTop: 0, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
                onClick={this.btnNext}> הבא </Button>
            </Form.Item>
          </Form>
        </div >
      </div>

    )
  }
}

export default withRouter(CCSignin3);

