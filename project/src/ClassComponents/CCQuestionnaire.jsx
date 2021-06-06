import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import Grid from '@material-ui/core/Grid';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import "../scrollbar.css";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Swal from 'sweetalert2';
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
        let studOBJ = localStorage.getItem('student');
        studOBJ = JSON.parse(studOBJ);
        this.setState({mail:studOBJ.Mail})
        let Qr = JSON.parse(localStorage.getItem('Questionnaire'));
        this.setState({title:Qr.title,code:Qr.code})
        this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/theUnit/getAllQuestions/'+Qr.code;
        //this.apiUrl = 'https://localhost:44325/api/theUnit/getAllQuestions/'+Qr.code;
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
                const arr1=q.Anslist.map(e=>false)
                 this.Questions.push(q);
                 q.studAns=arr1;
                 localStorage.setItem('qAns'+q.Questionnum, JSON.stringify(q));
              });
     console.log(this.Questions)
     this.setState({QuestionsState:this.Questions})
            }
          )
    
    }
    getData = (q) => {
        console.log("qAns"+q.questionnum, q);
        localStorage.setItem('qAns'+q.questionnum, JSON.stringify(q));
      }
    sendQ=()=>{
        let AllQues=[];
        let q="";
        console.log("this.state.code: "+this.state.code);
        console.log(this.state.QuestionsState);
        this.state.QuestionsState.forEach(q => {
            q=localStorage.getItem('qAns'+q.Questionnum)
            q = JSON.parse(q);
            q.questionnaireNum=this.state.code;
            q.mail=this.state.mail;
            AllQues.push(q);
        });
        console.log('AllQues',AllQues)

        console.log("in post questionnair function");
    console.log("questionnair in post finction", AllQues);
    this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/theUnit/postQuestionnairAns'
    fetch(this.apiUrl,
      {
        method: 'POST',
        body: JSON.stringify(AllQues),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        if (res.status === 201) {
          console.log('questionnair ansers was post');
        }
        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('post succeeded');
          Swal.fire({
            title: 'תשובך התקבלה בהצלחה',
            text: "תודה על שיתוף הפעולה", 
            icon: 'success',
            iconHtml: '',
            confirmButtonText: 'המשך',
            showCloseButton: true
          }).then(() => {

            this.props.history.push("/TheUnit");

          });
        }

        else if (!res.ok) {
          throw Error('אופס! משהו לא עבד. אנא נסה שנית');
        }

       // return res.json()
      })
      .catch((error) => {
        console.log("err get=", error.message);
        Swal.fire({
              title: "!אופס",
              text: "משהו לא עבד. אנא נסה שנית", 
              icon: 'error',
              iconHtml: '',
              confirmButtonText: 'סגור',
              showCloseButton: true
            })
      })
      }
      backPage=()=>{
        this.props.history.push("/TheUnit");
      }

    render() {
        return (
            <div className='container1'>
                <PrimarySearchAppBar />
                <div style={{ direction: 'rtl' }}>
                <ArrowForwardIosIcon style={{ float: 'right', marginTop: 2 ,marginRight:7}}
        onClick={this.backPage} />
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
                          <FCQuestion key={index} {...q} sendData={this.getData}/>
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
        onClick={this.sendQ}>שלח שאלון</Button>

                </div>
                <div>
                    <FCTabNavigator />
                </div>
            </div>
        )
    }
}
export default withRouter(CCQuestionnaire)