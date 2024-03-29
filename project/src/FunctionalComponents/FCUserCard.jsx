import React from 'react'
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';
import { Progress } from 'antd';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 350,
    height: 110
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 160,
    textAlign: 'right',
    padding: 1
  },
  content: {
    flex: '1 0 auto',
    padding: 1,
    marginTop: 15,
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

export default function FCUserCard(props) {
  const classes = useStyles();
  //const theme = useTheme();
  //const percentage = 66;
  const chooseUser = () => {
    props.sendData(props.obj);
  
  }
 
  const AddToFavorites = () => {
    console.log("in post favorite function");
    let sf = {
      Student1mail: props.userMail,
      Student2mail: props.id
    }
    let apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/AddToFavorites';
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
          console.log('favorite created:)');
        }
        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('post succeeded');
          props.sendFavoriteData(props.id,"add");
        }
      },
        (error) => {
          console.log("err post=", error);
        });
    console.log('end')
  }

  const DeleteFromFavorites = () => {
    console.log("in delete favorite function");

    let sf = {
      Student1mail: props.userMail,
      Student2mail: props.id
    }
    let apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/DeleteFromFavorites';
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
          props.sendFavoriteData(props.id,"remove");
        }
      });
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

  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw" }}>
      <CardMedia
        onClick={chooseUser}
        className={classes.cover}
        image={props.photo}
        title="Live from space album cover"
      />
      <div className={classes.details} style={{ width: "50vw" }} onClick={chooseUser}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontFamily: "Segoe UI", fontSize: "6vw" }}>
            {props.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.9vw" }}>
            {props.depName + " - " + props.year + "'"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.2vw"}}>
            {props.distance !=="" ? "נמצא/ת: " + props.distance + ' ק"מ ממיקומך' : ""}
          </Typography>
        </CardContent>
        {/* <div className={classes.controls}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div> */}
      </div>

      <div style={{ marginTop: 30, width: "20vw" }}>
        <Progress type="circle" percent={props.match} strokeWidth={6} width={40} strokeColor={props.match>70?"#99e831":"#4a74ff"}/>
      </div>

      <div style={{ width: 40, marginTop: 5 }}>
        <i className="bi-chat" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={toChat}></i>
        {props.isFavorite ?
          (<i className="bi-star-fill" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={DeleteFromFavorites}></i>) :
          (<i className="bi-star" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={AddToFavorites}></i>)}
      </div>
    </Card>
  );
}
