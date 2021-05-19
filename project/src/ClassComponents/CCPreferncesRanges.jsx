import React, { Component } from 'react'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import swal from 'sweetalert';
import PrettoSlider from '../FunctionalComponents/PrettoSlider1';
import PrettoSlider2 from '../FunctionalComponents/PrettoSlider2';

class CCPreferncesRanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studOBJ: JSON.parse(localStorage.getItem('student')),
      // distance1: 15,
      // distance2: 15,
      // ageRange:3
    }
  }

  btnNext2Confirm = () => {
        this.handleSwal();
      }

  handleSwal = () => {
    swal({
      title: "השינויים שביצעת יישמרו",
      icon: "warning",
      buttons: true,
    })
      .then((willSave) => {
        if (willSave) {
          //לעדכן בשרת
        }
      });
  }

  UpdatePasswordInDB = (stud, pass) => {
    console.log("in UpdatePasswordInDB ", stud, pass);
    // let apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/'+ pass +'/updateUserPassword';
    let apiUrl = 'https://localhost:44366/API/students/' + pass + '/updateUserPassword';
    fetch(apiUrl,
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
          console.log('UpdatePreferencesInDB succeeded');
          this.state.studOBJ.Password = pass;
          localStorage.setItem('student', JSON.stringify(this.state.studOBJ));
          console.log("this.state.studOBJ", this.state.studOBJ);
          swal(":) הסיסמה עודכנה בהצלחה", {
            icon: "success",
          }).then(() => { this.props.history.push("/Settings"); }
          );
        }
        else {
          Swal.fire({
            text: ":( אופס.. משהו השתבש",
            icon: 'error',
            iconHtml: '',
            confirmButtonText: 'סגור',
            showCloseButton: true
          })
        }
        //return res.json();
      })
  }

  handleSliderChange = (event, newValue) => {
    // console.log("event", event);
    //console.log("newValue", newValue);
    this.setState({ distance1: newValue });

    //setValue(newValue);
  };

  getDist1 = (dist1) => {
    this.setState({ distance1: dist1 }, () => { console.log("distance1", this.state.distance1) });
  }

  getDist2 = (dist2) => {
    this.setState({ distance2: dist2 }, () => { console.log("distance2", this.state.distance2) });
  }

  handleNumberInput = (e) =>{
    console.log("number input: ", e.target.value);
    this.setState({ageRange: e.target.value})
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: '7vw', position: 'absolute', right: 0 }}
          onClick={() => this.props.history.push('/Settings')}></i>
        <div>
          <div>
          <h5 style={{ marginTop: '10vh', fontWeight: 500,fontSize:'5vw' }}>מקום מגורים נוכחי</h5>
          <PrettoSlider distance1={this.state.studOBJ.HomeDist} sendVal2Parent={this.getDist1} />          
        </div>
        <div>
          <h5 style={{ marginTop: '2vh', fontWeight: 500,fontSize:'5vw' }}>מקום מגורים קבע</h5>
          <PrettoSlider2 distance2={this.state.studOBJ.StudyingDist} sendVal2Parent2={this.getDist2} />
        </div>
        <div>
          <h5 style={{ marginTop: '2vh',fontWeight: 500,fontSize:'5vw' }}>טווח גילאים</h5>
          <TextField
          label="הכנס מספר"
          type="number"
          variant="outlined"
          onChange={this.handleNumberInput}
          defaultValue={this.state.studOBJ.AgesRange}
        />
        </div>
        <Button variant="contained"
          style={{
            paddingTop: 0, marginRight: 10, marginTop: '10vh', backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
            fontFamily: "Segoe UI", height: 35
          }}
          onClick={this.btnNext2Confirm}>
          <i class="bi bi-check2"
            style={{ color: '#3D3D3D', fontSize: 32 }}></i>
        </Button>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCPreferncesRanges);
