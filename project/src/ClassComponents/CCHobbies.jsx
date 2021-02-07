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
    let hobby1 = { Name: "מסעדות", Image: 'icons/hangout/cooking.png' }
    let hobby2 = { Name: "פאבים", Image: 'icons/hangout/cheers.png' }
    let hobby3 = { Name: "שופינג", Image: 'icons/hangout/shopping-bag.png' }
    let hobby4 = { Name: "טבע", Image: 'icons/hangout/trees.png' }
    let hobby5 = { Name: "חוף-ים", Image: 'icons/hangout/sunset (1).png' }
    let hobby6 = { Name: "מסיבות", Image: 'icons/hangout/dance.png' }
    let hobby7 = { Name: "חדרי בריחה", Image: 'icons/hangout/server.png' }
    let hobby8 = { Name: "בריכה", Image: 'icons/hangout/swimming-pool.png' }
    let hobby9 = { Name: "קולנוע", Image: 'icons/hangout/popcorn.png' }
    this.setState({ hobbiesArr: [hobby1, hobby2, hobby3, hobby4, hobby5, hobby6, hobby7, hobby8, hobby9] })

  }

  
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        
        <Progress percent={66} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15} 
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
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCHobbies)
