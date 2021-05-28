import React, { useState, useEffect } from "react";
import "../css/Tickets.scss";
import Cancel from '../img/cancel.svg';
import axios from 'axios';

const TicketForm = (props) => {
  const [values, setValues] = useState({
    userid: localStorage.getItem('id'),
    fullname: '',
    ticketdescription: '',
    phonenumber: '',
    companyname: ''
  });

  const handleFullNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      fullname: event.target.value,
    }));
  };

  const handleTicketDescriptionInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      ticketdescription: event.target.value,
    }));
  };


  const handlePhoneInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      phonenumber: event.target.value,
    }));
  };

  const handleCompanyNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      companyname: event.target.value,
    }));
  };


  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8886/addTicket.php", values)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  }


  return (
          <div style={props.creatTicketOpen ? {display: 'flex', justifyContent: 'center'} : {display: 'none'}}>
            <div className='tickets-container__tickets-header-top__button-container__ticket-creator'>
              <div className='tickets-container__tickets-header-top__button-container__ticket-creator__banner'>
                <h4>Create ticket</h4>
                {props.Closer}
                
              </div>
              <form onSubmit={handleSubmit} className='tickets-container__tickets-header-top__button-container__ticket-creator__form'>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket name *</label>
                  <input />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Ticket description</label>
                  <input onChange={handleTicketDescriptionInputChange}/>
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
                  <input onChange={handleCompanyNameInputChange} />
                </div>
                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Contact</label>
                  <input  onChange={handleFullNameInputChange}/>
                </div>

                </div>

                <div className='tickets-container__tickets-header-top__button-container__ticket-creator__form__submit'>
                  <button type='submit' className='tickets-container__tickets-header-top__button-container__ticket-creator__form__submit__create'>Create</button>
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
