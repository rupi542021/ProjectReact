//import React, { useRef, useState, useEffect } from 'react';
import '../styleChat.css';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';
import { lightBlue } from '@material-ui/core/colors';
import React, {useRef, useState, useEffect } from 'react';

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


const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function FCAllChats() {

 
  let studentstArr=[];
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  //const [studentstArr,setArr] = useState([]);



  useEffect(() => {
    alert("Component Rendered");
 


  // var studChatWith = [];
  // messages && messages.forEach(m => {
  //   if (loginStud.Mail === m.ToMail) studChatWith.push(m.FromMail);
  //   if (loginStud.Mail === m.FromMail) studChatWith.push(m.ToMail);
  // });
  // console.log('chatwithall', studChatWith);
  // const uniqueTags = [];
  // studChatWith.map(stud => {
  //   if (uniqueTags.indexOf(stud) === -1) {
  //     uniqueTags.push(stud)
  //   }
  // });
  // console.log('chatwithUni', uniqueTags);

    //let chatPerUser = [];
  
    //const studentstArr = [];
    let loginStud = localStorage.getItem('student');
    loginStud = JSON.parse(loginStud);
    var apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + loginStud.Mail + '/Recommend';
    console.log('GETstart');
    fetch(apiUrl,
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
            //if (uniqueTags.includes(s.Mail)) 
            studentstArr.push(stud)
              //  studentstArr.push(stud);
  
          });
          console.log('studArr', studentstArr);
          console.log('studArr', studentstArr.length);
          alert(studentstArr.length);
        }
      )
    },[]);
  //  console.log('studArr', studentstArr);
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <section>
      <main>
        {/* <ChatRoom arr={studentstArr}/> */}
        <h2>{studentstArr.length}</h2>
        {studentstArr && studentstArr.map((m, index) => { console.log(m); return <ChatRooms key={index} chat={m} /> })}
        </main>
      </section>
    </div>
  );
}

function ChatRoom(props) {

  return (
    <>
      <main>
      <h2>{props.arr.length}</h2>
        {/* {messages && messages.map(msg =>{console.log(msg); return <ChatMessage key={msg.id} message={msg} />})} */}
        {props.arr && props.arr.map((m, index) => { console.log(m); return <ChatRooms key={index} chat={m} /> })}

      </main>

    </>
  )

}

function ChatMessage(props) {
  let loginStud = localStorage.getItem('student');
  loginStud = JSON.parse(loginStud);
  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);

  const { createdAt, text, FromMail, ToMail } = props.message;
  const messageClass = FromMail === loginStud.Mail ? 'sent' : 'received';

  const timeMSG = createdAt !== null ? new Date(createdAt.seconds * 1000).toString() : "";
  //console.log(timeMSG);
  if (timeMSG !== "") {
    var timeS = timeMSG.split(' ');
    //console.log(timeS[4]);
    var timemmhh = timeS[4].split(':');
    var timeH = timeS[1] + " " + timeS[2] + " " + timemmhh[0] + ":" + timemmhh[1];
  }

  var ChatUser = "";
  // console.log(messageClass);

  //PhotoFrom=userPhoto===loginStud.Photo?userPhoto2Chat:userPhoto;
  ChatUser = FromMail === loginStud.Mail ? ToMail : FromMail;
  var PhotoFrom = "images/avatar.jpg";
  //console.log(messageClass);


  return (<>
    {(FromMail === loginStud.Mail || ToMail === loginStud.Mail) ? <div style={{ backgroundColor: 'white' }}>

      <div className={'message sent'} style={{ direction: 'rtl' }}>

        <img className='imgMSG' src={PhotoFrom} />
        <h4>{ChatUser}</h4>


      </div>
      <div className={'message sent'} style={{ direction: 'rtl', marginRight: 50 }}>
        <p className='textMSG'>{text}</p>
        <h5 className={'timeStamp' + messageClass} style={{ float: 'left' }}>{timeH}</h5>
      </div></div> : ""}
  </>
  )
}

function ChatRooms(props) {
  //const {Mail} = props.chat;
  
  var name="1";

  return (
    <div  style={{ backgroundColor: 'white'}}>

      {/* <img className='imgMSG' src={props.photo} /> */}
      <h4>{props.chat}</h4>

    </div>

  )
}
export default withRouter(FCAllChats)