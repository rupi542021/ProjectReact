import React, { Component } from 'react'
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';


class CCLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    
    this.setState({
       studDep: studOBJ.Dep.DepartmentName,stutsYear: studOBJ.StudyingYear
    })
    var StudyingYearN=0;
    switch (studOBJ.StudyingYear) {
      case 'א':
        StudyingYearN=1
        break;
      case 'ב':
        StudyingYearN=2
        break;
      case 'ג':
        StudyingYearN=3
        break;
      case 'ד':
        StudyingYearN=4
        break;

      default:
        break;
    }
    console.log('studOBJ.Dep.DepartmentCode',studOBJ.Dep.DepartmentCode)
    console.log('StudyingYearN',StudyingYearN)
     // this.apiUrl = 'https://localhost:44325/API/students/' + studOBJ.Dep.DepartmentCode + '/' + StudyingYearN+'/links';
      this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + studOBJ.Dep.DepartmentCode + '/' + StudyingYearN+'/links';
        console.log('GETstart btnFetchGetLinks');
        fetch(this.apiUrl,
          {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8'
            })
          })
          .then((res) => {
            console.log('res.ok', res.ok);
            if (!res.ok) {
                  throw Error('אופס! משהו לא עבד. אנא נסה שנית');              
            }
            return res.json();
          })
          .then(
            (result) => {
              console.log("fetch btnFetchGetLinks= ", result);
              console.log('Links',result.DriveLink)
              this.setState({drive:result.DriveLink,whatsapp:result.WhatsappLink})
            })
          .catch((error) => {
            console.log("err get=", error);
          });
  }

  back2Page=()=>
  {
   let path = '/userProfile';
   this.props.history.push(path);

  }
  render() {
    return (
      <div>
        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl',position: 'absolute', marginRight: 5,right:1, zIndex:16 }}>
            <i className="bi bi-arrow-right-circle" style={{ color: '#3D3D3D', fontSize: 28 }} onClick={this.back2Page}></i>

          </div>
        <div style={{ direction: 'rtl', height: '83vh', width: '100%' }}>
        <h5 style={{ width: '100%', fontWeight: 'bold', marginTop: 60, fontSize: '9.5vw' }}>קישורים חשובים</h5>
        <h5 style={{ width: '100%', fontWeight: 'bold', marginTop: 20,marginBottom:50, fontSize: '6.5vw' }}>{this.state.studDep+" - שנה "+this.state.stutsYear}</h5>
 
          <img style={{width:55,marginBottom:10}}src={'images/whatsapp3.png'} />
          <div style={{  marginBottom: 50 }}>
          <Link style={{ width: '100%', marginTop: 100, fontSize: '5.5vw', fontWeight: 'bold' }}
          href={this.state.whatsapp} >{'קישור לקבוצת Whatsapp כיתתית'} </Link>
       </div>
       <img style={{width:50,marginBottom:10}}src={'images/drive2.png'} />
       <div>
          <Link style={{ width: '100%', marginTop: 100, fontSize: '5.5vw', fontWeight: 'bold' }}
           href={this.state.drive}>{'קישור ל-Google Drive מחלקתי'} </Link>
           </div>
        </div>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}

export default withRouter(CCLinks);
