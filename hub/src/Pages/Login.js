import React, { useState} from "react";
import axios from 'axios';
import Lady from "../img/folding-arms.png";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from 'react-google-login';
import "../css/Signup.scss";
import RightArrow from "../img/right-arrow.svg";
import Blob from "../img/blob.svg";
import { useHistory } from 'react-router-dom';
import signInHeader from '../img/hubspot-wordmark.svg';
import {Link} from 'react-router-dom';


const Login = () => {
  // const [notUser, setNotUser] = useState(false)
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

    const url = "http://localhost:8886/login.php";
    axios.post(url,{firstname: response.profileObj.givenName, lastname: response.profileObj.familyName, googleid: response.profileObj.googleId, email: response.profileObj.email, phonenumber: "", companyname: ""})
      .then(res => {
        console.log(res)
        if(res.status === 200) {
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('id', res.data)

          history.push('/dashboard')
        } else if (res.status === 203) {
          // setNotUser(true)
          alert('Not a user. Please sign up')
          history.push('/signup')
     
        
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
    const url = "http://localhost:8886/login.php";
    axios.post(url,values)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
 
  return (
    <div className="login-container">
              <img src={signInHeader} alt="sign-in header" />
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

		 {/* <GoogleLogout
  
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      onFailure={'Could not logout'}
    
    >
    </GoogleLogout> */}
      <div className="login-container__form-container">
		<form onSubmit={handleSubmit} className='login-container__form-container__form'>
        <div className='login-container__form-container__form__contents'>
          <div className='login-container__form-container__form__contents__input'>
          <label>Email address</label>
          <input type="text" value={values.firstName} onChange={handleFirstNameInputChange}></input>
          </div>
          <div className='login-container__form-container__form__contents__input'>
          <label>Password</label>

          <input type="text" value={values.lastName} onChange={handleLastNameInputChange}></input>
          </div>
        </div>


        <button type="submit" id="submit" className='signup__form__button'>
          Log in
        
        </button>
		</form>
    <div className='login-line'></div>

      </div>
      <GoogleLogin
          clientId="546358849656-baoghk362u02tas2sq9pkj6d50sog0ga.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />

    </div>
  );
};

export default Login;
