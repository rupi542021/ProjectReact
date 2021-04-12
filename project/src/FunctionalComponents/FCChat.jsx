import React, { useRef, useState } from 'react';
import '../styleChat.css';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useLocation, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';

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

function FCChat() {

  //const [user]=useAuthState(auth);



  return (
    <div className="AppChat">
      <PrimarySearchAppBar />
      <HeaderUser />
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}
function HeaderUser() {
  const location = useLocation();
  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);

  const history = useHistory();
  const backPage = () => {
    history.push(location.state.PageBack);
    //this.props.location.state.PageBack
  }

  return (
    <header className="headerMSG">
      {studOBJ.Fname + " " + studOBJ.Lname}
      <ArrowForwardIosIcon style={{ float: 'right', marginTop: 2 }}
        onClick={backPage} />

    </header>
  )
}

function ChatRoom() {
  //let msgArr=[];
  let loginStud = localStorage.getItem('student');
  loginStud = JSON.parse(loginStud);

  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);

  const CreateRoom = async () => {
    await RoomsRef.add({
      RoomName: loginStud.Mail+','+studOBJ.Mail,
      LastMassage:""
    })
  }
  const RoomsRef = firestore.collection('ChatRooms');
  const queryR = RoomsRef.orderBy('RoomName');
  const [ChatRooms] = useCollectionData(queryR, { idField: 'id' });

  var ifRoomExist=ChatRooms && ChatRooms.find(room=>room.RoomName==(loginStud.Mail+','+studOBJ.Mail)||room.RoomName==(studOBJ.Mail+','+loginStud.Mail))
 console.log(ifRoomExist)
  if(ifRoomExist===undefined){
  CreateRoom();
 }

  const dummy = useRef();


  const messagesRef = firestore.collection('messages');
  // const query=messagesRef.orderBy('createdAt').limit(25);
  const query = messagesRef.orderBy('createdAt');
  //const query=messagesRef.where('FromMail','==',loginStud.Mail);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFromValue] = useState('');
  const ToMail = studOBJ.Mail;
  const FromMail = loginStud.Mail;
  const sendMessage = async (e) => {

    e.preventDefault();

    console.log(formValue)
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      FromMail,
      ToMail
    })
    setFromValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form className='formMSG' onSubmit={sendMessage}>
        <button type="submit"
          disabled={!formValue}
          style={{ transform: "rotate(-180deg)" }}>
          <SendIcon fontSize="large" /></button>

        <input className='inputMSG' value={formValue} onChange={(e) => setFromValue(e.target.value)} />

      </form>
    </>
  )

}

function ChatMessage(props) {
  let loginStud = localStorage.getItem('student');
  loginStud = JSON.parse(loginStud);
  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);

  // const userMail=loginStud.Mail;
  // const userPhoto=loginStud.Photo === "" ? "images/avatar.jpg" :'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/'+loginStud.Photo;
  // console.log(props);
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
  var PhotoFrom = "images/avatar.jpg";
  //console.log(messageClass);
  if (FromMail === loginStud.Mail && (loginStud.Photo !== ""))
    PhotoFrom = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + loginStud.Photo
  if (FromMail === studOBJ.Mail && (studOBJ.Photo !== "" || studOBJ.Photo !== null))
    PhotoFrom = studOBJ.Photo

  return (<>
    {(FromMail === loginStud.Mail && ToMail === studOBJ.Mail) || (ToMail === loginStud.Mail && FromMail === studOBJ.Mail) ?
      <div>
        <div className={'message ' + messageClass} style={{ direction: 'rtl' }}>

          <img className='imgMSG' src={PhotoFrom} />
          <p className='textMSG'>{text}</p>

        </div>
        <p className={'timeStamp' + messageClass}>{timeH}</p>
      </div> : ""}
  </>
  )
}
export default withRouter(FCChat)