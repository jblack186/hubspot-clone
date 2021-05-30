import React, { useState, useEffect } from "react";
import "../css/Tickets.scss";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const TicketHolder = (props) => {
  const [tickets, setTickets] = useState([]);
  // const [newTickets, setNewTickets] = useState([]);
  const [characters, updateCharacters] = useState([]);



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

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="ticketHolder-container">
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
        </DragDropContext>              
              
        </div>
      </div>
      
      <div className="ticketHolder-container__holder">
        <div className="ticketHolder-container__holder__banner">
          <p>AWAITING INFO</p>
          <p>0</p>
        </div>
        <div className="line"></div>
        <div className="ticketHolder-container__holder__list"></div>
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
    </div>
  );
};

export default TicketHolder;
