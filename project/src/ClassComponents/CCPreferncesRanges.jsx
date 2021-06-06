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

    }
  }

  componentDidMount = () => {
    console.log("this.state.ageRange before:", this.state.ageRange);
    let stud = JSON.parse(localStorage.getItem('student'));
    console.log("stud:", stud)
    this.setState({
      distance1: stud.HomeDist,
      distance2: stud.StudyingDist,
      ageRange: stud.AgesRange
    }, () => { console.log("this.state.ageRange after:", this.state.ageRange) });

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
          this.updateRangesInDB(this.state.studOBJ)
          //לעדכן בשרת
        }
      });
  }


  getDist1 = (dist1) => {
    console.log("dist1:", dist1);
    this.setState({ distance1: dist1 }, () => {
      console.log("this.state.distance1", this.state.distance1);
      localStorage.setItem('dist1', this.state.distance1);
    });
  }

  getDist2 = (dist2) => {
    console.log("dist2:", dist2);
    this.setState({ distance2: dist2 }, () => {
      console.log("this.state.distance2", this.state.distance2);
      localStorage.setItem('dist2', this.state.distance2);
    });
  }

  handleNumberInput = (e) => {
    console.log("number input: ", e.target.value);
    this.setState({ ageRange: e.target.value }, () => { localStorage.setItem('newAgeRange', this.state.ageRange); })
  }

  updateRangesInDB = (stud2Update) => {
    stud2Update.HomeDist = this.state.distance1;
    stud2Update.StudyingDist = this.state.distance2;
    stud2Update.AgesRange = this.state.ageRange;
    console.log("stud2Update:", stud2Update);
     let apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/updateUserPrefRanges';
   // let apiUrl = 'https://localhost:44366/API/students/updateUserPrefRanges';
    fetch(apiUrl,
      {
        method: 'Put',
        body: JSON.stringify(stud2Update),
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
          this.state.studOBJ = stud2Update;
          localStorage.setItem('student', JSON.stringify(stud2Update));
          console.log("this.state.studOBJ", this.state.studOBJ);
          swal(":) השינויים נשמרו בהצלחה", {
            icon: "success",
          }).then(() => {
            localStorage.removeItem('dist1');
            localStorage.removeItem('dist2');
            localStorage.removeItem('newAgeRange');
            this.props.history.push("/Settings");
          }
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

  goBack2PrevPage = () => {
    localStorage.removeItem('dist1');
    localStorage.removeItem('dist2');
    localStorage.removeItem('newAgeRange');
    this.props.history.push('/Settings');
  }

  handleResetBTN = () => {
    console.log("this.state.ageRange before reset:", this.state.ageRange)
    this.setState({
      distance1: this.state.studOBJ.HomeDist,
      distance2: this.state.studOBJ.StudyingDist,
      ageRange: this.state.studOBJ.AgesRange
    },()=>{console.log("this.state.ageRange after reset:", this.state.ageRange)})
    localStorage.removeItem('dist1');
    localStorage.removeItem('dist2');
    localStorage.removeItem('newAgeRange');
  }


  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: '7vw', position: 'absolute', right: '1vw' }}
          onClick={this.goBack2PrevPage}></i>
        <div>
          <div>
            <h5 style={{ marginTop: '10vh', fontWeight: 500, fontSize: '5vw' }}>מרחק ממקום מגורים נוכחי</h5>
            <PrettoSlider distance1={this.state.distance1} sendVal2Parent={this.getDist1} />
          </div>
          <div>
            <h5 style={{ marginTop: '2vh', fontWeight: 500, fontSize: '5vw' }}>מרחק ממקום מגורים קבע</h5>
            <PrettoSlider2 distance2={this.state.distance2} sendVal2Parent2={this.getDist2} />
          </div>
          <div>
            <h5 style={{ marginTop: '2vh', fontWeight: 500, fontSize: '5vw' }}>טווח גילאים</h5>
            <TextField
              label="הכנס מספר"
              type="number"
              variant="outlined"
              onChange={this.handleNumberInput}
              defaultValue={this.state.ageRange !== undefined ? this.state.ageRange : this.state.studOBJ.AgesRange}
            />
          </div>
          <div style={{marginTop:'20vh'}}>
          <Button variant="contained"
            style={{
              backgroundColor: "#FAE8BE", borderRadius: 20,
              fontFamily: "Segoe UI", height: '5vh', position:'absolute', left: '1vw'
            }}
            onClick={this.btnNext2Confirm}>
            <i class="bi bi-check2"
              style={{ color: '#3D3D3D', fontSize: '7vw' }}></i>
          </Button>
          <Button variant="contained" style={{
            backgroundColor: "#FAE8BE", fontSize: '4.5vw', borderRadius: 20,
            fontFamily: "Segoe UI", height: '5vh',position:'absolute', right: '1vw'
          }}
            onClick={this.handleResetBTN}
          > אפס
        {/* <i class="bi bi-arrow-right-short"
        style={{ paddingTop:0,color: '#3D3D3D', fontSize: 32}}></i> */}
          </Button>
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCPreferncesRanges);
