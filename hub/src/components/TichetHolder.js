import React, { useState, useEffect } from "react";
import "../css/Tickets.scss";
import axios from "axios";

const TicketHolder = (props) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios
      .get("http://localhost:8886/getTicketsById.php", {
        headers: {
          userid: id,
        },
      })
      .then((res) => {
        let ticketData = res.data;
        setTickets(ticketData.userTickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(tickets);
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

          {tickets.length > 0 ? (
            tickets.map((item, key) => {
              return (
                <div
                  key={key}
                  className="ticketHolder-container__holder__list__card"
                >
                  <p className="ticketHolder-container__holder__list__card__description">
                    {item.description}
                  </p>
                  <p>{item.contact}</p>
                  <p> Company Name: {item.company}</p>
                  <p className="ticketHolder-container__holder__list__card__importance">
                    High
                  </p>
                </div>
              );
            })
          ) : (
            <p>HI</p>
          )}
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
