import React from 'react'
import '../style.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


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
    marginTop: 25,
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

export default function FCFavoriteCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  //const percentage = 66;
  const chooseUser = () => {
    props.sendData(props.obj);
  }
 
  const DeleteFromFavorites = () => {
    console.log("in delete favorite function");

    let sf = {
      Student1mail: props.userMail,
      Student2mail: props.id
    }
    let apiUrl = 'https://localhost:44325/api/students/DeleteFromFavorites';
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
          props.sendFavoriteData(props.id);
        }
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
      <div className={classes.details} style={{ width: "60vw" }} onClick={chooseUser}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" style={{ fontFamily: "Segoe UI", fontSize: "6vw" }}>
            {props.name + "   " + props.studage}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: "Segoe UI", fontSize: "3.8vw" }}>
            {props.depName + " - " + props.year + "'"}
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

      <div style={{ width: 40, marginTop: 5 }}>
        <i className="bi-chat" style={{ color: '#3D3D3D', fontSize: 28 }}></i>
        <i className="bi-star-fill" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={DeleteFromFavorites}></i>
      </div>
    </Card>
  );
}
