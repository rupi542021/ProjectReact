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

  const [distance1, updatedistance1] = useState(props.distance1);

  const handleSliderChange =(e) =>
  {
    console.log("in handleSliderChange",e.target.innerText);
    //updatedistance1(e.target.innerText);
    
  }

  return (
    <div style={{width:'70vw', margin:'0px auto'}}>
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={props.distance1}
      onChange = {handleSliderChange} />
    </div>
  )
}
