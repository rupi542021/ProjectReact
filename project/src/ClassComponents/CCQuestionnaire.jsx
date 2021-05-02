import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Grid from '@material-ui/core/Grid';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import "../scrollbar.css";
import loaderGIF from '../img/loader.gif';
import FCQuestion from '../FunctionalComponents/FCQuestion';
import Button from '@material-ui/core/Button';
class CCQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            QuestionsState:[]
        }
        this.Questions=[];
    }

    componentDidMount() {

        let Qr = JSON.parse(localStorage.getItem('Questionnaire'));
        this.setState({title:Qr.title})
        this.apiUrl = 'https://localhost:44325/api/theUnit/getAllQuestions/'+Qr.code;
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
              console.log("fetch getAllQuestions= ", result);
              result.forEach(q => {
                console.log('Anslist=',q.Anslist);
                 this.Questions.push(q);
              });
     console.log(this.Questions)
     this.setState({QuestionsState:this.Questions})
            }
          )
    
    }

    render() {
        return (
            <div className='container1'>
                <PrimarySearchAppBar />
                <div style={{ direction: 'rtl' }}>
                    <h3 style={{marginTop:10}}>{this.state.title}</h3>
                {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
          <div className="scrollbar mx-auto" style={{ width: "100vw", height: 550, maxHeight: "59vh", marginTop: 10 }} >

            <div className='userList'>
              <h3 style={{}}>{this.state.text}</h3>
              <Grid container >

                <Grid item xs={12}>
                  <PerfectScrollbar>
                    <Grid container justify="center" spacing={1}>
                      {this.state.QuestionsState.map((q, index) => (

                        <Grid key={index} item>
                          <FCQuestion key={index} {...q}/>
                        </Grid>
                      ))

                      }
                    </Grid>
                  </PerfectScrollbar >
                </Grid>
              </Grid>
            </div>
          </div>
          <Button variant="contained"
          style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, fontFamily: "Segoe UI", width: '40%' }}
        >שלח שאלון</Button>

                </div>
                <div>
                    <FCTabNavigator />
                </div>
            </div>
        )
    }
}
export default withRouter(CCQuestionnaire)