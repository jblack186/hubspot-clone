import React, { useState } from "react";
import axios from 'axios';
import Lady from "../img/women-folding-arms-new.png";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from 'react-google-login';
import "../css/Signup.scss";
import RightArrow from "../img/right-arrow.svg";
import Blob from "../img/blob.svg";
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import signInHeader from '../img/hubspot-wordmark.svg';
import Blob2 from '../img/blob (1).svg';


const Signup = () => {
  const [alreadyUser, setAlreadyUser] = useState(false);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    googleid: '',

    email: '',
    phonenumber: '',
    companyname: ''

  });
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    googleid: '',
    email: '',
    phonenumber: '',
    companyname: ''
  });

  // console.log('values',userInfo)
  const responseGoogle = (response) => {
    console.log(response);
   setUserInfo({ firstname: response.profileObj.givenName, lastname: response.profileObj.familyName, googleid: response.profileObj.googleId, email: response.profileObj.email, phonenumber: "", companyname: ""
    })
    let formData = new FormData();
    formData.append("values", {firstname: response.profileObj.givenName, lastname: response.profileObj.familyName, email: response.profileObj.email, phonenumber: "", companyname: ""});

    const url = "http://localhost:8886/signup.php";
    axios.post(url,{firstname: response.profileObj.givenName, lastname: response.profileObj.familyName, googleid: response.profileObj.googleId, email: response.profileObj.email, phonenumber: "", companyname: ""})
      .then(res => {
        console.log(res)
        if(res.status === 201) {
          history.push('/dashboard')
        } else if (res.status === 203) {
          setAlreadyUser(true)
          
        
        }
      })
     
      .catch(err => {
        console.log(err)
      })
  
 
    
    


  };
console.log(userInfo)
  const logout = () => {
    console.log('hi');
  };

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstname: event.target.value,
    }));
  };

  const handleLastNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastname: event.target.value,
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
    let formData = new FormData();
    formData.append("values", values);
    console.log('form',values)
    const url = "http://localhost:8886/add_user.php";
    axios.post(url,values)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
 
  return (
    <div>
      <div className="signin-header">
        <img src={signInHeader} alt="sign-in header" />
        <p>Have an account? <Link to="/login">Sign in.</Link></p>
      </div>

    
    <div className="signup-container">
		 {/* <GoogleLogout
  
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={'Could not logout'}
    
    >
    </GoogleLogout> */}
      <div className="signup__form">
        <h3>Create your free account</h3>
        <GoogleLogin
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        {alreadyUser ? <p>An account with this email has already been set up.<br/> <Link to='/login'>Click here to login</Link></p> : null}
        <p className="or">Or</p>
		<form onSubmit={handleSubmit} className='signup__form__form'>
        <div className='signup__form__form__name'>
		
          <input type="text" placeholder="First name" value={values.firstName} onChange={handleFirstNameInputChange}></input>
          <input type="text" placeholder="Last name"value={values.lastName} onChange={handleLastNameInputChange}></input>
        </div>
        <input type="text" placeholder="Email address" value={values.email} onChange={handleEmailInputChange}></input>
        <input type="text" placeholder="Phone number" value={values.phone_number} onChange={handlePhoneInputChange}></input>
        <input type="text" placeholder="Company name" value={values.company_name} onChange={handleCompanyNameInputChange}></input>

        <button type="submit" id="submit" className='signup__form__button'>
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
            className="incentive__image__holder__blob two"
            src={Blob2}
            alt="blob"
          />

        </div>
        <p>ClubSpot CRM is 100% free, forever</p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
