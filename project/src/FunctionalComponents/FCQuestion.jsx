import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Radio, Input, Space } from 'antd';
//import { Input } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';


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
  const [value, setValue] = React.useState(1);
  const { TextArea } = Input;
  const [InputValue, setInputValue] = useState('');
  const arr1=props.Anslist.map(e=>false)

  const [arr2Post, setArr2Post] = useState(arr1);

  console.log(arr2Post);
  const handleInput=(e)=>{
    setInputValue(e.target.value)
    let q={questionnum:props.Questionnum,openAnswer:e.target.value,studAns:arr1}
    props.sendData(q)
  }

  const onChange = (e) => {
    let newArr = [...arr1];
    newArr[e.target.value-1] = true;
    setArr2Post(newArr); 
    console.log('index', e.target.value-1)
    console.log('newArr', newArr)

    console.log('radio checked', e.target.value);
    setValue(e.target.value)
    let q={questionnum:props.Questionnum,studAns:newArr}
    props.sendData(q)
  };

  const [ArrChecked, setArrChecked] = React.useState([]);

  const handleChangeCheck = (event) => {
    var index = ArrChecked.indexOf(event.target.id)
    let id=event.target.id;

    let newArr = [...arr2Post]; // copying the old datas array
    if (event.target.checked) {
      ArrChecked.push(id)

      newArr[id-1] = true;
      console.log('index', id-1)
      console.log('newArr', newArr)
      setArr2Post(newArr); 

      setArrChecked(ArrChecked);
    } else {
      ArrChecked.splice(index, 1);
      newArr[id-1] = false;
      console.log('index', id-1)
      console.log('newArr', newArr)
      setArr2Post(newArr); 
    }
    console.log('ArrChecked', ArrChecked)
    console.log('arr2Post', arr2Post)
    
    let q={questionnum:props.Questionnum,studAns:newArr}
    props.sendData(q)
  };
  
  return (
    <Card className={classes.root} style={{ direction: 'rtl', width: "95vw" }}>
      <CardContent>

        <Typography variant="h5" component="h3" style={{ fontFamily: "Segoe UI", fontSize: 20, marginBottom: 10 }}>
          {props.Questionnum + '. ' + props.QuestionText}
        </Typography>

        <Typography variant="body2" component="p">
          {props.QuestionType === "1" ?
            <Radio.Group onChange={onChange} value={value} style={{ float: 'right', marginRight: 10 }}>
            <Space direction="vertical">
                {props.Anslist && props.Anslist.map((a, index) => (
                  a !== "" ?
                   <Radio value={index+1}>{a}</Radio>
                    : ''
                ))}

                    </Space>
      </Radio.Group>
             : ''}


          {props.QuestionType === '2' ?
            // <CCCheckBoxQ Anslist={props.Anslist}/>
            <FormGroup>
              {props.Anslist && props.Anslist.map((a, index) => (
                a !== "" ?
                  <FormControlLabel
                    control={
                      <Checkbox id={index+1} 
                        onChange={handleChangeCheck}
                        name={a} color="default" />}
                    label={a} />
                  : ''))} </FormGroup>
            : ''}
          {props.QuestionType === '3' ? 
          <input className='inputMSG' value={InputValue} onChange={handleInput} />
         // <TextArea placeholder="תשובה.." autoSize onChange={handleInput} style={{ width: 270 }} /> 
          : ''}

        </Typography>
      </CardContent>

    </Card>
  );
}
