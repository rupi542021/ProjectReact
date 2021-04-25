import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import FCPriorityDragList from '../FunctionalComponents/FCPriorityDragList';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';

class CCPriority extends Component {
 
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div>
        <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>מה חשוב לך במציאת חבר?</h3>
        <p style={{ color: '#3D3D3D', fontSize: '3vh', fontWeight:500}}> סדר לפי עדיפות </p>
        </div>
     <FCPriorityDragList/>
     <div style={{position:'fixed',bottom:0, width:'100%'}}>
          <FCTabNavigator />
          </div>
      </div>
    )
  }
}
export default withRouter(CCPriority)
