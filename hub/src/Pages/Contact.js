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
      console.log(res.data)
      const userData = res.data.userContacts
      setUsers(userData)
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
          return <div className="contact-container__contacts-list__list-items__item">
                  <ul className="contact-container__contacts-list__list-items__item__ul">
                    <li>{item.firstname} {item.lastname}</li>
                      <li>{item.email}</li>
                      <li>{item.phonenumber}</li>
                      <li>{item.companyname}</li>
 

                  </ul>
                </div>
        }) : <p>You have no contacts</p>}
      </div>
     </div>
      

    </section>
  )
}

export default Contact;