import React, { Component } from 'react';
import Form from './Form';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList';
import Filter from './Filter';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const { name, number } = data;
    const existingContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleFilter} />
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
