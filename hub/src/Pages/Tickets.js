import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Tickets.scss";

const Tickets = () => {
  return (
    <div className="tickets-container">
      <Header />
      <section className="tickets-container__tickets-header-top">
        <h2 className="tickets-container__tickets-header-top__heading">
          Tickets
        </h2>
        <div className='tickets-container__tickets-header-top__filter-tickets'>
          <h4>All tickets</h4>
          <div className='tickets-container__tickets-header-top__filter-tickets__dropdown'>
            <ul>
              <li>All tickets</li>
              <li>My open tickets</li>
            </ul>
          </div>
        </div>

      </section>
      <section className="tickets-container__tickets-header-bottom"></section>
    </div>
  );
};

export default Tickets;
