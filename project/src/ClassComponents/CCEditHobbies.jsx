import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation'


class CCEditHobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbiesArr: [],

    }
  }
  componentDidMount() {
    this.apiUrl = 'https://localhost:44325/api/students/GetAllHoddies';
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
          console.log("fetch GetAllHobbies= ", result);
          let AllHobbies = [];
          let studHobbies = localStorage.getItem('student');
          studHobbies = JSON.parse(studHobbies);
          studHobbies = studHobbies.Hlist;
          let studHobbiesNames = studHobbies.map(h => h.Hname);
          result.forEach(hobby => {
            if (studHobbiesNames.includes(hobby.Hname)) {
              let h = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon, Choose: true }
              AllHobbies.push(h);
            }
            else {
              let h = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon, Choose: false }
              AllHobbies.push(h);
            }
          });
          console.log('hobbiesArr: ', AllHobbies);
          this.setState({ hobbiesArr: AllHobbies });
        }
      )
  }
  getData = (ID) => {
    //HobbyArr[ID].Choose = !HobbyArr[ID].Choose;
    this.state.hobbiesArr[ID].Choose = !this.state.hobbiesArr[ID].Choose;
    this.setState({ hobbiesArr: this.state.hobbiesArr });
    //console.log(HobbyArr)
  }

  btnSave = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    studOBJ.Hlist = this.state.hobbiesArr.filter(hobby => hobby.Choose);
    if (studOBJ.Hlist.length > 0) {
      let newHlist = [];
      let newHobby;
      studOBJ.Hlist.forEach(hobby => {
        newHobby = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon };
        newHlist.push(newHobby);
      });
      studOBJ.Hlist = newHlist;
      console.log("New Hlist = ", studOBJ.Hlist);
    }

    localStorage.setItem('student', JSON.stringify(studOBJ));
    this.props.history.push("/editP");

  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />

        <div style={{ direction: 'rtl' }}>
          <h4 style={{ marginTop: 10, marginBottom: 8, direction: 'rtl', color: '#3D3D3D' }}> תחביבים </h4>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hobbiesArr.map((hobby, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} id={index} name={hobby.Hname} image={hobby.Hicon} choose={hobby.Choose} sendData={this.getData} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained"
          style={{ paddingTop: 0, marginRight: 10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
          onClick={this.btnSave}
        > שמור </Button>
        <Button variant="contained" style={{ paddingTop: 0, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
          onClick={() => this.props.history.push("/editP")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCEditHobbies)
