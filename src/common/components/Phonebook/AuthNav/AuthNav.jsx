import { Link } from "react-router-dom";

export default function AuthNav() {
  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}
