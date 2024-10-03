import { useState } from "react";

export default function ContactForm({
  contact = "",
  btnText = "button",
  handleContact,
}) {
  const [name, setName] = useState(contact.name ?? "");
  const [phone, setPhone] = useState(contact.phone ?? "");

  const clearState = () => {
    setName("");
    setPhone("");
  };

  const modifyContact = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "name":
        return setName(value);

      case "phone":
        return setPhone(value);

      default:
        throw new Error(`Cannot to process the case of ${name}`);
    }
  };

  return (
    <>
      <form
        onSubmit={e => {
          handleContact(e, name, phone);
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
            name="phone"
            required
            value={phone}
            onChange={modifyContact}
          />
        </label>
        <button type="submit">{btnText}</button>
      </form>
    </>
  );
}
