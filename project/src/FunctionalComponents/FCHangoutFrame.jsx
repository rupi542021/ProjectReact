
import React from 'react';
import { Circle} from 'react-shapes';

export default function FCHangoutFrame(props) {
  return ( <div > 
     <img width="50" height="50" src={props.image} style={{zIndex:1000}}/>
    <Circle r={40} fill={{color:'transparent'}} stroke={{color:'#3D3D3D'}} strokeWidth={3}></Circle>
    <p style={{fontWeight:'bold'}}>{props.name}</p>
   
</div>
  )

}
