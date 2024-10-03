import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <main>
        <nav
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/">Home</Link>
            <Link to="/contacts">Contacts</Link>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
