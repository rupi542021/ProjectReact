import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import FCUserCard from '../FunctionalComponents/FCUserCard';
import Grid from '@material-ui/core/Grid';
import { Select } from 'antd';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
import "../scrollbar.css";
import loaderGIF from '../img/loader.gif';
import FCTabNavigator from '../FunctionalComponents/FCTabNavigator';
import {getLocation} from '../App'

const filterByList = ["המחלקה שלי", "המחזור שלי","בקרבת מקום" ,"גרים קרוב אלי-מקור", "גרים קרוב אלי-נוכחי", "מעוניינים בנסיעות משותפות"]
class CCShowUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentstArr: [],
      userMail: "",
      userDep: "",
      userYear: "",
      userHomeTown: "",
      text: "",
      loading: false,
      userFriendslist: [],
      filteredList: []

    }
    this.studArr = [];
  }

  componentDidMount() {
    

    this.setState({ loading: true })
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);


    this.setState({
      userDep: studOBJ.Dep.DepartmentName, userYear: studOBJ.StudyingYear, userHomeTown: studOBJ.HomeTown.Name,
      userHomeTownX: studOBJ.HomeTown.X, userHomeTownY: studOBJ.HomeTown.Y,
      userAddressX: studOBJ.AddressStudying.X, userAddressY: studOBJ.AddressStudying.Y, CarPool: studOBJ.IntrestedInCarPool,
      userMail: studOBJ.Mail, userAddressS: studOBJ.AddressStudying.Name, userFriendslist: studOBJ.Friendslist === null ? [] : studOBJ.Friendslist
    }, () => { console.log("this.state.userFriendslist", this.state.userFriendslist) })

    console.log(studOBJ.Mail)
    console.log(studOBJ.Dep.DepartmentName)

    this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + studOBJ.Mail + '/Recommend';
    //this.apiUrl = 'https://localhost:44325/api/students/' + studOBJ.Mail + '/Recommend';
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
          console.log("fetch GetAllUsers= ", result);
          result.forEach(s => {
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
              AddressStudying: s.AddressStudying, PersonalStatus: s.PersonalStatus, FriendsList: s.Friendslist,
              Match: s.Match, IntrestedInCarPool: s.IntrestedInCarPool, IsAvailableCar: s.IsAvailableCar,
              Token:s.Token,
              Plist: s.Plist, Hlist: s.Hlist, Photo: s.Photo === "" ? "images/avatar.jpg" : 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/uploadedFiles/' + s.Photo,
            }
            //studArr.push(stud);
            this.state.studentstArr.push(stud);
          });
          this.studArr = this.state.studentstArr;
          console.log('studArr', this.studArr);
          this.setState({ studentstArr: this.state.studentstArr,filteredList:this.state.studentstArr });
          this.setState({ loading: false });
        }
      )

  }

  FilterUsers = (filterBy) => {
    var pow = require('math-power');
    console.log('studArr in filter function', this.studArr);
    console.log('studentstArr in filter function', this.state.studentstArr);
    this.setState({ studentstArr: this.studArr, text: "" }, () => {
      let filteredList = [];
      switch (filterBy) {
        case "המחלקה שלי":
          filteredList = this.state.studentstArr.filter(s => s.DepName === this.state.userDep);
          break;
        case "המחזור שלי":
          filteredList = this.state.studentstArr.filter(s => s.DepName === this.state.userDep && s.StudyingYear === this.state.userYear);
          break;
          case "בקרבת מקום":
          this.getCloseFriends();       
          break;
        case "גרים קרוב אלי-מקור":
          filteredList = this.state.studentstArr.filter(s => pow(pow((s.HomeTown.X / 1000) - (this.state.userHomeTownX / 1000), 2) + pow((s.HomeTown.Y / 1000) - (this.state.userHomeTownY / 1000), 2), 0.5) < 15);
          break;
        case "גרים קרוב אלי-נוכחי":
          filteredList = this.state.studentstArr.filter(s => pow(pow((s.AddressStudying.X / 1000) - (this.state.userAddressX / 1000), 2) + pow((s.AddressStudying.Y / 1000) - (this.state.userAddressY / 1000), 2), 0.5) < 15);
          break;
        case "מעוניינים בנסיעות משותפות":
          filteredList = this.state.studentstArr.filter(s => s.IntrestedInCarPool === true);
          break;
        default:
          filteredList = this.studArr;
          break;
      }
        if (filteredList.length !== 0) {
          console.log(filteredList);
          this.setState({ studentstArr: filteredList, text: "" });
          this.setState({ filteredList:  filteredList});
        }
        else
          this.setState({ studentstArr: [],filteredList:[], text: "אין תוצאות בסינון זה" })
    });
  }

  getCloseFriends = () => 
  {
    this.setState({ loading: true })
    this.apiUrl = 'https://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/GetCloseStudents';
    //this.apiUrl = 'https://localhost:44325/api/students/GetCloseStudents';
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
        //להוסיף ניהול שגיאות
      })
      .then(
        (result) => {
          console.log("fetch GetCloseUsers= ", result);
          let studOBJ = localStorage.getItem('student');
          studOBJ = JSON.parse(studOBJ);
          result = result.filter(sf => sf.Student1mail === studOBJ.Mail);
          console.log("result after FILTER= ", result);
          let closeFriendsArr = [];
          console.log("this.studArr= ", this.studArr);
          for (let i = 0; i < result.length; i++) {
            let idx = this.studArr.findIndex(s=> s.Mail === result[i].Student2mail);
            console.log("idx", idx);
            closeFriendsArr.push(this.studArr[idx]);            
          }
          console.log("closeFriendsArr = ", closeFriendsArr);
          if (closeFriendsArr.length !== 0) {
            this.setState({ studentstArr: closeFriendsArr, text: "" });
            this.setState({ filteredList:  closeFriendsArr});
          }
          else
            this.setState({ studentstArr: [],filteredList:[], text: "אין תוצאות בסינון זה" });
            this.setState({ loading: false });
         //return closeFriendsArr;
  }
      )
}

  getData = (userPicked) => {
    console.log("picked" + userPicked);
    localStorage.setItem('chooseUser', JSON.stringify(userPicked));
    this.props.history.push("/userProfile2");
  }

  getFavoriteData = (mailToAddOrRemove, action) => {
    let newUserFriendslist = this.state.userFriendslist;
    if (action === "add")
      newUserFriendslist.push(mailToAddOrRemove);

    else if (action === "remove")
      newUserFriendslist = newUserFriendslist.filter((s) => s !== mailToAddOrRemove);

    this.setState({ userFriendslist: newUserFriendslist })
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    studOBJ.Friendslist = newUserFriendslist;
    localStorage.setItem('student', JSON.stringify(studOBJ));
  }

  SearchUser = (val) => {
    let newList=[];
    console.log(val)
    if (val === "")
      newList=this.state.studentstArr;
    else
      newList=this.state.studentstArr.filter((item) => (item.Fname+" "+item.Lname).includes(val));
    this.setState({ filteredList: newList });
  }
  render() {
    return (
      <div className='container1'>
        <PrimarySearchAppBar />
        <div style={{ direction: 'rtl' }}>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>בוא נמצא חברים חדשים!</h3>

          <p style={{ color: '#3D3D3D', fontSize: 17 }}>גלה את החברים שלומדים איתך, שגרים ליידך </p>
          <div style={{ marginBottom: 15 }}>
            <SearchField
              onChange={this.SearchUser}
              placeholder="חיפוש..."

              // onChange={onChange}
              //searchText="חפש חבר"
              classNames="test-class"
            /></div>

          {/* <p className='labels'> סנן לפי </p> */}
          <Select style={{ width: 200, marginBottom: 5 }} placeholder="סנן לפי"
            onChange={this.FilterUsers}>
            <Select.Option value="choose">כל המשתמשים</Select.Option>
            {filterByList.map((filterBy) => (
              <Select.Option key={filterBy} value={filterBy}>{filterBy}</Select.Option>
            ))}
          </Select>
         
        </div>



        {this.state.loading ? <img src={loaderGIF} alt="loading..." style={{ width: 100, height: 100, marginTop: '17vh' }} /> : ""}
        <div className="scrollbar mx-auto" style={{ width: "100vw", height: 500, maxHeight: "55vh", marginTop: 20 }} >

          <div className='userList'>
            <h3 style={{}}>{this.state.text}</h3>
            <Grid container >

              <Grid item xs={12}>
                <PerfectScrollbar>
                  <Grid container justify="center" spacing={1}>
                    {this.state.filteredList.map((s, index) => (

                      <Grid key={index} item>
                        <FCUserCard key={index} id={s.Mail} obj={s} name={s.Fname + " " + s.Lname} match={s.Match}
                          photo={s.Photo} studage={s.DateOfBirth} depName={s.DepName} year={s.StudyingYear} sendData={this.getData}
                          isFavorite={this.state.userFriendslist ? this.state.userFriendslist.some((s1) => s1 === s.Mail) : false}
                          userMail={this.state.userMail} flist={this.state.FriendsList} sendFavoriteData={this.getFavoriteData} />
                      </Grid>
                    ))

                    }
                  </Grid>
                </PerfectScrollbar >
              </Grid>
            </Grid>
          </div>
        </div>
        <div>
          <FCTabNavigator />
        </div>
      </div>
    )
  }
}
export default withRouter(CCShowUsers)