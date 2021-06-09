import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import '../css/Contact.scss';
import axios from 'axios';

const Contact = () => {
const [users, setUsers] = useState();

const getUsers = () => {
  axios.get("http://localhost:8886/getUsers.php") 
    .then(res => {
      console.log(res)
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  
}
console.log(users)
useEffect(() => {
  getUsers();
}, [])

  return (
    <div>
      <Header />

    </div>
  )
}

export default Contact;