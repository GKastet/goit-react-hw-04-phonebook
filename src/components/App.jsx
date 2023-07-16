import { useState, useEffect } from 'react';
import Container from './Container/Container';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState('');  

  //При першому рендері і все
  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    setContacts(parsedContacts);
  }, []);

  //Змінив
  // componentDidMount() {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
  //   this.setState({contacts:parsedContacts})
  // }

  //При першому рендері та залежність від contacts
  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);

    const checkLocal = JSON.parse(localStorage.getItem('contacts'));
    if(checkLocal?.length<=0){
      localStorage.removeItem('contacts')};
  }, [contacts]);

  //Змінив
  // componentDidUpdate(_, prevState) {
  //   if(prevState.contacts.length !== this.state.contacts.length){
  //     const stringifiedContacts = JSON.stringify(this.state.contacts);
  //     localStorage.setItem('contacts', stringifiedContacts);
  //   }
  //   const checkLocal = JSON.parse(localStorage.getItem('contacts'));
  //   if(checkLocal?.length<=0){
  //     localStorage.removeItem('contacts');
  //   }
  // }

  const formAddContact = contactData => {
    const contact = { id: nanoid(), ...contactData };
    setContacts([contact, ...contacts]);
    // setContacts(prevState => ({
    //   contacts: [contact, ...prevState.contacts],
    // }));
  };

  //Замінив
  // const handleOnChangeFilter = evt => {
  //   setFiltered( evt.currentTarget.value );
  // };

  //Замінив
  // const getFilteredContact =()=>{
  //   //const {contacts, filter} = this.state;
  //   //const normalizedFilter = filtered.toLowerCase();
  //   return contacts.filter(contact => contact.name.toLowerCase().includes(filtered.toLowerCase()));
  // }

  //Замінив
  // const onRemoveContact = contactId => {
  //   setContacts(contacts.filter(contact => contact.id !== contactId));
  // };

  const filteredContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <>
      <Container
        formAddContact={formAddContact}
        value={filtered}
        handleOnChangeFilter={evt => setFiltered(evt.currentTarget.value)}
        filteredContact={filteredContact}
        contactsArr={contacts}
        onRemoveContact={contactId => {
          setContacts(contacts.filter(contact => contact.id !== contactId));
        }}
      />
    </>
  );
}
