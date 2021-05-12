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
      allPostsState:[],

      curTime : new Date().toLocaleString(),
    }
   this.allPosts=[];
  }

  componentDidMount() {

    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);

    this.apiUrl = 'https://localhost:44325/api/theUnit/getAllEvents';
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
            // s.EventDate=new Date(s.EventDate.split('T')[0]);
            // today=new Date(this.state.curTime.split(',')[0])
            // if(s.EventDate>=today)
            let boo=true;
            s.Studentsinevent.forEach(stud => {
              if(stud.Mail==studOBJ.Mail) {boo=false; return;}
            });
            let unitPost={
              Code:s.EventCode,
              Title:s.Eventname,
              Image:s.EventImage,
              subTitle:s.EventDate,
              Content:s.EventText,
              Arrival:boo,
              Type:'event'
            }
            this.allPosts.push(unitPost);
          });
console.log(this.allPosts)
this.allPosts.sort((a, b) => a.subTitle - b.subTitle)
this.setState({allPostsState:this.allPosts})
        }
      )



      this.apiUrl = 'https://localhost:44325/api/theUnit/getAllAds';
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
            console.log("fetch GetAllAds= ", result);
            result.forEach(s => {
              let unitPost={
                Code:s.AdsCode,
                Title:s.SubSubject,
                Image:s.AdsImage,
                subTitle:"",
                Content:s.AdsText,
                Type:'ad'
              }
              this.allPosts.push(unitPost);
            });
  console.log(this.allPosts)
  //this.allPosts.sort((a, b) => a.subTitle - b.subTitle)
  this.setState({allPostsState:this.allPosts})
          }
        )
        switch (studOBJ.StudyingYear) {
          case 'א':
            studOBJ.StudyingYear = 1
            break;
          case 'ב':
            studOBJ.StudyingYear = 2
            break;
          case 'ג':
            studOBJ.StudyingYear = 3
            break;
          case 'ד':
            studOBJ.StudyingYear = 4
            break;

          default:
            break;
        }
        console.log('DepartmentCode',studOBJ.Dep.DepartmentCode);
        console.log('StudyingYear',studOBJ.StudyingYear);
        this.apiUrl = 'https://localhost:44325/api/theUnit/getAllQuestionnaires/'+studOBJ.Dep.DepartmentCode+'/'+studOBJ.StudyingYear;
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
            console.log("fetch GetAllQuestionnaires= ", result);
            result.forEach(s => {
              
              let boo=false;
            s.StudentsAns.forEach(mail => {
              if(mail==studOBJ.Mail) {boo=true; return;}
            });

              switch (s.QuestionnaireYear) {
                case 0:
                  s.QuestionnaireYear=""
                  break;
                case 1:
                  s.QuestionnaireYear="-שנה א'"
                  break;
                case 2:
                  s.QuestionnaireYear="-שנה ב'"
                  break;
                case 3:
                  s.QuestionnaireYear="-שנה ג'"
                  break;
                case 4:
                  s.QuestionnaireYear="-שנה ד'"
                  break;
                default:
                  break;
              }
              if(s.Dep.DepartmentCode==15){
                s.Dep.DepartmentName="כלל המחלקות"
              }
              const date1 = new Date(s.EndPublishDate);
              const date2 = new Date();
              const diffInMs = Math.abs(date2 - date1);
              const diffinDays=Math.round(diffInMs / (1000 * 60 * 60 * 24))
              console.log("diffinDays"+diffinDays)
              
              let unitPost={
                Code:s.QuestionnaireNum,
                Title:s.SubQr,
                Image:"",
                subTitle:s.Dep.DepartmentName+' '+s.QuestionnaireYear,
                Content:diffinDays+" ימים נותרו למענה",
                Arrival:boo,
                Type:'qr'
              }
              this.allPosts.push(unitPost);
            });
  console.log(this.allPosts)
  this.setState({allPostsState:this.allPosts})
          }
        )
  }
 
  
    render() {
      return (
        <div className='container1'>
          <PrimarySearchAppBar />
          <div style={{ direction: 'rtl' }}>
            <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 24, marginTop: 10 }}>היחידה למעורבות ויזמות חברתית</h3>

             <p style={{ color: '#3D3D3D', fontSize: 17 , marginTop: 8}}>בוא להיות מוערב בחברה והקהילה שלך</p>
 
          </div>



          {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
          <div className="scrollbar mx-auto" style={{ width: "100vw", height: 650, maxHeight: "70vh", marginTop: 10 }} >

            <div className='userList'>
              <h3 style={{}}>{this.state.text}</h3>
              <Grid container >

                <Grid item xs={12}>
                  <PerfectScrollbar>
                    <Grid container justify="center" spacing={1}>
                      {this.state.allPostsState.map((e, index) => (

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