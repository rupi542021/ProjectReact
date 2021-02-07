import React, { Component } from 'react';
import { Form, Radio, Select, DatePicker, } from 'antd';
import 'antd/dist/antd.css';
import CitiesFile from '../CitiesFile';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Button from '@material-ui/core/Button';
import { Circle } from 'react-shapes';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { Progress } from 'antd';
import Rotation from 'react-rotation'


import { withRouter } from 'react-router-dom';
import FormItem from 'antd/lib/form/FormItem';
const citiesList = CitiesFile;

class CCSignin3 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      gender: "",
      birthDate: "",
      city: "",
      currentCity: "",
      status: "",
      input: {
        gender: "",
        birthDate: "",
        city: "",
        currentCity: "",
        status: "",
      },
      errors: {},
      selectedFile: null,
    }
  }

  chgGender = (e) => {
    let g = e.target.value;
    this.setState({ gender: g }, () => {
      //let input = {};
      this.state.input["gender"] = this.state.gender;
    });
  }

  chgBirthDate = (date) => {
    if (date !== "" && date !== null) {
      let bdate = date.format("DD-MM-YYYY")
      console.log("bday:", bdate);
      this.setState({ birthDate: bdate }, () => {
        //let input = {};
        this.state.input["birthDate"] = this.state.birthDate;
      })
    }
    else {
      this.setState({ birthDate: "" }, () => {
        //let input = {};
        this.state.input["birthDate"] = this.state.birthDate;
      })
    }
  }

  chgCity = (city) => {
    console.log("city:", city)
    this.setState({ city: city }, () => {
      //let input = {};
      this.state.input["city"] = this.state.city;
    });
  }

  chgCurrentCity = (currentCity) => {
    console.log("CurrentCity:", currentCity);
    this.setState({ currentCity: currentCity }, () => {
      //let input = {};
      this.state.input["currentCity"] = this.state.currentCity;
    });
  }

  chgStatus = (status) => {
    if (status !== "choose") {
      console.log("status:", status);
      this.setState({ status: status });
    }
    //let input = {};
    this.state.input["status"] = this.state.status;
  }

  btnNext = (e) => {
    if (this.validate()) {
      let input = {};
      input["gender"] = "";
      input["birthDate"] = "";
      input["city"] = "";
      input["currentCity"] = "";
      input["status"] = "";
      this.setState({ input: input });
      let studOBJ = {
        // name,email: get name and email from routing params or async storage
        gender: this.state.gender,
        birthDate: this.state.birthDate,
        city: this.state.city,
        currentCity: this.state.currentCity,
        status: this.state.status,
        profliePicture: this.state.selectedFile.name,
      }

      console.log("student details: ", studOBJ);

      // this.props.history.push({
      //   pathname: '/testing',
      //   state: { studOBJ: studOBJ }
      // });

    }
  }


  validate = () => {
    let input = this.state.input;
    console.log("input validate:", input)
    let errors = {};
    let isValid = true;

    if (input["birthDate"] === "") {
      isValid = false;
      errors["birthDate"] = "שדה זה הינו חובה";
    }
    if (input["city"] === "" || input["city"] === "choose") {
      isValid = false;
      errors["city"] = "שדה זה הינו חובה";
    }
    if (input["currentCity"] === "" || input["currentCity"] === "choose") {
      isValid = false;
      errors["currentCity"] = "שדה זה הינו חובה";
    }
    this.setState({ errors: errors });
    console.log("errors", errors)
    return isValid;
  }

  btnFile = (event) => {
    console.log(event.target.files[0]);

    if (event.target.value.length > 0) {
      this.setState({ selectedFile: event.target.files[0] })
    }

    else {
      this.setState({ selectedFile: null })
    }

  }



  render() {

    return (
      <div>
        <PrimarySearchAppBar />
        <Progress percent={33} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15} 
        style={{width:300, marginTop: 10,transform:`rotate(180deg)`}}/>
       <div  style={{ direction: 'rtl' }}>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 10,
          }}
style={{direction:'rtl'}}
        >
          <FormItem>
            <Circle r={40} fill={{ color: 'transparent' }} stroke={{ color: '#3D3D3D' }} strokeWidth={3} ></Circle>
            {this.state.selectedFile !== null ? <img src={this.state.selectedFile.name} /> : <CameraAltOutlinedIcon style={{ height: 30, width: 30 }} />}
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={this.btnFile}
              ref={fileInput => this.fileInput = fileInput} />
            <Button variant="contained"
              style={{ backgroundColor: "#FAE8BE", fontSize: 11, borderRadius: 20, fontFamily: "Segoe UI" }}
              onClick={() => this.fileInput.click()}> בחירת תמונה</Button>
          </FormItem>
          <Form.Item>
            <label style={{textAlign:'right', fontWeight:'bold'}}>מגדר: </label>
            <Radio.Group onChange={this.chgGender}>
              <Radio value="female">אישה</Radio>
              <Radio value="male">גבר</Radio>
              <Radio value="other">אחר</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="תאריך לידה" >
            <DatePicker required placeholder="בחר תאריך" onChange={this.chgBirthDate}
              onFocus={() => { this.setState({ errors: {} }) }} />
            <div style={{ color: "#FAE8BE" }}>{this.state.errors.birthDate}</div>
          </Form.Item>

          <Form.Item label="עיר קבע" required>
            <Select placeholder="בחר עיר"
              onChange={this.chgCity}
              onFocus={() => { this.setState({ errors: {} }) }}
            >
              <Select.Option value="choose">בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city} value={city}>{city}</Select.Option>
              ))}
            </Select>
            <div style={{ color: "#FAE8BE" }}>{this.state.errors.city}</div>
          </Form.Item>

          <Form.Item required label="מקום מגורים נוכחי">
            <Select placeholder="בחר עיר"
              onChange={this.chgCurrentCity}
              onFocus={() => { this.setState({ errors: {} }) }}
            >
              <Select.Option value="choose">בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city} value={city}> {city} </Select.Option>
              ))}
            </Select>
            <div style={{ color: "#FAE8BE" }}>{this.state.errors.currentCity}</div>
          </Form.Item>

          <Form.Item label="סטטוס">
            <Select placeholder="בחר" onChange={this.chgStatus}>
              <Select.Option value="choose">בחר</Select.Option>
              <Select.Option value="single">רווק/ה</Select.Option>
              <Select.Option value="married">נשוי/ה</Select.Option>
              <Select.Option value="inPublic">ידוע/ה בציבור</Select.Option>
              <Select.Option value="widow">אלמן/ה</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button variant="contained"
              style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
              onClick={this.btnNext}> הבא</Button>

          </Form.Item>
        </Form>
        </div>
      </div>

    )
  }
}

export default withRouter(CCSignin3);
