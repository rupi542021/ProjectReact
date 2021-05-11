import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { withRouter } from 'react-router';


class CCSettings extends Component {
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div style={{ height: '85vh' }}>
          <h2 style={{ marginTop: '5vh', fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>הגדרות</h2>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10vh' }}>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={() => { alert('ok') }}>
              <i className="bi bi-sliders fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>הגדרת טווחים</p>
            </div>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={() => { this.props.history.push("/userPrefernces") }}>
              <i className="bi bi-star-fill fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>שינוי העדפות</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2vh' }}>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={() => { this.props.history.push("/ChangePassword") }}>
              <i className="bi bi-shield-lock fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>שינוי סיסמה</p>
            </div>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={() => { this.props.history.push("/userProfile") }}>
              <i className="bi bi-pencil-square fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>עריכת פרופיל</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2vh' }}>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={() => { alert('ok') }}>
              <i className="bi bi-person-x fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>מחיקת חשבון</p>
            </div>
          </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCSettings)
