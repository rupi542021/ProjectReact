import React, { useRef, useState } from 'react';
import '../styleChat.css';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';

import { withRouter } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';

firebase.initializeApp({
  apiKey: "AIzaSyCSHnFe2MHnBKhRHQrwACoNLo5cerY5W74",
  authDomain: "chat-firebase-6a710.firebaseapp.com",
  projectId: "chat-firebase-6a710",
  storageBucket: "chat-firebase-6a710.appspot.com",
  messagingSenderId: "814599624459",
  appId: "1:814599624459:web:5ad9f7936fe596703f340e",
  measurementId: "G-S667RQB4PS"
})

const auth=firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function FCChat() {

const [user]=useAuthState(auth);



  return (
    <div className="App">
         <PrimarySearchAppBar />
<HeaderUser/>
      <section>
        <ChatRoom/>
      </section>
    </div>
  );
}
function HeaderUser() {
  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);


  return(
<header className="headerMSG">{studOBJ.Fname+" "+studOBJ.Lname}</header>
  )
}

function ChatRoom(){
  const dummy = useRef();
  const messagesRef=firestore.collection('messages');
  const query=messagesRef.orderBy('createdAt').limit(25);

  const [messages]=useCollectionData(query, {idField:'id'});
  const [formValue,setFromValue]= useState('');

  const sendMessage=async(e)=>{
    e.preventDefault();
    const {uid,photoURL}=auth.currentUser;

    let loginStud = localStorage.getItem('student');
    loginStud = JSON.parse(loginStud);
    const userMail=loginStud.Mail;
    const userPhoto='http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/'+loginStud.Photo;

    let studOBJ = localStorage.getItem('chooseUser');
    studOBJ = JSON.parse(studOBJ);
    const userMail2Chat=studOBJ.Mail;
    const userPhoto2Chat=studOBJ.Photo;



    await messagesRef.add({
      text: formValue,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      userMail,
      userMail2Chat,
      userPhoto,
      userPhoto2Chat
    })
    setFromValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });

    
  }
  return(
    <>
     <main>

{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

<span ref={dummy}></span>

</main>

    <form className='formMSG'onSubmit={sendMessage}>
    <button type="submit" disabled={!formValue} style={{transform: "rotate(-180deg)"}}>
       <SendIcon fontSize="large"/></button>

      <input className='inputMSG' value={formValue}  onChange={(e)=>setFromValue(e.target.value)}/>

    </form>
    </>
  )

}

function ChatMessage(props){
  let loginStud = localStorage.getItem('student');
  loginStud = JSON.parse(loginStud);
  // const userMail=loginStud.Mail;
  // const userPhoto=loginStud.Photo === "" ? "images/avatar.jpg" :'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/'+loginStud.Photo;

  const {createdAt,text,userMail,userMail2Chat,userPhoto,userPhoto2Chat}=props.message;
  const messageClass=userMail === loginStud.Mail?'sent':'received';
  console.log(new Date(createdAt.seconds*1000));
  const timeMSG=new Date(createdAt.seconds*1000).toString()
  
  console.log(timeMSG);
  var timeS=timeMSG.split(' ');
  console.log(timeS[4]);
  var timemmhh=timeS[4].split(':');
  var timeH=timeS[1]+" "+timeS[2]+" "+timemmhh[0]+":"+timemmhh[1];
  const uPhoto=messageClass === 'sent'?userPhoto2Chat:userPhoto;

  console.log(uPhoto);
  console.log(messageClass);

  return (<>
    <div className={'message '+messageClass} style={{direction:'rtl'}}>
    
      <img className='imgMSG' src={uPhoto}/>
      <p className='textMSG'>{text}</p>
     
  </div>
  <p className='timeStamp'>{timeH}</p>
  </>
  )
}
export default withRouter(FCChat)