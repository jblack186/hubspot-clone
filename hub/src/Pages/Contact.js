import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../css/Contacts.scss";
import axios from "axios";
import ContactsForm from "../components/ContactsForm";
import Cancel from "../img/cancel.svg";

const Contact = () => {
  const [users, setUsers] = useState();
  const [creatTicketOpen, setCreateTicketOpen] = useState(false);
  const [newTickets, setNewTickets] = useState([]);

  const [values, setValues] = useState({
    contactid: localStorage.getItem("id"),
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    companyname: "",
  });

  const getUsers = () => {
    const ids = localStorage.getItem("id");

    axios
      .get("http://localhost:8886/getContactsById.php", {
        headers: {
          userid: ids,
        },
      })
      .then((res) => {
        console.log(res.data);
        const userData = res.data.userContacts;
        setUsers(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("USERS", values);
  useEffect(() => {
    getUsers();
  }, []);

  const openTicketCreater = (e) => {
    e.preventDefault();
    setCreateTicketOpen(true);
  };

  function closeTicketCreater(e) {
    e.preventDefault();
    setCreateTicketOpen(false);
  }

  const handleFirstname = (event) => {
    event.preventDefault();
    setValues((values) => ({
      ...values,
      firstname: event.target.value,
    }));
  };

  const handleLastname = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastname: event.target.value,
    }));
  };

  const handleEmail = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  };

  const handleCompany= (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      companyname: event.target.value,
    }));
  };


  const handlePhone = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      phonenumber: event.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    // getMore();
    await e.preventDefault();
    await axios
      .post("http://localhost:8886/addContact.php", values)
      .then((res) => {
        setValues({
          contactid: localStorage.getItem("id"),
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          companyname: "",
        });
        closeTicketCreater(e);
        console.log("values", res);
        setNewTickets([...newTickets, res.data]);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contact-container-whole">
      <Header />

      <section className="contact-container">
        <div className="contact-container__top__container">
          <h1 className="contact-container__top__container__header">
            Contacts
          </h1>
          <div className="contact-container__top__container__button-container">
            <button
              onClick={openTicketCreater}
              className="contact-container__top"
            >
              Create contact
            </button>
          </div>
        </div>

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
            {users !== undefined ? (
              users.map((item) => {
                return (
                  <div className="contact-container__contacts-list__list-items__item">
                    <ul className="contact-container__contacts-list__list-items__item__ul">
                      <li>
                        {item.firstname} {item.lastname}
                      </li>
                      <li>{item.email}</li>
                      <li>{item.phonenumber}</li>
                      <li>{item.companyname}</li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p>You have no contacts</p>
            )}
          </div>
        </div>

      </section>
      <ContactsForm
          firstname={
            <input
              value={values.firstname}
              onChange={handleFirstname}
            />
          }
          lastname={
            <input
              value={values.lastname}
              onChange={handleLastname}
            />
          }
          email={
            <input
              type="text"
              value={values.email}
              onChange={handleEmail}
            />
          }

          phonenumber={
            <input
              type="text"
              value={values.phonenumber}
              onChange={handlePhone}
            />
          }


          companyname={
            <input
              type="text"
              value={values.companyname}
              onChange={handleCompany}
            />
          }

          submission={handleSubmit}
          FormCloser={
            <button
              onClick={closeTicketCreater}
              className="tickets-container__tickets-header-top__button-container__ticket-creator__form__submit__cancel"
            >
              Cancel
            </button>
          }
          Closer={
            <img
              onClick={closeTicketCreater}
              src={Cancel}
              alt="cancel-button"
            />
          }
          creatTicketOpen={creatTicketOpen}
        />

    </div>
  );
};

export default Contact;
