import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import '../css/Contacts.scss';
import axios from 'axios';

const Contact = () => {
const [users, setUsers] = useState();

const getUsers = () => {
  const ids = localStorage.getItem("id");

  axios.get("http://localhost:8886/getContactsById.php",{
    headers: {
      userid: ids,
    },
  }) 
    .then(res => {
      console.log(res)
      setUsers(JSON.parse(res.data))
    })
    .catch(err => {
      console.log(err)
    })
  
}
console.log('USERS',users)
useEffect(() => {
  getUsers();
}, [])

  return (
    <section className="contact-container">
     <div className="contact-container__contacts-list">
      <div className="contact-container__contacts-list__labels">
        <ul className="contact-container__contacts-list__labels__ul">
          <li className="contact-container__contacts-list__labels name">
          NAME
          </li>
          <li className="contact-container__contacts-list__labels__email">
EMAIL
</li>
<li className="contact-container__contacts-list__labels__number">
PHONE NUMBER
</li>
<li className="contact-container__contacts-list__labels__company">
COMPANY NAME
</li>

        </ul>
      </div>
      <div className="contact-container__contacts-list__list-items">
        {users !== undefined ? users.map(item => {
          return item.key
        }) : <p>You have no contacts</p>}
      </div>
     </div>
      

    </section>
  )
}

export default Contact;