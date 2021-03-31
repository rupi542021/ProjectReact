import React, { Component } from 'react'
import FCHangoutFrame from '../FunctionalComponents/FCHangoutFrame';
import PrimarySearchAppBar from '../FunctionalComponents/PrimarySearchAppBar';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Progress } from 'antd';
import Rotation from 'react-rotation';
import Swal from 'sweetalert2';


class CCHobbies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hobbiesArr: []

    }
  }
  componentDidMount() {
    this.apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/GetAllHoddies';
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
          let HobbyArr = [];
          console.log("fetch GetAllHobbies= ", result);
          let studHobbies = localStorage.getItem('student');
          studHobbies = JSON.parse(studHobbies);
          studHobbies = studHobbies.Hlist;
          if (studHobbies !== null) {
            let studHobbiesNames = studHobbies.map(h => h.Hname);
            result.forEach(hobby => {
              if (studHobbiesNames.includes(hobby.Hname)) {
                let h = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon, Choose: true }
                HobbyArr.push(h);
              }
              else {
                let h = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon, Choose: false }
                HobbyArr.push(h);
              }
            });
          }
          else {
            result.forEach(hobby => {
              let h = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon, Choose: false }
              HobbyArr.push(h);
            });
          }

          console.log(HobbyArr);
          this.setState({ hobbiesArr: HobbyArr });
        }
      )
  }
  getData = (ID) => {
    this.state.hobbiesArr[ID].Choose = !this.state.hobbiesArr[ID].Choose;
    this.setState({ hobbiesArr: this.state.hobbiesArr });
    console.log(this.state.hobbiesArr)
  }

  btnFinished = () => {
    let studOBJ = localStorage.getItem('student');
    studOBJ = JSON.parse(studOBJ);
    studOBJ.Hlist = this.state.hobbiesArr.filter(hobby => hobby.Choose);
    if (studOBJ.Hlist.length > 0) {
      let newHlist = [];
      let newHobby;
      studOBJ.Hlist.forEach(hobby => {
        newHobby = { Hcode: hobby.Hcode, Hname: hobby.Hname, Hicon: hobby.Hicon };
        newHlist.push(newHobby);
      });
      studOBJ.Hlist = newHlist;
      console.log("New Hlist = ", studOBJ.Hlist);
    }

    // let arr=studOBJ.DateOfBirth.split("T");
    // let bday = arr[0] +" "+ arr[1];
    // studOBJ.DateOfBirth = bday;
    // arr = studOBJ.RegistrationDate.split("T");
    // let regDay = arr[0] +" "+ arr[1];
    // studOBJ.RegistrationDate = regDay;
    let today = new Date();
    studOBJ.RegistrationDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // studOBJ.RegistrationDate = new Date().toLocaleString();

    localStorage.setItem('student', JSON.stringify(studOBJ));
    //this.props.history.push("/hobbies");
    console.log("studOBJ2post", studOBJ);
    this.postStudent2DB(studOBJ);


  }

  postStudent2DB = (student) => {
    console.log("in post student function");
    console.log("studetOBJ in post finction", student);
    this.apiUrl = 'https://localhost:44325/api/students'
    fetch(this.apiUrl,
      {
        method: 'POST',
        body: JSON.stringify(student),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8'
        })
      })
      .then(res => {
        console.log('res=', res);
        console.log('res.status', res.status);
        if (res.status === 201) {
          console.log('student created:)');
        }
        console.log('res.ok', res.ok);

        if (res.ok) {
          console.log('post succeeded');
          Swal.fire({
            title: 'הפרופיל נוצר בהצלחה',
            icon: 'success',
            iconHtml: '',
            confirmButtonText: 'המשך',
            showCloseButton: true
          }).then(() => {

            this.props.history.push("/userProfile");

          });
        }

        else if (!res.ok) {
          throw Error('אופס! משהו לא עבד. אנא נסה שנית');
        }

       // return res.json()
      })
      .catch((error) => {
        console.log("err get=", error.message);
        Swal.fire({
              title: "!אופס",
              text: "משהו לא עבד. אנא נסה שנית", 
              icon: 'error',
              iconHtml: '',
              confirmButtonText: 'סגור',
              showCloseButton: true
            })
      })
    // .then(
    //   (result) => {
    //     console.log("fetch btnFetchGetStudents= ", result);
    //     this.props.history.push("/userProfile");
    //   },
    //   (error) => {
    //     console.log("err post=", error);
    //   });
    //console.log('end');
  }

  render() {
    return (
      <div>
               <div className='rowC' style={{ width: '100%', height: 60, backgroundColor: "#FAE8BE" }}>
          <img src="icons/high-five.png" style={{ width: 30, height: 30, marginBottom: 15, marginRight: 10 }}></img>
          <h4 style={{ color: "#3D3D3D" }}>Better Together</h4>
        </div>

        <Progress percent={100} showInfo={false} strokeColor="#3D3D3D" trailColor='white' strokeWidth={15}
          style={{ width: 300, marginTop: 10, transform: `rotate(180deg)` }} />

        <div style={{ direction: 'rtl' }}>
          <h4 style={{ marginTop: 10, marginBottom: 8, direction: 'rtl', color: '#3D3D3D' }}>וממש עוד קצת...</h4>
          <h3 style={{ margin: 5, fontWeight: 'bold', direction: 'rtl', color: '#3D3D3D', fontSize: 26 }}>איך את/ה מבלה בזמנך הפנוי?</h3>
          <p style={{ color: '#3D3D3D', fontSize: 16 }}>בחר את כל הדברים שאת/ה אוהב/ת לעשות </p>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {this.state.hobbiesArr.map((hobby, index) => (
                  <Grid key={index} item>
                    <FCHangoutFrame key={index} id={index} name={hobby.Hname} image={hobby.Hicon} choose={hobby.Choose} sendData={this.getData} />

                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>

  

<Button variant="contained" 
        style={{paddingTop:0,marginRight:10, backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20, 
        fontFamily: "Segoe UI",height:35 }}
        onClick={this.btnFinished}>
        <i class="bi bi-check2"
        style={{ color: '#3D3D3D', fontSize: 26}}></i>
        </Button>
        <Button variant="contained" style={{ paddingTop:0,backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
         fontFamily: "Segoe UI",height:35}}
         onClick={() => this.props.history.push("/hangout")}
        > <i class="bi bi-arrow-right-short"
        style={{ paddingTop:0,color: '#3D3D3D', fontSize: 32}}></i>
        </Button>
      </div>
    )
  }
}
export default withRouter(CCHobbies)
