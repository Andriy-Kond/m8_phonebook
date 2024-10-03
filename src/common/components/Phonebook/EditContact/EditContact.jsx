import { useEditContactMutation } from "features/contacts/contactsSlice";
import ContactForm from "../ContactForm/ContactForm";

export default function EditContact({ contact, toggleModal }) {
  const [editContact] = useEditContactMutation();

  const modifyContact = contact => editContact(contact);

  const handleEditContact = (e, name, phone) => {
    e.preventDefault();
    const newContact = { ...contact, name, phone };
    modifyContact(newContact);
    toggleModal();
  };

  return (
    <>
      <p>Відредагуйте свій контакт</p>
      <ContactForm
        contact={contact}
        btnText="Edit Contact"
        handleContact={handleEditContact}
      />
    </>
  );
}
