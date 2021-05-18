import React, { useState, useEffect, useRef } from "react";
import Lady from "../img/folding-arms.png";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from 'react-google-login';
import "./Signup.scss";
import RightArrow from "../img/right-arrow.svg";
import Blob from "../img/blob.svg";
import { useHistory } from 'react-router-dom';


const Signup = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone_number: '',
    company_name: ''
  });


  const responseGoogle = (response) => {
    console.log(response);
    setUserInfo([response.ft.Ue, response.ft.eU, response.ft.Qt
    ])
    history.push('/dashboard')
    


  };
console.log(userInfo)
  const logout = () => {
    console.log('hi');
  };

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleLastNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  };

  const handleEmailInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  };

  const handlePhoneInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      phone_number: event.target.value,
    }));
  };

  const handleCompanyNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      company_name: event.target.value,
    }));
  };

  return (
    <div className="signup-container">
		 <GoogleLogout
  
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={'Could not logout'}
    
    >
    </GoogleLogout>
      <div className="signup__form">
        <h3>Create your free account</h3>
        <GoogleLogin
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <p className="or">Or</p>
		<form className='signup__form__form'>
        <div className='signup__form__form__name'>
		
          <input type="text" placeholder="First name" value={values.firstName} onChange={handleFirstNameInputChange}></input>
          <input type="text" placeholder="Last name"value={values.lastName} onChange={handleLastNameInputChange}></input>
        </div>
        <input type="text" placeholder="Email address" value={values.email} onChange={handleEmailInputChange}></input>
        <input type="text" placeholder="Phone number" value={values.phone_number} onChange={handlePhoneInputChange}></input>
        <input type="text" placeholder="Company name" value={values.company_name} onChange={handleCompanyNameInputChange}></input>

        <button id="submit" className='signup__form__button'>
          Next
          <img src={RightArrow} alt="right-arrow" />
        </button>
		</form>
        <p className='privacy-policy'>
          By continuing, you're agreeing to the HubSpot Customer Terms of
          Service and Privacy Policy
        </p>
      </div>
      <div className="incentive">
        <div className="incentive__holder">
          <img
            className="incentive__image__holder__woman"
            src={Lady}
            alt="woman-folding-arms"
          />
          <img
            className="incentive__image__holder__blob"
            src={Blob}
            alt="blob"
          />
        </div>
        <p>ClubSpot CRM is 100% free, forever</p>
      </div>
    </div>
  );
};

export default Signup;
