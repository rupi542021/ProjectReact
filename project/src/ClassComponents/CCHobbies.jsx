import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation'

const HobbyArr = []

class CCHobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbiesArr: HobbyArr

    }
  }
  componentDidMount() {
    this.apiUrl='https://localhost:44325/api/students/GetAllHoddies';
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
            result.forEach(hobby => {
              console.log(hobby.Hname);
              let h={Code:hobby.Hcode,Name:hobby.Hname,Image:hobby.Hicon,Choose:false}
              HobbyArr.push(h);
            });
            console.log(HobbyArr);
            this.setState({hobbiesArr: HobbyArr});
  }
      )}
  getData=(ID)=> {
    HobbyArr[ID].Choose = !HobbyArr[ID].Choose;
    this.setState({hobbiesArr: HobbyArr});
    console.log(HobbyArr)
  }
  
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        
        <Progress percent={100} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15} 
        style={{width:300, marginTop: 10,transform:`rotate(180deg)`}}/>
       
        <div style={{ direction: 'rtl' }}>
          <h4 style={{ marginTop: 10, marginBottom: 8, direction: 'rtl', color: '#3D3D3D' }}>וממש עוד קצת...</h4>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>איך את/ה מבלה בזמנך הפנוי?</h3>
          <p style={{ color: '#3D3D3D', fontSize: 16 }}>בחר את כל הדברים שאת/ה אוהב/ת לעשות </p>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hobbiesArr.map((hobby, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} id={index} name={hobby.Name} image={hobby.Image} choose={hobby.Choose} sendData={this.getData} />

                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        
        >סיום</Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={()=>this.props.history.push("/hangout")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCHobbies)
