import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link ,withRouter } from 'react-router-dom';
import { Directions } from '@material-ui/icons';


class CCHangout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hangoutArr:[]

        }
      }
      componentDidMount(){
          let OBJ={Name:"מסעדות",Image:'icons/hangout/cooking.png'}
          let OBJ2={Name:"פאבים",Image:'icons/hangout/cheers.png'}
          let OBJ3={Name:"שופינג",Image:'icons/hangout/shopping-bag.png'}
          this.setState({hangoutArr:[OBJ,OBJ2,OBJ3]})
          
      }
      renderArr=()=>{
          for (let i = 0; i < this.state.hangoutArr.length; i++) {
              const element = this.state.hangoutArr[i];
              return 
          }
      }
    render() {
        return (
            <div>
                <PrimarySearchAppBar/>
                <div >
                    <h4 style={{marginTop:50,marginBottom:10}}>בוא/י נכיר אותך קצת...</h4>
                    <h3 style={{margin:10,fontWeight:'bold'}}>איפה את/ה אוהב/ת לבלות?</h3>
                    <p>בחר את כל המקומות שאת/ה אוהב/ת להיות בהם</p>
                    
                    {this.state.hangoutArr!==null?this.state.hangoutArr.map((hangout,index)=>
                <FCHangoutFrame key={index} name={hangout.Name}  image={hangout.Image} />):""}
                    
                </div>

            </div>
        )
    }
}
export default withRouter(CCHangout)
