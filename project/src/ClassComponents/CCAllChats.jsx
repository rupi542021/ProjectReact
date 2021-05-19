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
      messagesU: []


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
    let messagesU=[];
    const query1 = db.collection('UnitMessagesEvents').orderBy('createdAt','desc');
    query1.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const messageObj = change.doc.data()
        if (studOBJ.Mail === messageObj.ToMail) {
          if(!messages.some(msg=>
            messageObj.ToMail==msg.ToMail))
              messagesU.push(messageObj);
       } })
      
      console.log('messagesU', messagesU);
      this.setState({messagesU:messagesU})

    })
    this.setState({ loading: true })

    this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + studOBJ.Mail + '/Recommend';
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
              Photo: s.Photo === "" ? "images/avatar.jpg" : 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + s.Photo,
            }
                studArr.push(stud);
          });
          
          console.log('studArr', studArr);
          
          messages.forEach(m => {
            let index="";
            if(studOBJ.Mail==m.FromMail)
            index=studArr.findIndex(s=> s.Mail==m.ToMail)
            else  index=studArr.findIndex(s=>s.Mail==m.FromMail)
      
            m.Lname=studArr[index].Lname;
            m.Fname=studArr[index].Fname
            m.Photo=studArr[index].Photo;
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
          {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
          <main className='mainAll'>
          {this.state.messagesU && this.state.messagesU.map((s, index) =>
              <FCChatRoom key={index} {...s} Fname={"היחידה ליזמות ומעורבות חברתית"} Lname={""} text={""} sendData={this.getData} />)}

            {this.state.messages && this.state.messages.map((s, index) =>
              <FCChatRoom key={index} {...s} sendData={this.getData} />)}

          </main>
        </section>
        <div>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}
export default withRouter(CCAllChats)