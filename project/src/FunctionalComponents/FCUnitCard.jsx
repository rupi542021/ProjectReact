
import React, { useRef, useState } from 'react';
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Swal from 'sweetalert2';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { Today } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 350,
    height: 190
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
   

    textAlign: 'right',
    padding: 1
  },
  content: {
    flex: '1 0 auto',
    padding: 1,
    marginTop: 5,
    marginRight: 5
  },
  cover: {
    width: 80,
    marginRight: 0
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 20,
    width: 20,
  },
}));

export default function FCUnitCard(props) {
  const classes = useStyles();
  //const theme = useTheme();
  //const percentage = 66;
  var showin=true;
  const [showResults, setShowResults] = React.useState(false)
  const showInput = () => setShowResults(true)

  
  const toQuestionnaire = () =>{ }

  const history = useHistory();
  const toChat = () =>{ 
    let path = `chat`; 
    history.push({
      pathname: path  ,
      state: { PageBack: 'showUsers' }
  });
  }
  const [formValue, setFromValue] = useState('');
  const sendMessage = async (e) => {
   
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);

    //e.preventDefault();
    setShowResults(false)
    console.log(formValue)
    if(props.Type=='event'){
    console.log("in post event comment function");
    let ec = {
      Student: studOBJ,
      FbEventNum: props.Code,
      CommentText:formValue,
      CommentDate:new Date().toLocaleString()
    }
    let apiUrl = 'https://localhost:44325/api/theUnit/eventComment';
    fetch(apiUrl,
      {
        method: 'POST',
        body: JSON.stringify(ec),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        if (res.status === 201) {
          console.log('eventComment created:)');
        }
        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('post succeeded');
          Swal.fire({
            title: 'תגובתך נשלחה בהצלחה',
            //text: ' :) ברוכים השבים',
            icon: 'success',
            iconHtml: '',
            confirmButtonText: 'סגור',
            showCloseButton: true,

          })
        }
      },
        (error) => {
          console.log("err post=", error);
        });
    console.log('end')}
    else{
      console.log("in post ad comment function");
      let ec = {
        Student: studOBJ,
        FbAdsNum: props.Code,
        CommentText:formValue,
        CommentDate:new Date().toLocaleString()
      }
      let apiUrl = 'https://localhost:44325/api/theUnit/adComment';
      fetch(apiUrl,
        {
          method: 'POST',
          body: JSON.stringify(ec),
          headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; charset=UTF-8'
          })
        })
        .then(res => {
          console.log('res=', res);
          console.log('res.status', res.status);
          if (res.status === 201) {
            console.log('adComment created:)');
          }
          console.log('res.ok', res.ok);
  
          if (res.ok) {
            console.log('post succeeded');
            Swal.fire({
              title: 'תגובתך נשלחה בהצלחה',
              //text: ' :) ברוכים השבים',
              icon: 'success',
              iconHtml: '',
              confirmButtonText: 'סגור',
              showCloseButton: true,
  
            })
          }
        },
          (error) => {
            console.log("err post=", error);
          });
      console.log('end')
    }
  

    showin=false
    setFromValue('');
    
  }
  const [btnText, setbtnText] = React.useState(props.Arrival?'אגיע!':'לא אגיע');
  const selectArrival=()=>{

    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);

    if(btnText=='אגיע!'){
      console.log("in post arrival function");
    let sf = {
      Mail: studOBJ.Mail,
      EventCode: props.Code
    }
    let apiUrl = 'https://localhost:44325/api/theUnit/AddToArrivals';
    fetch(apiUrl,
      {
        method: 'POST',
        body: JSON.stringify(sf),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        if (res.status === 201) {
          console.log('arrival created:)');
        }
        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('post succeeded');
          setbtnText('לא אגיע')
          //props.sendFavoriteData(props.id,"add");
          //לעשות שישנה את הכפתור לכיתוב 'לא אגיע' או משהו כזה. וליצור פונקציה של מחיקה (אולי בכפתור אחר)
        }
      },
        (error) => {
          console.log("err post=", error);
        });
    console.log('end')
  }
  
else{
  console.log("in delete arrival function");
  let studOBJ = localStorage.getItem('student');
  studOBJ = JSON.parse(studOBJ);
  let sf = {
    Mail: studOBJ.Mail,
    EventCode: props.Code
  }
  let apiUrl = 'https://localhost:44325/api/theUnit/DeleteArrival';
  fetch(apiUrl,
    {
      method: 'Delete',
      body: JSON.stringify(sf),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      })
    })
    .then(res => {
      console.log('res=', res);
      console.log('res.status', res.status);
      console.log('res.ok', res.ok);
      if (res.ok) {
        console.log('student was deleted!');
        setbtnText('אגיע!')
        //props.sendFavoriteData(props.id,"remove");
      }
    });

}
  }
  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw",height:showResults?190:140 }}>
      
     {props.Image!==""&&props.Image!==null? <CardMedia
     style={{height:showResults?130:140}}
       
        className={classes.cover}
        image={'https://localhost:44325/'+props.Image}
        title="Live from space album cover"
      />:""}
      <div className={classes.details} style={{width:props.Image!=""&&props.Image!=null?200:280}} >
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontFamily: "Segoe UI", fontSize: "5.7vw" }}>
            {props.Title}
          </Typography>
          <Typography variant="subtitle1"  style={{ fontFamily: "Segoe UI", fontSize: "4.5vw" }}>

            {props.Type=='event'?<Moment format=" DD/MM/YYYY">
                {props.subTitle}
            </Moment>:''}
            {props.Type=='qr'?
                props.subTitle:''}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.9vw" }}>
            { props.Content}
          </Typography>

        </CardContent>


      </div>
      <div style={{ width: 40, marginTop: 5  }}>
        {props.Type=="event"?<Button  style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 14, borderRadius: 15, fontFamily: "Segoe UI" }} 
        color="default" onClick={selectArrival} >{btnText}</Button>:''}
         {props.Type!=='qr'?<Button  style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 14, borderRadius: 15, fontFamily: "Segoe UI" }} 
        color="default" onClick={showInput}>הגב</Button>:
        <Button  style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 14, borderRadius: 15, fontFamily: "Segoe UI" }} 
        color="default" onClick={toQuestionnaire}>למענה על השאלון</Button>
        }
      </div>

      {showResults?<div style={{width:'100%',marginTop:130,position:'absolute',direction:'rtl'}}>
      <input className='inputMSG' value={formValue} onChange={(e) => setFromValue(e.target.value)} />

        <button type="submit"
          disabled={!formValue}
          onClick={sendMessage}
          style={{ transform: "rotate(-180deg)" }}>
          <SendIcon fontSize="large" /></button>
     
      </div>:''}
    </Card>
  );
}
