import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addContact, deleteContact } from "../redux/contactsSlice";
import { setFilter } from "../redux/filterSlice";
import { getContacts, getFilter } from "../redux/selectors";
import Title from "./Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";
import "./App.css";

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

  const filteredContacts = contacts.filter((contact) => {
    const normalizeFilter = filter.toLowerCase();
    return contact.name.toLowerCase().includes(normalizeFilter);
  });

  const handleAddNewContact = (values) => {
    const uniqueContactName = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    const uniqueContactNumber = contacts.some(
      (contact) => contact.number === values.number
    );
    if (uniqueContactName && uniqueContactNumber) {
      toast.error("This contact is already in the contact book.");
      return;
    }
    if (uniqueContactNumber) {
      toast.error("This contact number is already in the contact book.");
      return;
    }
    dispatch(addContact(values));
    toast.success("Congratulations, the contact has been successfully added.");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Toaster />
      <Title text="Phonebook"></Title>
      <ContactForm onChange={handleAddNewContact} />
      <SearchBox label="Find contacts by name" onChange={handleFilterChange} />
      <ContactList items={filteredContacts} onClick={handleDelete} />
    </div>
  );
}

export default App;
