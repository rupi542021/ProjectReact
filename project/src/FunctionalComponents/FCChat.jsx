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
import Moment from 'react-moment';
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
      <ArrowForwardIosIcon style={{ float: 'right', marginTop: 2, marginRight: 7 }}
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

  //   const CreateRoom = async () => {
  //     await RoomsRef.add({
  //       RoomName: loginStud.Mail+','+studOBJ.Mail,
  //       LastMassage:""
  //     })
  //   }
  //   const RoomsRef = firestore.collection('ChatRooms');
  //   const queryR = RoomsRef.orderBy('RoomName');
  //   const [ChatRooms] = useCollectionData(queryR, { idField: 'id' });

  //   var ifRoomExist=ChatRooms && ChatRooms.find(room=>room.RoomName==(loginStud.Mail+','+studOBJ.Mail)||room.RoomName==(studOBJ.Mail+','+loginStud.Mail))
  //  console.log(ifRoomExist)
  //   if(ifRoomExist===undefined){
  //   CreateRoom();
  //  }

  const dummy = useRef();


  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });
  var FilterArr = [];
  if (messages != null)
    FilterArr = messages.filter(m =>
      (m.FromMail === loginStud.Mail && m.ToMail === studOBJ.Mail) || (m.ToMail === loginStud.Mail && m.FromMail === studOBJ.Mail))
   
    
  const messagesRef1 = firestore.collection('UnitMessagesEvents');
  const query1 = messagesRef1.orderBy('createdAt');
  const [messages1] = useCollectionData(query1, { idField: 'id' });
  //console.log('messages1',messages1)
  var FilterArrU = [];
  if (messages1 != null)
  {
    messages1.forEach(m => {
      if((m.ToMail === loginStud.Mail&&studOBJ.Lname==="")){
      m.type="ev";
      FilterArrU.push(m);  }
    });
  }

  const messagesRef2 = firestore.collection('UnitMessagesAds');
  const query2 = messagesRef2.orderBy('createdAt');
  const [messages2] = useCollectionData(query2, { idField: 'id' });
  //console.log('messages2',messages2)
  
  if (messages2 != null)
  {
    messages2.forEach(m => {
      if((m.ToMail === loginStud.Mail&&studOBJ.Lname==="")){
      m.type="ad";
      FilterArrU.push(m);  }
    });
  }

    
  if (dummy.current != null) dummy.current.scrollIntoView()
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

    let apiUrl = 'https://fcm.googleapis.com/fcm/send';

    // Modified
    var payload = {
        "notification": {
            "title": "היי "+studOBJ.Fname+", יש לך הודעה חדשה מ"+loginStud.Fname+" "+loginStud.Lname,
            "body":JSON.stringify(loginStud)
        },
        "to": "dC6f4yeZqSW9crm949pDgm:APA91bFCiQBIuzJQXNIe2IlWwB-OzPhQjaE-RkyBmbRBC0LK40UestUipXOYivyQmenl5xUCjIMnu-HZfXUFYUl8CoF0CYXxioYWlj5RwXO51vFCzacYkLeYI9lsBL0jri93QzLeefCx"
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            "Authorization": "key=AAAAvanr1ws:APA91bF-z_Z9tPmxtA5BWWCnuFBYCHzqS0MWQvx_fEXkSXJwLOwYdRqdw5-2YqFqAW6vfnV73E8iOWG5kx2RlfD7-98YlgLEWuPsEQq-LJSb-8lHtkb9E9XGYAryo2F-3N6xeAA-ZXNY",
            'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
        })
    })
        .then(res => {
            console.log('res=', res);
            return res.json()
        })

  }
  return (
    <>
      <main className='mainRoom' style={{height:FilterArr.length>0?"75vh":"85vh"}}>
      {FilterArrU && FilterArrU.map(msg => <ChatMessageU key={msg.id} message={msg} type={msg.type}/>)}
        {FilterArr && FilterArr.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
{studOBJ.Lname!==""?
      <form className='formMSG' onSubmit={sendMessage}>
        <button type="submit"
          disabled={!formValue}
          style={{ transform: "rotate(-180deg)" }}>
          <SendIcon fontSize="large" /></button>

        <input className='inputMSG' value={formValue} onChange={(e) => setFromValue(e.target.value)} />

      </form>:""}
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

  var PhotoFrom = "images/avatar.jpg";
  //console.log(messageClass);
  if (FromMail === loginStud.Mail && (loginStud.Photo !== ""))
    PhotoFrom = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + loginStud.Photo
  if (FromMail === studOBJ.Mail && (studOBJ.Photo !== "" || studOBJ.Photo !== null))
    PhotoFrom = studOBJ.Photo

  return (<>
    <div>
     
      <div className={'message ' + messageClass} style={{ direction: 'rtl' }}>

        <img className='imgMSG' src={PhotoFrom} />
        <p className='textMSG'>{text}</p>

      </div>
      <p className={'timeStamp' + messageClass}>
        {createdAt !== null ?
          <Moment format=" DD/MM hh:mm" style={{ fontSize: 12 }}>
            {new Date(createdAt.seconds * 1000).toString()}
          </Moment> : ""}
      </p>
    </div>
  </>
  )
}
function ChatMessageU(props) {
  let loginStud = localStorage.getItem('student');
  loginStud = JSON.parse(loginStud);
  let studOBJ = localStorage.getItem('chooseUser');
  studOBJ = JSON.parse(studOBJ);

  const { createdAt, text, myComent,EventDate,EventTitle, ToMail ,AdTitle,AdContent} = props.message;

 
  //const messageClass = FromMail === loginStud.Mail ? 'sent' : 'received';

  var PhotoFrom = "images/avatar.jpg";
  //console.log(messageClass);
  // if (FromMail === loginStud.Mail && (loginStud.Photo !== ""))
  //   PhotoFrom = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + loginStud.Photo
  // if (FromMail === studOBJ.Mail && (studOBJ.Photo !== "" || studOBJ.Photo !== null))
  //   PhotoFrom = studOBJ.Photo

  return (<>
    <div>
     
      <div className='UnitMSG' style={{ direction: 'rtl' }}>

        {/* <img className='imgMSG' src={PhotoFrom} /> */}
        <p>{props.type=="ev"?"האירוע: "+EventTitle:"כותרת הפרסום: "+AdTitle}</p>
        <p>{props.type=="ev"?"שייתקיים בתאריך: "+EventDate:"תוכן הפרסום: "+AdContent}</p>
        <p>{"תגובתך: "+myComent}</p>

        <p className='textMSG'>{"מענה היחידה: "+text}</p>
        <p className={'timeStampUnit'}>
        {createdAt !== null ?
          <Moment format=" DD/MM hh:mm" style={{ fontSize: 12 }}>
            {new Date(createdAt.seconds * 1000).toString()}
          </Moment> : ""}
      </p>
      </div>
     
    </div>
  </>
  )
}
export default withRouter(FCChat)