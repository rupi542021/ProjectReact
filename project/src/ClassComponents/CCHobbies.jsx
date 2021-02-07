import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation'

class CCHobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbiesArr: []

    }
  }
  componentDidMount() {
    let hobby1 = { Name: "כדורסל", Image: 'icons/hobbies/basketball-hoop.png' }
    let hobby2 = { Name: "חדר כושר", Image: 'icons/hobbies/muscular-male-gymnast-exercising-with-two-dumbbells.png' }
    let hobby3 = { Name: "נטפליקס", Image: 'icons/hobbies/cinema.png' }
    let hobby4 = { Name: "גלישה", Image: 'icons/hobbies/surfing.png' }
    let hobby5 = { Name: "כדורגל", Image: 'icons/hobbies/football (1).png' }
    let hobby6 = { Name: "פריזבי", Image: 'icons/hobbies/frisbee (1).png' }
    let hobby7 = { Name: "קריאה", Image: 'icons/hobbies/reading.png' }
    let hobby8 = { Name: "טניס", Image: 'icons/hobbies/tennis-player-with-racket.png' }
    let hobby9 = { Name: "בישול", Image: 'icons/hobbies/cooking.png' }
    this.setState({ hobbiesArr: [hobby1, hobby2, hobby3, hobby4, hobby5, hobby6, hobby7, hobby8, hobby9] })

  }

  
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        
        <Progress percent={100} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15} 
        style={{width:300, marginTop: 10,transform:`rotate(180deg)`}}/>
       
        <div style={{ direction: 'rtl' }}>
          <h4 style={{ marginTop: 10, marginBottom: 8, direction: 'rtl', color: '#3D3D3D' }}>בוא/י נכיר אותך קצת...</h4>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>איפה את/ה אוהב/ת לבלות?</h3>
          <p style={{ color: '#3D3D3D', fontSize: 16 }}>בחר את כל המקומות שאת/ה אוהב/ת להיות בהם</p>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hobbiesArr.map((hobby, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} name={hobby.Name} image={hobby.Image} />

                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        
        >הבא</Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={()=>this.props.history.push("/hangout")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCHobbies)
