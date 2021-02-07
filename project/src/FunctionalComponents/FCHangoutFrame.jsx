
import React from 'react';
import { Circle} from 'react-shapes';
import ReactRoundedImage from "react-rounded-image";

export default function FCHangoutFrame(props) {
  var CircleColor="#96a2aa"
  function choose() {
    CircleColor="#FAE8BE"
  props.sendData(props.name,props.image)
} 
function ifchoose() {
  props.arrHangoutsNames
  return "#FAE8BE"
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
  roundedColor={ifchoose}
  imageWidth="87"
  imageHeight="87"
  roundedSize="15"
  hoverColor="#FAE8BE"
  
/>
<p style={{fontWeight:'bold',fontSize:16,color:'#3D3D3D'}}>{props.name}</p>
</div>
  )

}
