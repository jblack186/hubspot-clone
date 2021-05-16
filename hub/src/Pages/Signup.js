import React, {useState} from "react";
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
		
          <input placeholder="First name"></input>
          <input placeholder="Last name"></input>
        </div>
        <input placeholder="Email address"></input>
        <button className='signup__form__button'>
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
