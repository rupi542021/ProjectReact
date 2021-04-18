import React, { Component } from 'react'
import {  withRouter } from 'react-router-dom';
import FCUnitCard from '../FunctionalComponents/FCUnitCard';
import Grid from '@material-ui/core/Grid';
import {  Select } from 'antd';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
import "../scrollbar.css";
import loaderGIF from '../img/loader.gif';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import { Today } from '@material-ui/icons';


class CCTheUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsState:[],

      curTime : new Date().toLocaleString(),
    }
   this.events=[];
  }

  componentDidMount() {

let today='';
    this.apiUrl = 'https://localhost:44325/api/Events/geteventdetail';
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
          console.log("fetch GetAllEvents= ", result);
          result.forEach(s => {
            s.EventDate=new Date(s.EventDate.split('T')[0]);
            today=new Date(this.state.curTime.split(',')[0])
            if(s.EventDate>=today)
              this.events.push(s);
          });
console.log(this.events)
this.events.sort((a, b) => a.EventDate - b.EventDate)
this.setState({eventsState:this.events})
        }
      )

  }

  
    render() {
      return (
        <div className='container1'>
          <PrimarySearchAppBar />
          <div style={{ direction: 'rtl' }}>
            <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 24 }}>היחידה למעורבות ויזמות חברתית</h3>

             <p style={{ color: '#3D3D3D', fontSize: 17 }}>בוא להיות מוערב בחברה והקהילה שלך</p>
           {/* <div style={{ marginBottom: 15 }}>
              <SearchField
                onChange={this.SearchUser}
                placeholder="חיפוש..."

                classNames="test-class"
              /></div>
            <Select style={{ width: 200, marginBottom: 5 }} placeholder="סנן לפי"
              onChange={this.FilterUsers}>
              <Select.Option value="choose">כל המשתמשים</Select.Option>
              {filterByList.map((filterBy) => (
                <Select.Option key={filterBy} value={filterBy}>{filterBy}</Select.Option>
              ))}
            </Select> */}
          </div>



          {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
          <div className="scrollbar mx-auto" style={{ width: "100vw", height: 600, maxHeight: "65vh", marginTop: 40 }} >

            <div className='userList'>
              <h3 style={{}}>{this.state.text}</h3>
              <Grid container >

                <Grid item xs={12}>
                  <PerfectScrollbar>
                    <Grid container justify="center" spacing={1}>
                      {this.state.eventsState.map((e, index) => (

                        <Grid key={index} item>
                          <FCUnitCard key={index} {...e}/>
                        </Grid>
                      ))

                      }
                    </Grid>
                  </PerfectScrollbar >
                </Grid>
              </Grid>
            </div>
          </div>
         <div>
          <FCTabNavigator />
          </div>
        </div>
      )
    }
  }
  export default withRouter(CCTheUnit)