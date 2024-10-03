import { Notify } from "notiflix/build/notiflix-notify-aio";

import {
  useAddContactMutation,
  useGetAllContactsQuery,
} from "features/contacts/contactsSlice";
import ContactForm from "../ContactForm/ContactForm";

export default function AddContact() {
  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetAllContactsQuery();

  const handleAddContact = (e, name, phone) => {
    e.preventDefault();
    const newContact = { name, phone };

    const isExistContact = contacts.find(contact => contact.name === name);
    isExistContact
      ? Notify.warning(`Contact ${name} already in contact book`)
      : addContact(newContact);
  };

  return <ContactForm btnText="Add Contact" handleContact={handleAddContact} />;
}
