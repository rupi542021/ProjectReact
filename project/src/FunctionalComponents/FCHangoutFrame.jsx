
import React from 'react';
import { Circle} from 'react-shapes';
import ReactRoundedImage from "react-rounded-image";

export default function FCHangoutFrame(props) {
  function choose() {
  props.sendData(props.id)

} 

  return ( 
//   <div> 
//      <img width="50" height="50" src={props.image} style={{zIndex:1000}}/>
//     <Circle r={40} fill={{color:'transparent'}} stroke={{color:'#3D3D3D'}} strokeWidth={3}>
//     <img width="50" height="50" src={props.image}/>

//     </Circle>
//     <p style={{fontWeight:'bold'}}>{props.name}</p>
   
// </div>
<div style={{marginRight:5}} onClick={choose}>

<ReactRoundedImage
  image={props.image}
  roundedColor={props.choose?'#FAE8BE':'#96a2aa'}
  imageWidth="87"
  imageHeight="87"
  roundedSize="15"
  
/>
<p style={{fontWeight:'bold',fontSize:16,color:'#3D3D3D'}}>{props.name}</p>
</div>
  )

}
