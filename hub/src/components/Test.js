import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { setProducts } from '../redux/actions/productsActions';
import { useDispatch, useSelector } from "react-redux";






function Test(props) {

  const [tickets, setTickets] = useState([]);
  const products = useSelector((state) => state.allProducts.products);
  console.log('aaa',props.realTickets)
  const dispatch = useDispatch();

  
  
  const columnsFromBackend = {
    ['1']: {
      name: "Pending",
      items: []
    },
    ['2']: {
      name: "Working",
      items: []
    },
    ['3']: {
      name: "Awaiting Info",
      items: []
    },
    ['4']: {
      name: "Completed",
      items: []
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);


  




  const fetchTickets = async () => {
    const ids = localStorage.getItem("id");

    const response = await axios.get("http://localhost:8886/getTicketsById.php",{
      headers: {
        userid: ids,
      },
    })
    .catch(err => {
      console.log('ERR',err);
    });
   console.log(response.data)
    columnsFromBackend['1'].items = response.data.userTickets
  }


  useEffect(() => {
    fetchTickets();
  }, []);



  

console.log('props', columnsFromBackend['1'].items)





  

  // useEffect(() => {


  //   const ids = localStorage.getItem("id");

  //   axios
  //     .get("http://localhost:8886/getTicketsById.php", {
  //       headers: {
  //         userid: ids,
  //       },
  //     })
  //     .then((res) => {
        
  //       let ticketData = res.data;
  //       // columnsFromBackend['1'].items.push(ticketData.userTickets)
  //       console.log('tickets', ticketData.userTickets)
  //       // if (ticketData.userTickets.length > 0) {
  //       setTickets(ticketData.userTickets);
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
      
  // }, []);

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
                        {props.realTickets !== undefined ?
                        column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
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
                        }
                        
                        ) : <p>Wait yo</p>}
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
  ) 
}



export default Test;
