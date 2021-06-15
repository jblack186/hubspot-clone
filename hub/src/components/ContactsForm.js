import React from "react";
import "../css/Tickets.scss";



const ContactsForm = (props) => {






  return (
          <div style={props.creatTicketOpen ? {display: 'flex', justifyContent: 'center'} : {display: 'none'}}>
            <div className='contacts-container__tickets-header-top__button-container__ticket-creator'>
              <div className='contacts-container__tickets-header-top__button-container__ticket-creator__banner'>
                <h4>Create contact</h4>
                {props.Closer}
                
              </div>
              <form onSubmit={props.submission} className='contacts-container__tickets-header-top__button-container__ticket-creator__form'>
                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Firstname</label>
                  {props.firstname}
                </div>
                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Lastname</label>
                  {props.lastname}
                </div>
                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Email </label>
                  {props.email}
                </div>

                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Phone number </label>
                  {props.phonenumber}
                </div>
                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__label-input'>
                  <label>Company name</label>
                  {props.companyname}
                </div>

                <div className='contacts-container__tickets-header-top__button-container__ticket-creator__form__submit'>
                  <span onClick={props.newTicky}><button type='submit' className='contacts-container__tickets-header-top__button-container__ticket-creator__form__submit__create'>Create</button></span>
                  {props.FormCloser}
                </div>
              </form>
            </div>
            <div className='contacts-container__tickets-header-top__button-container__ticket-creator-half'>

              </div>
          </div>
  );
};

export default ContactsForm;
