import React from 'react'
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import '../styleChat.css';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 350,
    height: 80,
    
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 290,
    textAlign: 'right',
    padding: 0
  },
  content: {
    flex: '1 0 auto',
    padding: 1,
    marginTop: 10,
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

export default function FCChatRoom(props) {
  const classes = useStyles();
  //const theme = useTheme();
  //const percentage = 66;
  const chooseUser = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
      let sOBJ={
          Mail:props.FromMail==studOBJ.Mail?props.ToMail:props.FromMail,
          Photo:props.Photo,
          Lname:props.Lname,
          Fname:props.Fname,
          Token:props.Token
      }
    props.sendData(sOBJ);
  
  }
 

  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw",marginBottom:5 }}>
<CardMedia
      style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        margin: 10
      }}
        onClick={chooseUser}
        className={classes.cover}
        image={props.Photo}
        title="Live from space album cover"
      />
      <div className={classes.details} style={{ width:"53vw" }} 
      onClick={chooseUser}
      >
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontFamily: "Segoe UI", fontSize: props.Lname!==""?"6vw":"5vw"}}>
            {props.Fname+' '+props.Lname}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.9vw" }}>
            {props.text.length>20?props.text.slice(0,18)+" ...":props.text}
          </Typography>
        </CardContent>
    
      </div>
      <div>
      <Typography className={classes.title} color="textSecondary" gutterBottom style={{width:80}}>
         
          <Moment format=" DD/MM hh:mm" style={{fontSize:12,zIndex:10}}>
                {new Date(props.createdAt.seconds * 1000).toString()}
            </Moment>
        </Typography>
      </div>
    </Card>
  );
}
