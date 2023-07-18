import { useState, useEffect } from 'react';
import Container from './Container/Container';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);

    const checkLocal = JSON.parse(localStorage.getItem('contacts'));
    if (checkLocal?.length <= 0) {
      localStorage.removeItem('contacts');
    }
  }, [contacts]);

  const formAddContact = contactData => {
    const finded = contacts.find(contact => contact.name === contactData.name);
    if (finded) {
      alert(`${contactData.name} is already in contacts`);
      return;
    }
    const contact = { id: nanoid(), ...contactData };
    setContacts(prevState => [contact, ...prevState]);
  };

  const handleOnChangeFilter = evt => {
    setFiltered(evt.currentTarget.value);
  };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <>
      <Container
        formAddContact={formAddContact}
        value={filtered}        
        handleOnChangeFilter={handleOnChangeFilter}
        filteredContact={filteredContact}
        contactsArr={contacts}
        onRemoveContact={contactId => {
          setContacts(contacts.filter(contact => contact.id !== contactId));
        }}
      />
    </>
  );
}
