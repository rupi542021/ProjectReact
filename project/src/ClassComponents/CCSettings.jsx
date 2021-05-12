import React, { Component } from 'react';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { withRouter } from 'react-router';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

class CCSettings extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       studOBJ:JSON.parse(localStorage.getItem('student'))
    }
  }
  
  handleDeleteProfileSwal = () =>
 {
  swal({
    title: "האם ברצונך למחוק את החשבון??",
    icon: "warning",
    buttons: true,    
  })
  .then((willSave) => {
    if (willSave) {
      this.deleteProfile(this.state.studOBJ.Mail);
    }
  });
 }

 deleteProfile=(mail)=>{
  console.log("in deleteProfile ",mail );
  // let apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/'+ mail +'/deleteUserProfile';
   let apiUrl = 'https://localhost:44366/API/students/'+ mail +'/deleteUserProfile';
    fetch(apiUrl,
      {
        method: 'Delete',
        //body: JSON.stringify(stud),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        console.log('res.ok', res.ok);
        if (res.ok) {
          console.log('deleteProfile succeeded');
          swal(" החשבון נמחק :( מקווים לראותך שוב", {
            icon: "success",
          }).then( ()=>{this.props.history.push("");}        
          );
        }
        else{
          Swal.fire({
            text: ":( אופס.. משהו השתבש",
            icon: 'error',
            iconHtml: '',
            confirmButtonText: 'סגור',
            showCloseButton: true
          })
        }
        //return res.json();
      })
 }

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
              onClick={() => { this.props.history.push("/editP") }}>
              <i className="bi bi-pencil-square fa-2x" ></i><br />
              <p style={{ fontWeight: 500, fontSize: '2vh' }}>עריכת פרופיל</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2vh' }}>
            <div style={{ height: '11vh', width: '35vw', backgroundColor: '#FAE8BE', border: "0.1vh black solid", borderRadius: '30vh', margin: '3vw' }}
              onClick={this.handleDeleteProfileSwal}>
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
