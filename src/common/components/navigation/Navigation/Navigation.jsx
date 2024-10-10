import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
    </>
  );
}
