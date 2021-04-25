import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrettoSlider from '../FunctionalComponents/PrettoSlider';

class CCPreferncesRanges extends Component {
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>עריכת טווחים </h3>
        </div>
        <PrettoSlider/>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCPreferncesRanges)