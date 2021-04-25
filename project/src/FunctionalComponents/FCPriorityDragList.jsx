import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../dragList.css';


const optionsArr = [
  {name:'מקומות בילוי',
  icon: "bi bi-emoji-sunglasses-fill"
},
{name:'תחביבים',
  icon: 'bi bi-controller'
},
{name:'חברים משותפים',
  icon: "bi bi-person-circle"
},
{name:'קרבת מקום מגורים',
  icon:"bi bi-geo-alt-fill"
},
  {name:'שנת לימודים',
  icon:"bi bi-signpost-2-fill"
},
{name:'מחלקה',
icon:"bi bi-building"
},
{name:'סטטוס זוגי',
icon:"bi bi-heart-fill"
},
{name:'גיל',
icon:"bi bi-calendar-event"
}
 ]
function FCPriorityDragList() {
  let newUserPreferences=optionsArr;
  const [preferences, updateCharacters] = useState(optionsArr);

  function handleOnDragEnd(result) {
      console.log("result:" , result)
    if (!result.destination) return;

    const items = Array.from(preferences);
    console.log("items",items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log("reorderedItem",reorderedItem)
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("new items",items);
    newUserPreferences = items;
    console.log('newUserPreferences:' , newUserPreferences)
    console.log("characters before",preferences);
    updateCharacters(items);
    console.log("characters after",preferences);
  }

  return (
    <div style={{direction:'rtl', width:'50%', margin:'0px auto'}}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef} style={{textAlignLast:'start', padding:0}}>
                {preferences.map(({name, icon}, index) => {
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
  );
}

export default FCPriorityDragList;