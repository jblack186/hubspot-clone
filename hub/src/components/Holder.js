import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import "../css/Tickets.scss";

function Test() {
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

  const itemsFromBackend = [
    { id: '1', content: "First task" },
    { id: '2', content: "Second task" },
    { id: '3', content: "Third task" },
    { id: '4', content: "Fourth task" },
    { id: '5', content: "Fifth task" }
  ];


// const itemsFromBackend = characters

const columnsFromBackend = {
  ['1']: {
    name: "Requested",
    items: itemsFromBackend
  },
  ['2']: {
    name: "To do",
    items: []
  },
  ['3']: {
    name: "In Progress",
    items: []
  },
  ['4']: {
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



const [columns, setColumns] = useState(columnsFromBackend);


  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={toString(item.id)}
                              draggableId={toString(item.id)}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.company}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Test;
