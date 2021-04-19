
import React, { useRef, useState } from 'react';
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
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
  const chooseUser = () => {
    props.sendData(props.obj);
  
  }
 

  const history = useHistory();
  const toChat = () =>{ 
    chooseUser();
    let path = `chat`; 
    history.push({
      pathname: path  ,
      state: { PageBack: 'showUsers' }
  });
  }
  const [formValue, setFromValue] = useState('');
  const sendMessage = async (e) => {

    //e.preventDefault();
    setShowResults(false)
    console.log(formValue)
  showin=false
    setFromValue('');
    
  }
  const selectArrival=()=>{
    console.log("in post arrival function");
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    let sf = {
      Mail: studOBJ.Mail,
      EventCode: props.EventCode
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
          //props.sendFavoriteData(props.id,"add");
          //לעשות שישנה את הכפתור לכיתוב 'לא אגיע' או משהו כזה. וליצור פונקציה של מחיקה (אולי בכפתור אחר)
        }
      },
        (error) => {
          console.log("err post=", error);
        });
    console.log('end')
  }
  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw",height:showResults?190:140 }}>
      
     {props.EventImage!=""? <CardMedia
     style={{height:showResults?130:140}}
        onClick={chooseUser}
        className={classes.cover}
        image={'https://localhost:44325/'+props.EventImage}
        title="Live from space album cover"
      />:""}
      <div className={classes.details} style={{width:props.EventImage!=""?200:280}} onClick={chooseUser}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontFamily: "Segoe UI", fontSize: "5.7vw" }}>
            {props.Eventname}
          </Typography>
          <Typography variant="subtitle1"  style={{ fontFamily: "Segoe UI", fontSize: "4.5vw" }}>

            <Moment format=" DD/MM/YYYY">
                {props.EventDate}
            </Moment>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.9vw" }}>
            { props.EventText}
          </Typography>

        </CardContent>


      </div>
      <div style={{ width: 40, marginTop: 5  }}>
        <Button  style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 16, borderRadius: 15, fontFamily: "Segoe UI" }} 
        color="default" onClick={selectArrival} >אגיע!</Button>
          <Button  style={{ marginTop: 15, backgroundColor: "#FAE8BE", fontSize: 16, borderRadius: 15, fontFamily: "Segoe UI" }} 
        color="default" onClick={showInput}>הגב</Button>
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
