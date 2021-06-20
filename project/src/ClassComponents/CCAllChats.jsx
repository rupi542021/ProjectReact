import '../styleChat.css';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import React, { Component } from 'react'
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
import "../scrollbar.css";
import loaderGIF from '../img/loader.gif';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import FCChatRoom from '../FunctionalComponents/FCChatRoom';
import { now } from 'moment';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
    authDomain: "chat-firebase-6a710.firebaseapp.com",
    projectId: "chat-firebase-6a710",
    storageBucket: "chat-firebase-6a710.appspot.com",
    messagingSenderId: "814599624459",
    appId: "1:814599624459:web:5ad9f7936fe596703f340e",
    measurementId: "G-S667RQB4PS"
  });
}

export const db = firebase.firestore();

class CCAllChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentstArr: [],
      userMail: "",
      loading: true,
      studChatWith: [],
      uniqueTags: [],
      user: false,
      messages: [],
      messagesU: [],
      createdAt:""


    }
    this.AllMsgByUser = [];
    
  }

  fetchMessages = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    let messages=[];
    let studArr=[];
    const query = db.collection('messages').orderBy('createdAt','desc');
    query.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const messageObj = change.doc.data()
        if (studOBJ.Mail === messageObj.ToMail || studOBJ.Mail === messageObj.FromMail) {
          if(!messages.some(msg=>
            (messageObj.ToMail==msg.ToMail&&messageObj.FromMail==msg.FromMail)||(messageObj.ToMail==msg.FromMail&&messageObj.FromMail==msg.ToMail)))
              messages.push(messageObj);
       } })
      
      console.log('messages', messages);

    })
    var messagesU=[];
    const query1 = db.collection('UnitMessagesEvents').orderBy('createdAt','desc');
    query1.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const messageObj = change.doc.data()
        if (studOBJ.Mail === messageObj.ToMail) {
          if(!messagesU.some(msg=>
            messageObj.ToMail==msg.ToMail))
              messagesU.push(messageObj);
       } })
      
      console.log('messagesU1', messagesU);

      
      this.setState({messagesU:messagesU})

    })

    const query2 = db.collection('UnitMessagesAds').orderBy('createdAt','desc');
    query2.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const messageObj = change.doc.data()
        if (studOBJ.Mail === messageObj.ToMail) {
          if(!messages.some(msg=>
            messageObj.ToMail==msg.ToMail))
              messagesU.push(messageObj);
       } })
      
      console.log('messagesU2', messagesU);

      
      //console.log('messagesU[messagesU.length-1].createdAt', messagesU[messagesU.length-1].createdAt);
       if(messagesU.length>0)
        this.setState({messagesU:messagesU[messagesU.length-1],createdAt:messagesU[messagesU.length-1].createdAt})
        else this.setState({messagesU:null})
    })

    this.setState({ loading: true })
    //this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + studOBJ.Mail + '/Recommend';
    this.apiUrl = 'https://localhost:44325/api/students/' + studOBJ.Mail + '/Recommend';
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
          console.log("fetch GetAllUsers= ", result);
          result.forEach(s => {
            let stud = {
              Mail: s.Mail, Fname: s.Fname, Lname: s.Lname,
              Token:s.Token,
              Photo: s.Photo === "" ? "images/avatar.jpg" : 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + s.Photo,
            }
                studArr.push(stud);
          });
          
          console.log('studArr', studArr);
          
          messages.forEach(m => {
            let index="";
            if(studOBJ.Mail==m.FromMail)
            index=studArr.findIndex(s=> s.Mail==m.ToMail)
            else  
            index=studArr.findIndex(s=>s.Mail==m.FromMail)
      
            if(index!==-1){
            m.Lname=studArr[index].Lname;
            m.Fname=studArr[index].Fname
            m.Photo=studArr[index].Photo;
            m.Token=studArr[index].Token;
            }
          });
          console.log('messageswithName',messages)
         

          this.setState({ loading: false ,messages:messages});
          this.AllMsgByUser=messages;
        }
      )
  }

  componentDidMount() {
    this.fetchMessages()
  }
  SearchUser = (val) => {
    let filtered_list = this.state.messages.filter((item) => item.Fname.includes(val) || item.Lname.includes(val));
    if (val === "")
      this.setState({ messages:this.AllMsgByUser });
    else
      this.setState({ messages: filtered_list })
  }
  getData = (userPicked) => {
    console.log("picked" + userPicked);
    localStorage.setItem('chooseUser', JSON.stringify(userPicked));
    // this.props.history.push("/chat");
    let path = `chat`;
    this.props.history.push({
      pathname: path,
      state: { PageBack: 'AllChats2' }
    });
  }
  render() {
    return (
      <div className="App">
        <PrimarySearchAppBar />
        <section>
          <div style={{ direction: 'rtl' }}>
            <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26, marginBottom: 25 }}>ההודעות שלי</h3>
            <div style={{ marginBottom: 25 }}>
              <SearchField
                onChange={this.SearchUser}
                placeholder="חיפוש..."
                classNames="test-class"
              /></div>
          </div>

          {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : 
                    this.state.messages.length===0&&this.state.messagesU===null?<h3  style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26, marginTop: 50 }}>אין הודעות</h3>:

         
         <main className='mainAll'>
          {this.state.messagesU && this.state.messagesU!==null?
              <FCChatRoom createdAt={this.state.createdAt} Photo={"icons/theUnit.png"} Fname={"היחידה ליזמות ומעורבות חברתית"} Lname={""} text={""} sendData={this.getData} />:""}
 
            {this.state.messages && this.state.messages.map((s, index) =>
              s.Lname!=null?
              <FCChatRoom key={index} {...s} sendData={this.getData} />:'')}

          </main>}
        </section>
        <div>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}
export default withRouter(CCAllChats)