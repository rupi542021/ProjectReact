import React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function PrettoSlider() {
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
    console.log("in handleSliderChange")
  }

  return (
    <div style={{width:'60%', margin:'0px auto'}}>
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={15}
      onChange = {handleSliderChange()}
      onDragEnd={handleSliderChange()} />
    </div>
  )
}
