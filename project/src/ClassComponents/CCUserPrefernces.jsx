import React, { Component } from 'react';
import { withRouter } from 'react-router';
import FCDragList from '../FunctionalComponents/FCDragList';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import Swal from 'sweetalert2';

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
    this.studOBJ = JSON.parse(localStorage.getItem('student'));
  }

  componentDidMount = () => {
    // this.getPreferncesFromDB(studOBJ.Mail);
    console.log('userPreferences before:', this.state.userPreferences);
    let userPreferences = [];
    // for (let p = 0; p < this.studOBJ.Preflist.length; p++) {
    //   let pr = {code:this.studOBJ.Preflist[p].Prefcode,name:this.studOBJ.Preflist[p].Prefname, icon: this.studOBJ.Preflist[p].Preficon};
    //   userPreferences.push(pr);   
    // }
    console.log("this.studOBJ.Preflist", this.studOBJ.Preflist);
    this.setState({ userPreferences: this.studOBJ.Preflist }, () => { console.log('userPreferences after:', this.state.userPreferences); });
  }

  // getPreferncesFromDB=(mail)=>
  // {
  //   this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + mail + '/getAllPrefernces';
  //    console.log('GETstart');
  //    fetch(this.apiUrl,
  //      {
  //        method: 'GET',
  //        headers: new Headers({
  //          'Content-Type': 'application/json; charset=UTF-8',
  //          'Accept': 'application/json; charset=UTF-8'
  //        })
  //      })
  //      .then((res) => {
  //        console.log('res=', res);
  //        console.log('res.ok', res.ok);
  //        if (!res.ok) {
  //          if (res.status === 404) {
  //            throw Error('כתובת המייל אינה נמצאת במערכת')
  //          }
  //          if (res.status === 400) {
  //            throw Error('כתובת המייל כבר נמצאת במערכת')
  //          }

  //          if (res.status === 500) {
  //            throw Error('בעיה בהתחברות לשרת')
  //          }
  //        }
  //        return res.json();
  //      })
  //      .then(
  //        (result) => {
  //          console.log("fetch btnFetchGetStudents= ", result);
  //          //if (result.Mail !== null) {
  //            localStorage.setItem('student', JSON.stringify(result));
  //            Swal.fire({
  //              title: 'אימות המייל בוצע בהצלחה',
  //              icon: 'success',
  //              iconHtml: '',
  //              confirmButtonText: 'המשך',
  //              showCloseButton: true
  //            }).then(() => {

  //              this.props.history.push("/signin2");

  //            });
  //          }
  //        //  else {
  //          //   Swal.fire({
  //          //     title: 'כתובת המייל אינה נמצאת במערכת',
  //          //     icon: 'error',
  //          //     iconHtml: '',
  //          //     confirmButtonText: 'סגור',
  //          //     showCloseButton: true
  //          //   })
  //          // }
  //       // }
  //      )
  //      .catch((error) => {
  //        console.log("err get=", error.message);
  //        Swal.fire({
  //              title: error.message,
  //              icon: 'error',
  //              iconHtml: '',
  //              confirmButtonText: 'סגור',
  //              showCloseButton: true
  //            })
  //      })
  //    console.log('end');

  //    //alert("Form submitted");
  //  }

  render() {
    return (
      <div>
        <div>
          <PrimarySearchAppBar />
          <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: '7vw', position: 'absolute', right: 0 }}
            onClick={() => this.props.history.push('/Settings')}></i>
        </div>
        <div style={{ marginTop: '5vh' }}>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D' }}>מה חשוב לך במציאת חבר?</h3>
          {/* <p style={{ color: '#3D3D3D', fontSize: '3vh', fontWeight:500}}> סדר לפי עדיפות </p> */}
          {this.state.userPreferences.length > 0 ?
            <FCDragList preferences={this.state.userPreferences} studOBJ={this.studOBJ} /> : ''}
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCUserPrefernces)
