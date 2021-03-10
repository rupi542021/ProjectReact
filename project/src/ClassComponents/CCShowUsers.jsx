import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import FCUserCard from '../FunctionalComponents/FCUserCard';
import Grid from '@material-ui/core/Grid';
import { Form, Radio, Select, DatePicker, Checkbox } from 'antd';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
import Button from '@material-ui/core/Button';
import { MDBContainer } from "mdbreact";
import "../scrollbar.css";

const ScrollBarPage = () => {
    const scrollContainerStyle = { width: "800px", maxHeight: "400px" };
}

const filterByList = ["המחלקה שלי", "המחזור שלי", "הישוב שלי"]
const studArr = [];
class CCShowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentstArr: studArr,
            userMail: "",
            userDep: "",
            userYear: "",
            userHomeTown: "",
            text: "",
            userFriendslist: []


        }
    }

    componentDidMount() {
        let studOBJ = localStorage.getItem('student');
        studOBJ = JSON.parse(studOBJ);
        this.setState({
            userDep: studOBJ.DepName, userYear: studOBJ.StudyingYear,
            userHomeTown: studOBJ.HomeTown,
            userFriendslist: studOBJ.Friendslist !== null ? studOBJ.Friendslist : [],
            userMail: studOBJ.Mail
        })


        console.log(studOBJ.Mail)
        console.log(studOBJ.DepName)

        this.apiUrl = 'https://localhost:44325/api/students/' + studOBJ.Mail + '/without';
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
                            Photo: s.Photo, AddressStudying: s.AddressStudying, PersonalStatus: s.PersonalStatus,
                            Plist: s.Plist, Hlist: s.Hlist
                        }
                        studArr.push(stud);
                    });
                    console.log(studArr);
                    this.setState({ studentstArr: studArr });
                }
            )

    }
    getData = (mail) => {
        ////////////פה נכניס משהו שקשור לבחירת המשתמש

        this.setState({ studentstArr: studArr });
        console.log(studArr)
    }

    FilterUsers = (filterBy) => {
        if (filterBy == "המחלקה שלי") {
            let filterbydep = this.state.studentstArr.filter(s => s.DepName == this.state.userDep)
            console.log(filterbydep);
            if (filterbydep.length !== 0)
                this.setState({ studentstArr: filterbydep })
            else
                this.setState({ studentstArr: [], text: "אין תוצאות בסינון זה" })
        }
        if (filterBy == "choose") {
            this.setState({ studentstArr: studArr });
        }
        if (filterBy == "המחזור שלי") {
            let filterbyclass = this.state.studentstArr.filter(s => s.DepName == this.state.userDep && s.StudyingYear == this.state.userYear)
            console.log(filterbyclass);
            if (filterbyclass.length !== 0)
                this.setState({ studentstArr: filterbyclass })
            else
                this.setState({ studentstArr: [], text: "אין תוצאות בסינון זה" })
        }
        if (filterBy == "הישוב שלי") {
            let filterbydep = this.state.studentstArr.filter(s => s.HomeTown == this.state.userHomeTown)
            console.log(filterbydep);
            if (filterbydep.length !== 0)
                this.setState({ studentstArr: filterbydep })
            else
                this.setState({ studentstArr: [], text: "אין תוצאות בסינון זה" })
        }

    }
    getData = (userPicked) => {
        console.log(userPicked);
        localStorage.setItem('chooseUser', JSON.stringify(userPicked));
        this.props.history.push("/userProfile2");
    }

    getFavoriteData = (favMail) =>{
        let studentToAdd ={
            Mail: favMail
        }
        let newUserFriendslist=this.state.userFriendslist
        newUserFriendslist.push(studentToAdd)
        this.setState({userFriendslist: newUserFriendslist})
        let studOBJ = localStorage.getItem('student');
        studOBJ = JSON.parse(studOBJ);
        studOBJ.Friendslist=newUserFriendslist;
        localStorage.setItem('student', JSON.stringify(studOBJ));
    }

    SearchUser = (val) => {
        let filtered_list = this.state.studentstArr.filter((item) => item.Fname.includes(val) || item.Lname.includes(val));
        if (val == "")
            this.setState({ studentstArr: studArr });
        else
            this.setState({ studentstArr: filtered_list })

    }
    render() {
        return (
            <div className='container1'>



                <PrimarySearchAppBar />
                <div>
                    <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>בוא נמצא חברים חדשים!</h3>

                    <p style={{ color: '#3D3D3D', fontSize: 17 }}>גלה את החברים שלומדים איתך, שגרים ליידך </p>
                    <div style={{ marginBottom: 15 }}>
                        <SearchField
                            onChange={this.SearchUser}
                            placeholder="Search..."

                            // onChange={onChange}
                            //searchText="חפש חבר"
                            classNames="test-class"
                        /></div>

                    {/* <p className='labels'> סנן לפי </p> */}
                    <Select style={{ width: 200, marginBottom: 10 }} placeholder="סנן לפי"
                        onChange={this.FilterUsers}>
                        <Select.Option value="choose">כל המשתמשים</Select.Option>
                        {filterByList.map((filterBy) => (
                            <Select.Option key={filterBy} value={filterBy}>{filterBy}</Select.Option>
                        ))}
                    </Select>
                </div>

                <h3 >{this.state.text}</h3>

                <div className="scrollbar my-5 mx-auto" style={{ width: "100vw", maxHeight: "400px" }} >

                    <div className='userList'>
                        <Grid container >
                            <Grid item xs={12}>
                                <PerfectScrollbar>
                                    <Grid container justify="center" spacing={1}>
                                        {this.state.studentstArr.map((s, index) => (
                                            <Grid key={index} item>
                                                <FCUserCard key={index} id={s.Mail} obj={s} name={s.Fname + " " + s.Lname} photo={s.Photo} studage={s.DateOfBirth} depName={s.DepName} year={s.StudyingYear}
                                                    isFavorite={this.state.userFriendslist.some((s1) => s1.Mail === s.Mail)} userMail={this.state.userMail} sendData={this.getData} sendFavoriteData={this.getFavoriteData}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </PerfectScrollbar>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(CCShowUsers)