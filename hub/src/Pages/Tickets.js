import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../css/Tickets.scss";
import ArrowDown from '../img/down-arrow-solid.svg';
import TicketForm from "../components/TicketForm";
import Cancel from '../img/cancel.svg';

const Tickets = () => {
  const [creatTicketOpen, setCreateTicketOpen] = useState(false);


  //Opens ticket form
  const openTicketCreater = (e) => {
    e.preventDefault();
    setCreateTicketOpen(true)
  }

  const closeTicketCreater = (e) => {
    e.preventDefault();
    setCreateTicketOpen(false)
  }


  return (
    <div className="tickets-container">
      <Header />
      <section className="tickets-container__tickets-header-top">
        <h2 className="tickets-container__tickets-header-top__heading">
          Tickets
        </h2>
        <div className="tickets-container__tickets-header-top__filter-tickets-container">
        <div className='tickets-container__tickets-header-top__filter-tickets'>
          <h4 className='tickets-container__tickets-header-top__filter-tickets__heading'>All tickets <img className='tickets-container__tickets-header-top__filter-tickets__arrow' src={ArrowDown} alt='arrow-down' /></h4>
          <div className='tickets-container__tickets-header-top__filter-tickets__dropdown'>
            <ul>
              <li>All tickets</li>
              <li>My open tickets</li>
            </ul>
          </div>
        </div>
        </div>
        <div>
          <div className="tickets-container__tickets-header-top__button-container">
        <button onClick={openTicketCreater} className='tickets-container__tickets-header-top__button'>Create ticket</button>
        <TicketForm FormCloser={<button onClick={closeTicketCreater}className='tickets-container__tickets-header-top__button-container__ticket-creator__form__submit__cancel'>Cancel</button>
} Closer={<img onClick={closeTicketCreater} src={Cancel} alt='cancel-button'/>
} creatTicketOpen={creatTicketOpen}/>
        </div>
        </div>
      </section>
      <section className="tickets-container__tickets-header-bottom"></section>
    </div>
  );
};

export default Tickets;
