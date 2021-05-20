import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../img/logo.webp";
import Avatar from "../img/user-1.svg";
import DownArrow from "../img/down-arrow.svg"

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-container__left-nav">
      <h1>
        <img className="header-container__logo" src={Logo} alt="logo" />
      </h1>
      <ul className="header-container__mid-nav">
        <li className="header-container__mid-nav__list-item">Contacts <img className="header-container__mid-nav__list-item__arrow" src={DownArrow} alt="down-arrow" /></li>
        <li className="header-container__mid-nav__list-item">Conversations <img className="header-container__mid-nav__list-item__arrow" src={DownArrow} alt="down-arrow" /></li>
        <li className="header-container__mid-nav__list-item">Service <img className="header-container__mid-nav__list-item__arrow" src={DownArrow} alt="down-arrow" /></li>
      </ul>
      </div>
      <div className="header-container__right-nav">
        <img className="header-container__right-nav__avatar" src={Avatar} alt='avatar' />
      </div>
    </div>
  );
};

export default Header;
