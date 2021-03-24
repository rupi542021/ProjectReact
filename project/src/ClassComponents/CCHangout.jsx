import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation'

class CCHangout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hangoutArr: [],

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
          let HangArr = [];
            console.log("fetch GetAllPleasures= ", result);
            let studHangouts = localStorage.getItem('student');
          studHangouts = JSON.parse(studHangouts);
          studHangouts = studHangouts.Plist;
          if (studHangouts!==null) {
            let studHangoutsNames = studHangouts.map(p => p.Pname);
            
          result.forEach(hangout => {
            if (studHangoutsNames.includes(hangout.Pname)) {
              let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:true}
              HangArr.push(p);
            }
            else {
              let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:false}
              HangArr.push(p);
            }
           
            });
          }

          else {
            result.forEach(hangout => {
              let p={Pcode:hangout.Pcode, Pname:hangout.Pname,Picon:hangout.Picon,Choose:false}
                HangArr.push(p);
              });
          }

            console.log(HangArr);
            this.setState({hangoutArr: HangArr});
  },
  (error) => {
         console.log("err post=", error);
       });
      }
      
  getData=(ID)=> {
    this.state.hangoutArr[ID].Choose = !this.state.hangoutArr[ID].Choose;
    this.setState({hangoutArr: this.state.hangoutArr});
    console.log(this.state.hangoutArr)
  }
  btnNext=()=>
  {
    let studOBJ=localStorage.getItem('student');
    studOBJ=JSON.parse(studOBJ);
    studOBJ.Plist = this.state.hangoutArr.filter(hang=>hang.Choose);
    if(studOBJ.Plist.length > 0)
    {
      let newPlist=[];
      let newHangout;
      studOBJ.Plist.forEach(hang => {newHangout ={Pcode: hang.Pcode, Pname: hang.Pname, Picon: hang.Picon};
        newPlist.push(newHangout);
      });
      studOBJ.Plist = newPlist;
      console.log("New Plist = " , studOBJ.Plist);
    }
    
    console.log(studOBJ);
    localStorage.setItem('student', JSON.stringify(studOBJ));
    this.props.history.push("/hobbies");
    
  }
  render() {
    return (
      <div>
                <div className='rowC' style={{ width: '100%', height: 60, backgroundColor: "#FAE8BE" }}>
          <img src="icons/high-five.png" style={{ width: 30, height: 30, marginBottom: 15, marginRight: 10 }}></img>
          <h4 style={{ color: "#3D3D3D" }}>Better Together</h4>
        </div>
        
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
                    <FCHangoutFrame key={index} id={index} name={hangout.Pname} image={hangout.Picon} choose={hangout.Choose} sendData={this.getData}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" 
        style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, 
        fontFamily: "Segoe UI",height:35 }}
        onClick={this.btnNext}>
        <i class="bi bi-arrow-left-short"
        style={{ color: '#3D3D3D', fontSize: 32}}></i>
        </Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
         fontFamily: "Segoe UI",height:35}}
        onClick={()=>this.props.history.push("/signin3")}
        > <i class="bi bi-arrow-right-short"
        style={{ paddingTop:0,color: '#3D3D3D', fontSize: 32}}></i>
        </Button>
      </div>
    )
  }
}
export default withRouter(CCHangout)
