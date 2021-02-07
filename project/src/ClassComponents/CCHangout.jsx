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
      UserHangout:[],
      UserHangoutName:[]

    }
  }
  componentDidMount() {
    let hangout1 = { Name: "מסעדות", Image: 'icons/hangout/fork.png'}
    let hangout2 = { Name: "פאבים", Image: 'icons/hangout/cheers.png' }
    let hangout3 = { Name: "שופינג", Image: 'icons/hangout/shopping-bag.png' }
    let hangout4 = { Name: "טבע", Image: 'icons/hangout/trees.png' }
    let hangout5 = { Name: "חוף-ים", Image: 'icons/hangout/sunset (1).png' }
    let hangout6 = { Name: "מסיבות", Image: 'icons/hangout/dance.png'}
    let hangout7 = { Name: "חדרי בריחה", Image: 'icons/hangout/server.png'  }
    let hangout8 = { Name: "בריכה", Image: 'icons/hangout/swimming-pool.png' }
    let hangout9 = { Name: "קולנוע", Image: 'icons/hangout/popcorn.png' }
    this.setState({ hangoutArr: [hangout1, hangout2, hangout3, hangout4, hangout5, hangout6, hangout7, hangout8, hangout9] })

  }
  getData=(name,img)=> {
    let hang={
      name:name,
      img:img
    }
    this.state.UserHangout.push(hang);
    this.state.UserHangoutName.push(name);
    console.log(this.state.UserHangout)
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

          {/* {this.state.hangoutArr!==null?this.state.hangoutArr.map((hangout,index)=>
                <FCHangoutFrame key={index} name={hangout.Name}  image={hangout.Image} />):""}
                        */}
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hangoutArr.map((hangout, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} name={hangout.Name} image={hangout.Image} arrHangoutsNames={this.state.UserHangoutName} sendData={this.getData}/>
                    {/* <Paper className={classes.paper} /> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" 
        style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={()=>this.props.history.push("/hobbies")}
        >הבא</Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI" }}
        onClick={()=>this.props.history.push("/signin3")}
        >הקודם</Button>

      </div>
    )
  }
}
export default withRouter(CCHangout)
