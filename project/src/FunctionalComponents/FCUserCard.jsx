import React from 'react'
import '../style.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


import { Progress } from 'antd';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      width:350,
      height:110
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width:160,
      textAlign:'right',
      padding:1
    },
    content: {
      flex: '1 0 auto',
      padding:1,
      marginTop:25,
      marginRight:5
    },
    cover: {
      width: 80,
      marginRight:0
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
    const theme = useTheme();
    const percentage = 66;
    function choose() {
        props.sendData(props.obj)
      
      } 
      function chooseUser(props) {
        localStorage.setItem('chooseUser',JSON.stringify(props.obj))

        props.sendData(props.obj)

      }

    return (
      <Card className={classes.root} style={{ direction: 'rtl'}} onClick={chooseUser}>
                  <CardMedia
          className={classes.cover}
          image="/images/images (3).jfif"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" style={{fontFamily: "Segoe UI",fontSize:20}}>
              {props.name+"   "+props.studage}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary"  style={{fontFamily: "Segoe UI",fontSize:14}}>
              {props.depName+" - "+props.year+"'"}
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
        
        <div style={{marginTop:30,width:70}}>
<Progress type="circle" percent={percentage} strokeWidth={6} width={40}/>
</div>

        <div style={{width:20,marginTop:5}}>
        <i className="bi-chat" style={{color:'#3D3D3D',fontSize:28}}></i>
        <i className="bi-star" style={{color:'#3D3D3D',fontSize:28}}></i>
        </div>
      </Card>
    );
  }
