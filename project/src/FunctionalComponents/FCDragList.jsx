import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../dragList.css';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

function FCDragList(props) {
  console.log('props.preferences', props.preferences)
  let newUserPreferences = props.preferences;
  const [preferences, updatepreferences] = useState(props.preferences);
  const [resetArray, updateresetArray] = useState('');
  console.log('preferences', preferences);
  console.log('resetArray', resetArray); 
  if (resetArray === true) {
    console.log('in resetArray condition', resetArray);
    // updatepreferences(props.preferences);
    let studOBJ = JSON.parse(localStorage.getItem('student'));   
    updatepreferences(studOBJ.Preflist);
    updateresetArray('');
  }

  function handleOnDragEnd(result) {
    console.log("result:", result)
    if (!result.destination) return;

    const items = Array.from(preferences);
    console.log("items", items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log("reorderedItem", reorderedItem)
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("new items", items);
    newUserPreferences = items;
    console.log('newUserPreferences:', newUserPreferences);
    updatepreferences(items);
    updateresetArray(false);
  }

 const handleResetBTN = () =>
 {
   console.log("in handleResetBTN function ")
   updateresetArray(true);
 }

 const handleSwal = () =>
 {
  swal({
    title: "השינויים שביצעת יישמרו",
    icon: "warning",
    buttons: true,
    //dangerMode: true,
    
  })
  .then((willSave) => {
    if (willSave) {
      UpdatePreferencesInDB(props.studOBJ.Mail);
    }
  });
 }

 const UpdatePreferencesInDB = (mail) =>
 {
   console.log("in postNewPreferences2DB",preferences );
  //  studOBJ.Preflist = preferences;
  //  console.log("in studOBJ",studOBJ.Preflist);
   let apiUrl = 'http://proj.ruppin.ac.il/igroup54/test2/A/tar5/api/students/' + mail + '/updateUserPreferences';
  // let apiUrl = 'https://localhost:44325/API/students/' + mail + '/updateUserPreferences';
    fetch(apiUrl,
      {
        method: 'Put',
        body: JSON.stringify(preferences),
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
          console.log('UpdatePreferencesInDB succeeded');
          let studOBJ = props.studOBJ;
          studOBJ.Preflist = preferences;
          localStorage.setItem('student',JSON.stringify(studOBJ));
          swal(":) ההעדפות שלך עודכנו בהצלחה", {
            icon: "success",
          });
        }
        //return res.json();
      })

  }

 
  return (
    <div>
      <div style={{ direction: 'rtl', width: '50%', margin: '0px auto' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="preferences">
            {(provided) => (
              <ul className="preferences" {...provided.droppableProps} ref={provided.innerRef} style={{ textAlignLast: 'start', padding: 0 }}>
                {preferences.map(({Prefname, Preficon }, index) => {
                  return (
                    <Draggable key={Prefname} draggableId={Prefname} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <i className={Preficon} style={{ marginLeft: 8 }}></i>
                          <span>{Prefname}</span>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div>
          <Button variant="contained"
            style={{
              backgroundColor: "#FAE8BE", fontSize: 20, borderRadius: 20,
              fontFamily: "Segoe UI", height: '5vh', position: 'absolute', left: '1vw'
            }}
          onClick={handleSwal}
          >
            <i class="bi bi-check2"
              style={{ color: '#3D3D3D', fontSize: 26 }}></i>
          </Button>
          <Button variant="contained" style={{
            backgroundColor: "#FAE8BE", fontSize: 17, borderRadius: 20,
            fontFamily: "Segoe UI", height: '5vh', position: 'absolute', right: '1vw'
          }}
            onClick={handleResetBTN}
          > אפס
        {/* <i class="bi bi-arrow-right-short"
        style={{ paddingTop:0,color: '#3D3D3D', fontSize: 32}}></i> */}
          </Button>
        </div>
    </div>
  );
}

export default FCDragList;