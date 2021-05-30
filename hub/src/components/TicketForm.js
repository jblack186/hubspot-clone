import React from "react";
import "../css/Tickets.scss";



const TicketForm = (props) => {






  return (
          <div style={props.creatTicketOpen ? {display: 'flex', justifyContent: 'center'} : {display: 'none'}}>
            <div className='tickets-container__tickets-header-top__button-container__ticket-creator'>
              <div className='tickets-container__tickets-header-top__button-container__ticket-creator__banner'>
                <h4>Create ticket</h4>
                {props.Closer}
                
              </div>
              <form onSubmit={props.submission} className='tickets-container__tickets-header-top__button-container__ticket-creator__form'>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket name *</label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket description</label>
                 {props.description}
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Source </label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket owner</label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Priority</label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket name *</label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__company-info'>
                    <h5>Associate ticket with</h5>
                    <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Company</label>
                  {props.company}
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Contact</label>
                  {props.contact}
                </div>

                </div>

                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__submit'>
                  <span onClick={props.newTicky}><button type='submit' className='tickets-container__tickets-header-top__button-container__ticket-creator__form__submit__create'>Create</button></span>
                  {props.FormCloser}
                </div>
              </form>
            </div>
            <div className='tickets-container__tickets-header-top__button-container__ticket-creator-half'>

              </div>
          </div>
  );
};

export default TicketForm;
