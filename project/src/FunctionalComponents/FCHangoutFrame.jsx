
import React from 'react';
import { Circle} from 'react-shapes';

export default function FCHangoutFrame(props) {
  return ( <div> 
    <Circle r={40} fill={{color:'transparent'}} stroke={{color:'#3D3D3D'}} strokeWidth={3} />
    <p style={{fontWeight:'bold'}}>{props.name}</p>
    <img width="40" height="40" src={'/icons/cheers.png'}/>
    <p>{props.image}</p>

</div>
  )

}
