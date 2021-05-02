import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../dragList.css';
import Button from '@material-ui/core/Button';

function FCDragList(props) {
  console.log('props.preferences', props.preferences)
  let newUserPreferences = props.preferences;
  const [preferences, updatepreferences] = useState(props.preferences);
  const [resetArray, updateresetArray] = useState('');
  console.log('preferences', preferences);
  console.log('resetArray', resetArray); 
  if (resetArray === true) {
    console.log('in resetArray condition', resetArray);
    updatepreferences(props.preferences);
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
  return (
    <div style={{ marginTop: '5vh' }}>
      <div style={{ direction: 'rtl', width: '50%', margin: '0px auto' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="preferences">
            {(provided) => (
              <ul className="preferences" {...provided.droppableProps} ref={provided.innerRef} style={{ textAlignLast: 'start', padding: 0 }}>
                {preferences.map(({ name, icon }, index) => {
                  return (
                    <Draggable key={name} draggableId={name} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <i className={icon} style={{ marginLeft: 8 }}></i>
                          <span>{name}</span>
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
              fontFamily: "Segoe UI", height: '5vh', position: 'absolute', left: 5
            }}
          // onClick={}>
          >
            <i class="bi bi-check2"
              style={{ color: '#3D3D3D', fontSize: 26 }}></i>
          </Button>
          <Button variant="contained" style={{
            backgroundColor: "#FAE8BE", fontSize: 17, borderRadius: 20,
            fontFamily: "Segoe UI", height: '5vh', position: 'absolute', right: 5
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