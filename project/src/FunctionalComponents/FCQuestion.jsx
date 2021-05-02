import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Input } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup'
import CCCheckBoxQ from '../ClassComponents/CCCheckBoxQ'
const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: 350,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function FCQuestion(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [value, setValue] = React.useState('female');
  const { TextArea } = Input;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [state, setState] = React.useState({

    gilad: true,
    jason: false,
    antoine: false,


  });
  const [checked, setchecked] = React.useState(false);
  const [ArrChecked, setArrChecked] = React.useState([]);

  const handleChangeCheck = (event) => {

    var index = ArrChecked.indexOf(event.target.name)
    if (index !== -1) {
      ArrChecked.splice(index, 1);
      console.log('ArrChecked', ArrChecked)
    }
    else {
      ArrChecked.push(event.target.name)
      console.log('ArrChecked', ArrChecked)
    }
    //setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw" }}>
      <CardContent>

        <Typography variant="h5" component="h3" style={{ fontFamily: "Segoe UI", fontSize: 20, marginBottom: 10 }}>
          {props.Questionnum + '. ' + props.QuestionText}
        </Typography>

        <Typography variant="body2" component="p">
          {props.QuestionType === "1" ?
            <FormControl component="fieldset" style={{ float: 'right', marginRight: 10 }}>
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} >
                {props.Anslist && props.Anslist.map((a, index) => (
                  a !== "" ?
                    <FormControlLabel value={a} control={<Radio color="default" />} label={a} /> : ''
                ))}

              </RadioGroup>
            </FormControl> : ''}
          {props.QuestionType === '2' ?
            // <CCCheckBoxQ Anslist={props.Anslist}/>
            <FormGroup>
              {props.Anslist && props.Anslist.map((a, index) => (
                a !== "" ?
                  <FormControlLabel
                    control={
                      <Checkbox id={index} checked={ArrChecked.indexOf(a) !== -1} 
                        onChange={handleChangeCheck}
                        name={a} color="default" />}
                    label={a} />
                  : ''))} </FormGroup>
            : ''}
          {props.QuestionType === '3' ? <TextArea placeholder="תשובה.." autoSize style={{ width: 270 }} /> : ''}

        </Typography>
      </CardContent>

    </Card>
  );
}
