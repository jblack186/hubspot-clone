import React, { useState, useEffect } from "react";
import "../css/Tickets.scss";


const TicketHolder = (props) => {


  return (
          <div className='ticketHolder-container'>
            <div className='ticketHolder-container__holder'>
              <div className='ticketHolder-container__holder__banner'>
                <p>NEW</p>
                <p>1</p>
               

              </div>
              <div className='line'></div>
              <div className='ticketHolder-container__holder__list'>
                <div className='ticketHolder-container__holder__list__card'>
                  <p className='ticketHolder-container__holder__list__card__description'>Button color change</p>
                  <p>Open for 13 hours</p>
                  <p> Ticket Owner: Jamison Blackwell</p>
                  <p className='ticketHolder-container__holder__list__card__importance'>High</p>
                </div>
                </div>
  
            </div>
            <div className='ticketHolder-container__holder'>
              <div className='ticketHolder-container__holder__banner'>
                <p>AWAITING INFO</p>
                <p>0</p>
               

              </div>
              <div className='line'></div>
              <div className='ticketHolder-container__holder__list'>
                
                </div>
  
            </div>
            <div className='ticketHolder-container__holder'>
              <div className='ticketHolder-container__holder__banner'>
                <p>PROOFING</p>
                <p>0</p>
               

              </div>
              <div className='line'></div>
              <div className='ticketHolder-container__holder__list'>
                
                </div>
  
            </div>
            <div className='ticketHolder-container__holder'>
              <div className='ticketHolder-container__holder__banner'>
                <p>CLOSED</p>
                <p>0</p>
               

              </div>
              <div className='line'></div>
              <div className='ticketHolder-container__holder__list'>
                
                </div>
  
            </div>

          </div>
  );
};

export default TicketHolder;
