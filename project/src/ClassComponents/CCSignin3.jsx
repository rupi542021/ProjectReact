import React, { Component } from 'react';
import { Form, Button, Radio, Select, DatePicker, } from 'antd';
import 'antd/dist/antd.css';
import CitiesFile from '../CitiesFile';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';


import { withRouter } from 'react-router-dom';
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
      errors: {}
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
      let studOBJ = this.state;
      //img:..
      //name,email: get name and email from routing params or async storage
      // then route to the next page
      console.log("student details: ", studOBJ);
      this.props.history.push({
        pathname: '/testing',
        state: { studOBJ: studOBJ }
      });

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

  render() {

    return (
      <div>
<PrimarySearchAppBar/>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{ direction: 'rtl' }}
      >
        <Form.Item label="מגדר">
          <Radio.Group onChange={this.chgGender}>
            <Radio value="female">אישה</Radio>
            <Radio value="male">גבר</Radio>
            <Radio value="other">אחר</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="תאריך לידה" >
          <DatePicker required placeholder="בחר תאריך" onChange={this.chgBirthDate}
            onFocus={() => { this.setState({ errors: {} }) }} />
          <div className="text-danger">{this.state.errors.birthDate}</div>
        </Form.Item>

        <Form.Item label="עיר קבע" name="city" required>
          <Select placeholder="בחר עיר"
            onChange={this.chgCity}
            onFocus={() => { this.setState({ errors: {} }) }}
          >
            <Select.Option value="choose">בחר עיר</Select.Option>
            {citiesList.map((city) => (
              <Select.Option key={city} value={city}>{city}</Select.Option>
            ))}
          </Select>
          <div className="text-danger">{this.state.errors.city}</div>
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
          <div className="text-danger">{this.state.errors.currentCity}</div>
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
          <Button
            type='primary'
            shape='round'
            onClick={this.btnNext}> הבא </Button>
        </Form.Item>
      </Form>
      </div>

    )
  }
}

export default withRouter(CCSignin3);
