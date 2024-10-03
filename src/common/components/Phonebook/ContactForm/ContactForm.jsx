import { useState } from "react";

export default function ContactForm({
  contact = "",
  btnText = "button",
  handleContact,
}) {
  const [name, setName] = useState(contact.name ?? "");
  const [number, setNumber] = useState(contact.number ?? "");

  const clearState = () => {
    setName("");
    setNumber("");
  };

  const modifyContact = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        return setName(value);

      case "number":
        return setNumber(value);

      default:
        throw new Error(`Cannot to process the case of ${name}`);
    }
  };

  return (
    <>
      <form
        onSubmit={e => {
          handleContact(e, name, number);
          clearState();
        }}>
        <label>
          Name
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={modifyContact}
          />
        </label>

        <label>
          Telephone
          <input
            type="tel"
            name="number"
            required
            value={number}
            onChange={modifyContact}
          />
        </label>
        <button type="submit">{btnText}</button>
      </form>
    </>
  );
}
