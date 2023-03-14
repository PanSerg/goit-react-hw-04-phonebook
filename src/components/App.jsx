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
  const [contacts, setContacts] = useLocalStorage(() => {
    const getContact = localStorage.getItem('contact');
        const parseContact = JSON.parse(getContact);
        if (parseContact !== null) {
            return parseContact;
    }
    return;
  });

  const [filter, setFilter] = useState('');
  

  const visibleStat = this.filterRender();
  return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm addContactName={this.addContactName} />
        <Filter onChange={this.filterChange} value={filter} />
        <Contact dataContact={visibleStat} onDelete={this.onDelete} />
      </div>
    )
}

// export class App extends Component {
  // state = {
  //   contacts: [
  //       {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
  //       {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  //       {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  //       {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  //       ],
  //       filter: '',
  //   };

    // componentDidMount() {
    //     const getContact = localStorage.getItem('contact');
    //     const parseContact = JSON.parse(getContact);
    //     if (parseContact !== null) {
    //         this.setState({ contacts: parseContact });
    //         return;
    //     }
    // };
  
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.contacts !== this.state.contacts) {
    //         localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    //   }
    // }; 

  addContactName = ({name, number}) => {
    const addContact = {
      id: nanoid(),
      name,
      number,
    };

    const upCont = this.state.contacts.find(( contact ) => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (upCont) {
      return alert(`${name} is already in contacts.`);
    };

    this.setState(prevState => ({
      contacts: [addContact, ...prevState.contacts],
    }))
  };

 filterChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  filterRender = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter));
  };

  onDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  // render() {
  //   const visibleStat = this.filterRender();
    // return (
    //   <div>
    //     <h2>Phonebook</h2>
    //     <ContactForm addContactName={this.addContactName} />
    //     <Filter onChange={this.filterChange} value={this.state.filter} />
    //     <Contact dataContact={visibleStat} onDelete={this.onDelete} />
    //   </div>
    // )
  // }
