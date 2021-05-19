import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function PrettoSlider1(props) {
  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const handleSliderChange =(e) =>
  {
    console.log("in handleSliderChange",e.target.innerText);    
  }

  const storeDist1 =(e) => {
    let dist = e.target.innerText;
    console.log("in storeDist1",dist);
    updatedist1(dist);
    localStorage.setItem('dist1',dist);
  }

  // const handleBlur =(e) =>
  // {
  //   console.log("in handleDragEnd",e.target.innerText);
  //   props.sendVal2Parent(e.target.innerText);
  // }

  const [dist1, updatedist1] = useState(props.distance1);

  return (
    <div style={{width:'70vw', margin:'0px auto'}}>
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={dist1}
      onChange = {handleSliderChange}
      // onBlur={handleBlur}
      onChangeCommitted={storeDist1}
       />
    </div>
  )
}
