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
<header>פה יהיה שם המשתמש שאיתו אנחנו מדברים</header>
      <section>
        {user?<ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}
function SignIn(){
  const singInWithGoogle =()=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  
  }
  return(
    <button className="sign-in" onClick={singInWithGoogle}>Sign in with Google</button>

  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
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
    await messagesRef.add({
      text: formValue,
      createdAt:firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
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
  const {text,uid,photoURL}=props.message;
  const messageClass=uid === auth.currentUser.uid?'sent':'received';
 
  return (
    <div className={'message ${messageClass}'} style={{direction:'rtl'}}>
      <img className='imgMSG' src={photoURL}/>
      <p className='textMSG'>{text}</p>
  </div>
  )
}
export default withRouter(FCChat)