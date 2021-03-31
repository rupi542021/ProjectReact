import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import {  withRouter } from 'react-router-dom';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import { Progress } from 'antd';
// import Rotation from 'react-rotation'


class CCEditHangouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hangoutArr: [],
    }
  }
  componentDidMount() {
    this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/GetAllPleasures';
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
          console.log("fetch GetAllPleasures= ", result);
          let AllHangouts = [];
          let studHangouts = localStorage.getItem('student');
          studHangouts = JSON.parse(studHangouts);
          studHangouts = studHangouts.Plist;
          if (studHangouts !== null) {
            let studHangoutsNames = studHangouts.map(p => p.Pname);
            result.forEach(hangout => {
              if (studHangoutsNames.includes(hangout.Pname)) {
                let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:true}
                AllHangouts.push(p);
              }
              else {
                let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:false}
                AllHangouts.push(p);
              }
            });
          }
          else
          {
            result.forEach(hangout => {            
                let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:false}
                AllHangouts.push(p);             
            });
          }
         
          console.log('hangoutArr: ', AllHangouts);
          this.setState({ hangoutArr: AllHangouts });
        }
      )
  }
  getData = (ID) => {
   
    this.state.hangoutArr[ID].Choose = !this.state.hangoutArr[ID].Choose;
    this.setState({ hangoutArr: this.state.hangoutArr });
    console.log('hangoutArr: ', this.state.hangoutArr )
  }

  btnSave = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    studOBJ.Plist = this.state.hangoutArr.filter(hang => hang.Choose);
    if (studOBJ.Plist.length > 0) {
      let newPlist = [];
      let newHangout;
      studOBJ.Plist.forEach(hang => {
        newHangout ={Pcode: hang.Pcode, Pname: hang.Pname, Picon: hang.Picon};
        newPlist.push(newHangout);
      });
      studOBJ.Plist = newPlist;
      console.log("New Plist = ", studOBJ.Plist);
    }

    localStorage.setItem('student', JSON.stringify(studOBJ));
    this.props.history.push("/editP");

  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />

        <div style={{ direction: 'rtl' }}>
          <h3 style={{ marginTop: 40, marginBottom: 30, direction: 'rtl', color: '#3D3D3D' }}> עריכת מקומות בילוי </h3>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hangoutArr.map((hangout, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} id={index} name={hangout.Pname} image={hangout.Picon} choose={hangout.Choose} sendData={this.getData}/>
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
export default withRouter(CCEditHangouts)
