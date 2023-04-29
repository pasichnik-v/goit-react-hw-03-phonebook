import React from 'react';
import PropTypes from 'prop-types';
import './ContactsList.css';

const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li className="contact__item" key={id}>
        {name}: {number}
        <button onClick={() => onDeleteContact(id)} className="button">
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
