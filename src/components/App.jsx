import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/contactForm";
import { nanoid } from "nanoid";
import { Contact } from "./Contacts/contacts";
import { Filter } from "./Filter/filter";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

useEffect(() => {
  window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state])

  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');


  const addContactName = ({ name, number }) => {
    const addContact = {
      id: nanoid(),
      name,
      number,
    };

    const upCont = contacts.find((contact) => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (upCont) {
      return alert(`${name} is already in contacts.`);
    };

    setContacts(prevState => [addContact, ...prevState]);
  };
    
  const filterChange = evt => {
    setFilter(evt.target.value );
    };
    
  const filterRender = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter));
  };

    const onDelete = id => {
    setContacts(prevState =>
    prevState.filter(contact => contact.id !== id));
  };

  const visibleStat = filterRender();
  return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm addContactName={addContactName} />
        <Filter onChange={filterChange} value={filter} />
        <Contact dataContact={visibleStat} onDelete={onDelete} />
      </div>
    )
   };