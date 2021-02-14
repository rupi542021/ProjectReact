import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation'

const HangArr = [];
class CCHangout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hangoutArr: HangArr,

    }
  }
  componentDidMount() {
    this.apiUrl='https://localhost:44325/api/students/GetAllPleasures';
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
            console.log("fetch GetAllPleasures= ", result);
            result.forEach(hangout => {
              console.log(hangout.Pname);
              let h={Code:hangout.Pcode, Name:hangout.Pname,Image:hangout.Picon,Choose:false}
              HangArr.push(h);
            });
            console.log(HangArr);
            this.setState({hangoutArr: HangArr});
  }
      )}
  getData=(ID)=> {
    HangArr[ID].Choose = !HangArr[ID].Choose;
    this.setState({hangoutArr: HangArr});
    console.log(HangArr)
  }
  btnNext=()=>
  {
    let studOBJ=localStorage.getItem('student');
    studOBJ=JSON.parse(studOBJ);
    studOBJ.Plist = this.state.hangoutArr.filter(hang=>hang.Choose);
    console.log(studOBJ);
    localStorage.setItem('student', JSON.stringify(studOBJ));
    this.props.history.push("/hobbies");
    
  }
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        
        <Progress percent={66} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15} 
        style={{width:300, marginTop: 10,transform:`rotate(180deg)`}}/>
       
        <div style={{ direction: 'rtl' }}>
          <h4 style={{ marginTop: 10, marginBottom: 8, direction: 'rtl', color: '#3D3D3D' }}>בוא/י נכיר אותך קצת...</h4>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>איפה את/ה אוהב/ת לבלות?</h3>
          <p style={{ color: '#3D3D3D', fontSize: 16 }}>בחר את כל המקומות שאת/ה אוהב/ת להיות בהם</p>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hangoutArr.map((hangout, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} id={index} name={hangout.Name} image={hangout.Image} choose={hangout.Choose} sendData={this.getData}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" 
        style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={this.btnNext}
        >הבא</Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={()=>this.props.history.push("/signin3")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCHangout)
