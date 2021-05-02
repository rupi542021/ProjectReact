import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FCDragList from '../FunctionalComponents/FCDragList';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import Button from '@material-ui/core/Button';

const optionsArr = [
  {
    name: 'מקומות בילוי',
    icon: "bi bi-emoji-sunglasses-fill"
  },
  {
    name: 'תחביבים',
    icon: 'bi bi-controller'
  },
  {
    name: 'חברים משותפים',
    icon: "bi bi-person-circle"
  },
  {
    name: 'קרבת מקום מגורים',
    icon: "bi bi-geo-alt-fill"
  },
  {
    name: 'שנת לימודים',
    icon: "bi bi-signpost-2-fill"
  },
  {
    name: 'מחלקה',
    icon: "bi bi-building"
  },
  {
    name: 'סטטוס זוגי',
    icon: "bi bi-heart-fill"
  },
  {
    name: 'גיל',
    icon: "bi bi-calendar-event"
  }
]
class CCUserPrefernces extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userPreferences: [],
    }
  }

  componentDidMount = () => {
    console.log('userPreferences before:', this.state.userPreferences);
    this.setState({ userPreferences: optionsArr }, () => { console.log('userPreferences after:', this.state.userPreferences); });
  }

  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>מה חשוב לך במציאת חבר?</h3>
          {/* <p style={{ color: '#3D3D3D', fontSize: '3vh', fontWeight:500}}> סדר לפי עדיפות </p> */}
        </div>
        {this.state.userPreferences.length > 0 ?
          <FCDragList preferences={this.state.userPreferences}/> : ''}
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCUserPrefernces)
