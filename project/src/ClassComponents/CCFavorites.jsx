import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import FCFavoriteCard from '../FunctionalComponents/FCFavoriteCard';
import Grid from '@material-ui/core/Grid';
// import { Form, Radio, Select, DatePicker, Checkbox } from 'antd';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
// import Button from '@material-ui/core/Button';
// import { MDBContainer } from "mdbreact";
import "../scrollbar.css";
import loaderGIF from '../img/loader.gif';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';

// const ScrollBarPage = () => {
//   const scrollContainerStyle = { width: "800px", maxHeight: "400px" };
// }

class CCFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentstArr: [],
      userMail: "",
      userDep: "",
      userYear: "",
      userHomeTown: "",
      text: "אין מועדפים",
      loading: false,
      userFriendslist: [],
    }
    this.studArr = [];
  }

  componentDidMount() {
    this.setState({ loading: true })
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    this.setState({
      userDep: studOBJ.Dep.DepartmentName, userYear: studOBJ.StudyingYear, userHomeTown: studOBJ.HomeTown.Name,
      userMail: studOBJ.Mail, userAddressS: studOBJ.AddressStudying.Name, userFriendslist: studOBJ.Friendslist
    }, () => { console.log("this.state.userFriendslist", this.state.userFriendslist) })
    console.log(studOBJ.Mail)
    console.log(studOBJ.DepName)
    this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + studOBJ.Mail + '/GetAllFavorites';
    console.log('GETstart');
    fetch(this.apiUrl,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch GetAllFavorites= ", result);
          result.forEach(s => {
            console.log(s.Mail);
            let arr = s.DateOfBirth.split("T");
            var getAge = require('get-age')
            let age = getAge(arr[0])
            let studYear = ""
            switch (s.StudyingYear) {
              case 1:
                studYear = "א"
                break;
              case 2:
                studYear = "ב"
                break;
              case 3:
                studYear = "ג"
                break;
              case 4:
                studYear = "ד"
                break;

              default:
                break;
            }
            let stud = {
              Mail: s.Mail, Fname: s.Fname, Lname: s.Lname, DateOfBirth: age,
              DepName: s.Dep.DepartmentName, HomeTown: s.HomeTown, StudyingYear: studYear,
              AddressStudying: s.AddressStudying, PersonalStatus: s.PersonalStatus,
              Match: s.Match,IntrestedInCarPool:s.IntrestedInCarPool,IsAvailableCar:s.IsAvailableCar,
              Plist: s.Plist, Hlist: s.Hlist, Photo: s.Photo === "" ? "images/avatar.jpg" : "http://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/"+s.Photo
            }
            //studArr.push(stud);
            this.state.studentstArr.push(stud);
          });
          this.studArr = this.state.studentstArr;
          console.log('studArr', this.studArr);
          console.log('studentstArr', this.state.studentstArr);
          this.setState({ studentstArr: this.state.studentstArr });
          this.setState({ loading: false });
        }
      )

  }

  getData = (userPicked) => {
    console.log(userPicked);
    localStorage.setItem('chooseUser', JSON.stringify(userPicked));
    this.props.history.push("/userProfile2");

  }
  getFavoriteData = (mail2Remove) => {
    let newUserFriendslist = this.state.studentstArr;
    newUserFriendslist = newUserFriendslist.filter((s) => s.Mail !== mail2Remove);
    let newUserFriendslistEmails = newUserFriendslist.map((s=>s.Mail))
    this.setState({ studentstArr: newUserFriendslist })
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    studOBJ.Friendslist = newUserFriendslistEmails;
    localStorage.setItem('student', JSON.stringify(studOBJ));
  }

  SearchUser = (val) => {
    let filtered_list = this.state.studentstArr.filter((item) => item.Fname.includes(val) || item.Lname.includes(val));
    if (val === "")
      this.setState({ studentstArr: this.studArr });
    else
      this.setState({ studentstArr: filtered_list })

  }
  render() {
    return (
      <div className='container1'>



        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl' }}>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>המועדפים שלי</h3>

          <div style={{ marginBottom: 15,marginTop:15 }}>
            <SearchField
              onChange={this.SearchUser}
              placeholder="חיפוש..."
              classNames="test-class"
            /></div>
         
        </div>

        {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
        <div className="scrollbar mx-auto" style={{ width: "100vw", height: 500, maxHeight: "445px", marginTop: 20 }} >

          <div className='userList'>
            {this.state.studentstArr.length===0&&this.state.loading===false?<h3>{this.state.text}</h3>:
            <Grid container >

              <Grid item xs={12}>
                <PerfectScrollbar>
                  <Grid container justify="center" spacing={1}>
                    {this.state.studentstArr.map((sf, index) => (

                      <Grid key={index} item>
         
                        <FCFavoriteCard key={index} id={sf.Mail} obj={sf} name={sf.Fname + " " + sf.Lname} match={null}
                          photo={sf.Photo} studage={sf.DateOfBirth} depName={sf.DepName} year={sf.StudyingYear} sendData={this.getData}
                          userMail={this.state.userMail} sendFavoriteData={this.getFavoriteData} />
                      </Grid>
                    ))

                    }
                  </Grid>
                </PerfectScrollbar>
              </Grid>
            </Grid>}
          </div>
        </div>
        <FCTabNavigator />
      </div>
    )
  }
}
export default withRouter(CCFavorites)