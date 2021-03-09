import React, { Component, StyleSheet } from 'react';
import { Form, Radio, Select, DatePicker, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import CitiesFile from '../CitiesFile';
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

const citiesList = [];

class CCSignin3 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gender: "",
      // birthDate: "",
      city: "",
      currentCity: "",
      status: "",
      intrestedInCarPool: "",
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
      no_CBX: false
    }
  }

  componentDidMount() {
    this.apiUrl='https://localhost:44325/api/students/GetAllResidences';
    console.log('GETstart');
    fetch(this.apiUrl,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then((res)=>{
        return res.json();
      })
      .then(
        (result) => {

            console.log("fetch GetAllResidences= ", result);
            
            result.forEach(s => {
              if(s.Name!=""){
                let city={Name:s.Name,Id:s.Id,X:s.X,Y:s.Y}
                citiesList.push(city);
              }
              
          });

  }
      )}

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

  chgCity = (city) => {
    console.log("city:", city)
    let CityD=citiesList.find(s=>s.Name=city)
    this.setState({ city: CityD }, () => {
      //let input = {};
      this.state.input["city"] = this.state.city;
    });
    console.log("CurrentCity111:", this.state.currentCity);
  }

  chgCurrentCity = (currentCity) => {
    console.log("CurrentCity:", currentCity);
    let currentCityD=citiesList.find(s=>s.Name=currentCity)
    console.log("CurrentCityhhh:", currentCityD);
    this.setState({ currentCity: currentCityD }, () => {
      //let input = {};
      this.state.input["currentCity"] = this.state.currentCity;
    })

   
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
      this.setState({intrestedInCarPool:this.setIntrestedInCarPool()},
      () => {
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

      
      
      //studOBJ.HomeTown=h

      studOBJ.AddressStudying = this.state.currentCity;
      studOBJ.PersonalStatus = this.state.status;
      studOBJ.Photo = this.state.selectedFile;
      studOBJ.IntrestedInCarPool = this.state.intrestedInCarPool;
      console.log("student details: ", studOBJ);
      localStorage.setItem('student', JSON.stringify(studOBJ));
      this.props.history.push("/hangout");
    });
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
    if (input["city"] === "" || input["city"] === "choose") {
      isValid = false;
      errors["city"] = "שדה זה הינו חובה";
    }
    if (input["currentCity"] === "" || input["currentCity"] === "choose") {
      isValid = false;
      errors["currentCity"] = "שדה זה הינו חובה";
    }
    if (this.state.yes_CBX === this.state.no_CBX && this.state.yes_CBX === true) {
      isValid = false;
      errors["intrestedInCarPool"] = "יש לבחור רק אפשרות אחת"
    }
    this.setState({ errors: errors });
    console.log("errors", errors)
    return isValid;
  }

  setIntrestedInCarPool = () => {
    if (this.state.yes_CBX === true) {
    return true
    }
    else if (this.state.no_CBX === true) {
     return false
    }
    return "";   
  }

  btnFile = (event) => {
    console.log(event.target.files[0]);

    if (event.target.value.length > 0) {
      this.setState({ selectedFile: event.target.files[0].name });
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
          <Form.Item >
            <p className='labels' >התמונה שלי  </p>
            <div className='rowC'>
              {this.state.selectedFile !== null ? <ReactRoundedImage
                image={this.state.selectedFile}
                roundedColor="#96a2aa"
                imageWidth="80"
                imageHeight="80"
                roundedSize="15"

              /> :
                <AddAPhotoIcon style={{ fontSize: 40, color: "#3D3D3D", marginLeft: 20 }}></AddAPhotoIcon>}

              <input
                type="file"
                style={{ display: 'none' }}
                onChange={this.btnFile}
                ref={fileInput => this.fileInput = fileInput} />
              <Button variant="contained"
                style={{ height: 30, backgroundColor: "#FAE8BE", fontSize: 11, borderRadius: 20, fontFamily: "Segoe UI" }}
                onClick={() => this.fileInput.click()}> בחירת תמונה</Button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className='rowC'>
              <p className='labels'> מגדר </p>
              <Radio.Group onChange={this.chgGender}>
                <Radio value="female">אישה</Radio>
                <Radio value="male">גבר</Radio>
                <Radio value="other">אחר</Radio>
              </Radio.Group>
            </div>
          </Form.Item>
          {/* 
          <Form.Item>
          <p className='labels'>תאריך לידה </p>
            <DatePicker required placeholder="בחר תאריך" onChange={this.chgBirthDate}
              onFocus={() => { this.setState({ errors: {} }) }} />
            <div style={{ color: "#de0d1b" }}>{this.state.errors.birthDate}</div>
          </Form.Item> */}

          <Form.Item required>
            <p className='labels'> עיר קבע </p>
            <Select style={{ width: 200 }} placeholder="בחר עיר"
              onChange={this.chgCity}
              onFocus={() => { this.setState({ errors: {} }) }}
            >
              <Select.Option value="choose"> בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city.Id} value={city.Name}>{city.Name}</Select.Option>
              ))}
            </Select>
            <div style={{ color: "#de0d1b" }}>{this.state.errors.city}</div>
          </Form.Item>

          <Form.Item required>
            <p className='labels'> מקום מגורים נוכחי </p>
            <Select style={{ width: 200 }} placeholder="בחר עיר"
              onChange={this.chgCurrentCity}
              onFocus={() => { this.setState({ errors: {} }) }}

            >
              <Select.Option value="choose"> בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city.Id} value={city.Name}> {city.Name} </Select.Option>
              ))}
            </Select>
            <div style={{ color: "#de0d1b" }}>{this.state.errors.currentCity}</div>
          </Form.Item>

          <Form.Item>
            <p className='labels'> סטטוס </p>
            <Select style={{ width: 200 }} placeholder="בחר" onChange={this.chgStatus}>
              <Select.Option value="בחר">בחר</Select.Option>
              <Select.Option value="רווק/ה">רווק/ה</Select.Option>
              <Select.Option value="נשוי/ה">נשוי/ה</Select.Option>
              <Select.Option value="ידוע/ה בציבור">ידוע/ה בציבור</Select.Option>
              <Select.Option value="אלמן/ה">אלמן/ה</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
          <p className='labels'> מעוניין בנסיעות משותפות </p>
            <Checkbox onChange={this.chgYesCarpoolCBX}> כן </Checkbox>
            <Checkbox onChange={this.chgNoCarpoolCBX}> לא </Checkbox>
            <div style={{ color: "#de0d1b" }}>{this.state.errors.intrestedInCarPool}</div>
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

