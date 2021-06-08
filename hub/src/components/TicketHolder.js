import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { setProducts } from '../redux/actions/productsActions';
import { useDispatch, useSelector } from "react-redux";
import "../css/Tickets.scss";






const TicketHolder = (props) => {

  const products = useSelector((state) => state.allProducts.products);
  const [columns, setColumns] = useState([]);

  const [columnsFromBackend, setColumnsFromBackend] = useState({
    ['1']: {
      name: "New",
      items: []
    },
    ['2']: {
      name: "Awaiting Info",
      items: []
    },
    ['3']: {
      name: "Working",
      items: []
    },
    ['4']: {
      name: "Completed",
      items: []
    }
  })
  
  const dispatch = useDispatch();









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

if(response.data.userTickets !== undefined) {

    let newTickets = await response.data.userTickets.reverse().filter(item => {
      let makeArr = item.ticketStatus.split(',')
      if (makeArr[0] === 'new') {
      return item
    } 
    })

    let awaitingTickets = await response.data.userTickets.reverse().filter(item => {
      let makeArr = item.ticketStatus.split(',')
      if (makeArr[0] === 'awaiting') {
      return item
    }  
    })

    let workingTickets = await response.data.userTickets.reverse().filter(item => {
      let makeArr = item.ticketStatus.split(',')
      if (makeArr[0] === 'working') {
      return item
    }  
    })


    let completedTickets = await response.data.userTickets.reverse().filter(item => {
      let makeArr = item.ticketStatus.split(',')
      if (makeArr[0] === 'completed') {
      return item
    }  
    })
  



    setColumnsFromBackend({
      ['1']: {
        name: "New",
        items: newTickets.length > 0 ? newTickets : []
      },
      ['2']: {
        name: "Awaiting Info",
        items: awaitingTickets

      },
      ['3']: {
        name: "Working",
        items: workingTickets
      },
      ['4']: {
        name: "Completed",
        items: completedTickets
      }
    });

    setColumns(columnsFromBackend)

  } else {
    
    setColumnsFromBackend({
      ['1']: {
        name: "New",
        items: []
      },
      ['2']: {
        name: "Awaiting Info",
        items: []

      },
      ['3']: {
        name: "Working",
        items: []
      },
      ['4']: {
        name: "Completed",
        items: []
      }
    });
    setColumns(columnsFromBackend)


  }
}
  
  useEffect(() => {
    fetchTickets();
  }, [products]);

  
  useEffect(() => {
    fetchTickets();
  }, [props.getMore]);



  const onDragEnd = (result, columns, setColumns) => {
    let swapObj = {
      1: 'new',
      2: 'awaiting',
      3: 'working',
      4: 'completed'
    }
    console.log('lets go', result,'yep', columns)
    let swap = {
      'id': result.draggableId,
      'status': swapObj[result.destination.droppableId]
    }

console.log('swap',swap)

    axios.put("http://localhost:8886/changeTicketStatus.php", swap)
      .then(res => {
        console.log('res',res)
      })
      .catch(err => {
        console.log('err',err)
      })
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
    <div className="ticketHldr-container"  >
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
             className="ticketHldr-container__block"
              key={columnId}
            >
              <div className="ticketHldr-container__header-container">
              <h2 className="ticketHldr-container__header">{column.name}</h2>
              <p>{column.items.length}</p>
              </div>
              <div className="ticketHldr-container__column" >
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="ticketHldr-container__column__square"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                        
                          border: snapshot.isDraggingOver
                            ? '2px dashed lightgray'
                            : "#f5f8fa",
                          padding: 4,
                          
                          zIndex: 1,
           
                        }}
                      >
                                              
                        {
                        column.items.map((item, index) => {
                          return (
                            <Draggable
                            style={{
                              position: 'relative',
                              
                              zIndex: 9,
               
                            }}
    
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                  className="ticketHldr-container__card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    
                                  >
                                    {item.company}
                                    {item.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        }
                        
                        ) }
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



export default TicketHolder;
