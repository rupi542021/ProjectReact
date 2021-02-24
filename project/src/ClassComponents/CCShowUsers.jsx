import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import FCUserCard from '../FunctionalComponents/FCUserCard';
import Grid from '@material-ui/core/Grid';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../style.css';
import SearchField from "react-search-field";
import Button from '@material-ui/core/Button';

const studArr = [];
class CCShowUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentstArr: studArr,
            userDep:"",
            userYear:"",
            filterToggleDep:true,
            filterToggleClass:true,
            filterBtnTextDep:"המחלקה שלי",
            filterBtnTextClass:"המחזור שלי"


        }
    }

    componentDidMount() {
        let studOBJ = localStorage.getItem('student');
        studOBJ = JSON.parse(studOBJ);
        this.setState({userDep:studOBJ.Dep.DepartmentName})
        this.setState({userYear:studOBJ.StudyingYear})

        console.log(studOBJ.Mail)
        console.log(studOBJ.Dep.DepartmentName)
        
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
                        let stud = { Mail: s.Mail, Fname: s.Fname, Lname: s.Lname, DateOfBirth: age, DepName: s.Dep.DepartmentName, HomeTown: s.HomeTown, StudyingYear: studYear, Photo: s.Photo, AddressStudying: s.AddressStudying }
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
    btnFilterByDep=()=>{
        let filterToggle1=this.state.filterToggleDep
        if(filterToggle1){
            let filterbydep=this.state.studentstArr.filter(s=>s.DepName==this.state.userDep)
            console.log(filterbydep);
            this.setState({filterToggleDep:false,filterBtnTextDep:"כל המשתמשים"})
            if(filterbydep.length!==0)
                this.setState({studentstArr:filterbydep})
            else
                this.setState({studentstArr:[]})
        }
        else{
            this.setState({ studentstArr: studArr,filterToggleDep:true,filterBtnTextDep:"המחלקה שלי" });
        } 
    }
    btnFilterByClass=()=>{
        let filterToggle1=this.state.filterToggleClass
        if(filterToggle1){
            let filterbyclass=this.state.studentstArr.filter(s=>s.DepName==this.state.userDep&&s.StudyingYear==this.state.userYear)
            console.log(filterbyclass);
            this.setState({filterToggleClass:false,filterBtnTextClass:"כל המשתמשים"})
            if(filterbyclass.length!==0)
                this.setState({studentstArr:filterbyclass})
            else
                this.setState({studentstArr:[]})
        }
        else{
            this.setState({ studentstArr: studArr,filterToggleClass:true,filterBtnTextClass:"המחזור שלי" });
        } 
    }
    render() {
        return (
            <div  >
                <PrimarySearchAppBar />

                <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>בוא נמצא חברים חדשים!</h3>

                <p style={{ color: '#3D3D3D', fontSize: 17 }}>גלה את החברים שלומדים איתך, שגרים ליידך </p>
                <div style={{ marginBottom: 15 }}>
                    <SearchField
                        placeholder="Search..."
                        // onChange={onChange}
                        searchText="חפש חבר"
                        classNames="test-class"
                    /></div>
                <Button variant="contained"
                    style={{ paddingTop: 3, marginBottom: 10, backgroundColor: "#FAE8BE", fontSize: 16, borderRadius: 20, fontFamily: "Segoe UI" }}
                onClick={this.btnFilterByDep}
                >{this.state.filterBtnTextDep}</Button>
                                <Button variant="contained"
                    style={{ paddingTop: 3, marginBottom: 10, backgroundColor: "#FAE8BE", fontSize: 16, borderRadius: 20, fontFamily: "Segoe UI" }}
                onClick={this.btnFilterByClass}
                >{this.state.filterBtnTextClass}</Button>
                <div>
                    <Grid container >
                        <Grid item xs={12}>
                            <PerfectScrollbar>
                                <Grid container justify="center" spacing={1}>
                                    {this.state.studentstArr.map((s, index) => (
                                        <Grid key={index} item>
                                            <FCUserCard key={index} id={s.Mail} name={s.Fname + " " + s.Lname} photo={s.Photo} studage={s.DateOfBirth} depName={s.DepName} year={s.StudyingYear} sendData={this.getData} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </PerfectScrollbar>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
export default withRouter(CCShowUsers)