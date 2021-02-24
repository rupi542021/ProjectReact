import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import ReactRoundedImage from "react-rounded-image";
import { Form, Select } from 'antd';
import Button from '@material-ui/core/Button';
import 'antd/dist/antd.css';
import '../style.css';
import CitiesFile from '../CitiesFile';
import Switch from "react-switch";
import FormItem from 'antd/lib/form/FormItem';



const citiesList = CitiesFile;

class CCeditp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      studOBJ: {},
      switchChecked: true
    }
  }

  componentDidMount = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    this.setState({ studOBJ: studOBJ, switchChecked: studOBJ.IntrestedInCarPool });
    console.log("studOBJ", studOBJ);
  }

  btnFile = (event) => {
    console.log(event.target.files[0]);

    if (event.target.value.length > 0) {
      this.state.studOBJ.Photo = event.target.files[0].name
    }

    else {
      this.state.studOBJ.Photo = null;
    }

  }

  chgCity = (city) => {
    this.state.studOBJ.HomeTown = city;
  }

  chgCurrentCity = (city) => {
    this.state.studOBJ.AddressStudying = city;
  }

  chgStatus = (status) => {
    this.state.studOBJ.PersonalStatus = status;
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
    let updatedProfile = this.state.studOBJ;
    updatedProfile = JSON.stringify(updatedProfile);
    localStorage.setItem('student', updatedProfile);
    console.log("updated profile: ", updatedProfile);
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <h4 style={{ marginTop: 5, direction: 'rtl', color: '#3D3D3D' }}> עריכת פרופיל </h4>
        <Form className='container'>
          <FormItem>
            <ReactRoundedImage
              image={this.state.studOBJ !== {} ? this.state.studOBJ.Photo : ''}
              roundedColor="#96a2aa"
              imageWidth="80"
              imageHeight="80"
              roundedSize="15"

            />
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={this.btnFile}
              ref={fileInput => this.fileInput = fileInput} />
            <p onClick={() => this.fileInput.click()}> החלף תמונת פרופיל </p>

            <p className='labels'> עיר קבע </p>
            <Select style={{ width: 200 }} placeholder={this.state.studOBJ.HomeTown}
              onChange={this.chgCity}
            >
              <Select.Option value="choose"> בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city} value={city}>{city}</Select.Option>
              ))}
            </Select>

            <p className='labels'> מקום מגורים נוכחי </p>
            <Select style={{ width: 200 }} placeholder={this.state.studOBJ.AddressStudying}
              onChange={this.chgCurrentCity}
            >
              <Select.Option value="choose"> בחר עיר</Select.Option>
              {citiesList.map((city) => (
                <Select.Option key={city} value={city}> {city} </Select.Option>
              ))}
            </Select>

            <p className='labels'> סטטוס </p>
            <Select style={{ width: 200 }} placeholder={this.state.studOBJ.PersonalStatus} onChange={this.chgStatus}>
              <Select.Option value="בחר">בחר</Select.Option>
              <Select.Option value="רווק/ה">רווק/ה</Select.Option>
              <Select.Option value="נשוי/ה">נשוי/ה</Select.Option>
              <Select.Option value="ידוע/ה בציבור">ידוע/ה בציבור</Select.Option>
              <Select.Option value="אלמן/ה">אלמן/ה</Select.Option>
            </Select>

            <p className='labels'> מעוניין בנסיעות משותפות </p>
            <Switch onChange={this.chgSwitchCarpool} checked={this.state.switchChecked} />
          </FormItem>
          <div>
            <hr
              style={{
                color: 'black',
                backgroundColor: 'black',
                height: 0.5,
              }}
            />
            <p style={{ color: '#1b84fb', fontWeight: 'bolder' }} onClick={() => { this.props.history.push("/hobbies") }}> עריכת תחביבים </p>
            <hr
              style={{
                color: 'black',
                backgroundColor: 'black',
                height: 0.5,
              }}
            />
          </div>
          <div>
            <p style={{ color: '#1b84fb', fontWeight: 'bolder' }} onClick={() => { this.props.history.push("/hangout") }}> עריכת מקומות בילוי </p>
            <hr
              style={{
                color: 'black',
                backgroundColor: 'black',
                height: 0.5,
              }}
            />
          </div>
          <FormItem>
            <Button variant="contained"
              style={{ paddingTop: 0, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
              onClick={this.btnSave}> שמור </Button>
          </FormItem>
        </Form>

      </div>
    )
  }
}

export default withRouter(CCeditp)
