import React, { useState} from "react";
import "../css/Header.scss";
import Logo from "../img/logo.webp";
import Avatar from "../img/user-1.svg";
import DownArrow from "../img/down-arrow.svg";
import {Link} from 'react-router-dom';


const Header = () => {
  const [service, setService] = useState(false);
  const [contacts, setContacts] = useState(false);


  const serviceDropdownOpen = (e) => {
    e.preventDefault();
    setService(true);
  }


  const serviceDropdownClosed = (e) => {
    e.preventDefault();
    setService(false);
  }

  const contactsDropdownOpen = (e) => {
    e.preventDefault();
    setContacts(true);
  }


  const contactsDropdownClosed = (e) => {
    e.preventDefault();
    setContacts(false);
  }

  
  return (
    <div className="header-container">
      <div className="header-container__left-nav">
        <h1>
        <Link className='router_link' to='/dashboard'><img className="header-container__logo" src={Logo} alt="logo" /></Link>
        </h1>
        <ul className="header-container__mid-nav">
          <li onClick={contactsDropdownOpen} onMouseLeave={contactsDropdownClosed}  className="header-container__mid-nav__list-item">
            Contacts{" "}
            <img
              className="header-container__mid-nav__list-item__arrow"
              src={DownArrow}
              alt="down-arrow"
            />
                        <div className='header-container__mid-nav__list-item-open' style={contacts ? {display: 'flex'} : {display: 'none'}}>
              <ul>
              <Link className='router_link' to='/contacts'><li>Contacts</li></Link>
              </ul>
            </div>

          </li>
          <li className="header-container__mid-nav__list-item">
            Conversations{" "}
            <img
              className="header-container__mid-nav__list-item__arrow"
              src={DownArrow}
              alt="down-arrow"
            />
          </li>
          <li onClick={serviceDropdownOpen} onMouseLeave={serviceDropdownClosed} className="header-container__mid-nav__list-item">
            Service
            <img
              className="header-container__mid-nav__list-item__arrow"
              src={DownArrow}
              alt="down-arrow"
            />
            <div className='header-container__mid-nav__list-item-open' style={service ? {display: 'flex'} : {display: 'none'}}>
              <ul>
              <Link className='router_link' to='/tickets'><li>Tickets</li></Link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="header-container__right-nav">
        <img
          className="header-container__right-nav__avatar"
          src={Avatar}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
