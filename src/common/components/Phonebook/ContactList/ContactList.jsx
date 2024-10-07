import { useSelector } from "react-redux";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "features/contacts/contactsSlice";
import { selectFilters } from "app/selectors";
import { useState } from "react";
import Modal from "common/components/Phonebook/Modal";
import EditContact from "common/components/Phonebook/EditContact";

export default function ContactList() {
  const {
    data: contacts,
    isFetching,
    isLoading,
  } = useGetAllContactsQuery("", {
    // pollingInterval: 3000,
    // skip: false,
    refetchOnMountOrArgChange: true,
    // refetchOnFocus: true,
  });

  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(selectFilters);

  const [contactForEdit, setContactForEdit] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = contact => {
    setIsOpenModal(prevState => !prevState);
    setContactForEdit(contact);
  };

  const removeContact = contactId => deleteContact(contactId);

  const visibleContacts = contacts?.filter(contact => {
    return contact.name
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase());
  });

  return (
    <>
      {!isFetching && (
        <ul>
          {visibleContacts?.map(contact => {
            return (
              <li key={contact.id}>
                <p>
                  {contact.name}: {contact.number}
                </p>
                <button onClick={() => removeContact(contact.id)}>
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => {
                    toggleModal(contact);
                  }}>
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <EditContact contact={contactForEdit} toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
}
