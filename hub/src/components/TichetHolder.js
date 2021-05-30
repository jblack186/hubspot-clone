import React, { useState, useEffect } from "react";
import "../css/Tickets.scss";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';


const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const TicketHolder = (props) => {
  const [tickets, setTickets] = useState([]);
  // const [newTickets, setNewTickets] = useState([]);
  const [characters, updateCharacters] = useState([]);
  const [awaiting, updateAwaiting] = useState([]);



console.log(characters)
useEffect(() => {
updateCharacters(tickets.reverse())
}, [tickets]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    localStorage.setItem('newTicket', '');

    axios
      .get("http://localhost:8886/getTicketsById.php", {
        headers: {
          userid: id,
        },
      })
      .then((res) => {
        let ticketData = res.data;
        if (ticketData.userTickets.length > 0) {
        setTickets(ticketData.userTickets);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  const columnsFromBackend = {
    [uuid()]: {
      name: "Pending",
      items: itemsFromBackend
    },
    [uuid()]: {
      name: "Working",
      items: []
    },
    [uuid()]: {
      name: "Awaiting Info",
      items: []
    },
    [uuid()]: {
      name: "Completd",
      items: []
    }
  };

  function handleOnDragEnd(result) {
    console.log(result.destination)
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  function handleAwaitingOnDragEnd(result) {
    console.log(result.destination)
    if (!result.destination) return;

    const items = Array.from(awaiting);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};






  return (
    <div className="ticketHolder-container">
              <DragDropContext onDragEnd={handleOnDragEnd}>

      <div className="ticketHolder-container__holder">
        <div className="ticketHolder-container__holder__banner">
          <p>NEW</p>
          <p>1</p>
        </div>
        <div className="line"></div>

        <div className="ticketHolder-container__holder__list">
          {/* CARD */}
      
          <div className="ticketHolder-container__holder__list__old-tickets">


           {props.newTickets.map((item, key) => {
              return <div
                  
                  className="ticketHolder-container__holder__list__card"
                >
                  <p className="ticketHolder-container__holder__list__card__description">
                    {item.ticketdescription}
                  </p>
                  <p>{item.fullname}</p>
                  <p> Company Name: {item.companyname}</p>
                  <p className="ticketHolder-container__holder__list__card__importance">
                    High
                  </p>
                </div>
              
            })}
           
          
    </div>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map((item, index) => {
                  return (
                    <Draggable  key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li className="ticketHolder-container__holder__list__card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                     <p className="ticketHolder-container__holder__list__card__description">
                    {item.description}
                  </p>
                  <p>{item.contact}</p>
                  <p> Company Name: {item.company}</p>
                  <p className="ticketHolder-container__holder__list__card__importance">
                    High
                  </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
                   
              
        </div>
      </div>
      
      <div className="ticketHolder-container__holder">
        <div className="ticketHolder-container__holder__banner">
          <p>AWAITING INFO</p>
          <p>0</p>
        </div>
        <div className="line"></div>
        <div className="ticketHolder-container__holder__list">
          <Droppable droppableId="awaiting">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {awaiting.map((item, index) => {
                  return (
                    <Draggable  key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li className="ticketHolder-container__holder__list__card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                     <p className="ticketHolder-container__holder__list__card__description">
                    {item.description}
                  </p>
                  <p>{item.contact}</p>
                  <p> Company Name: {item.company}</p>
                  <p className="ticketHolder-container__holder__list__card__importance">
                    High
                  </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
                     
 

        </div>
        
      </div>



      <div className="ticketHolder-container__holder">
        <div className="ticketHolder-container__holder__banner">
          <p>PROOFING</p>
          <p>0</p>
        </div>
        <div className="line"></div>
        <div className="ticketHolder-container__holder__list"></div>
      </div>
      <div className="ticketHolder-container__holder">
        <div className="ticketHolder-container__holder__banner">
          <p>CLOSED</p>
          <p>0</p>
        </div>
        <div className="line"></div>
        
        <div className="ticketHolder-container__holder__list"></div>
      </div>
      </DragDropContext>
    </div>
  );
};

export default TicketHolder;
