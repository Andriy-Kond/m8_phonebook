import AppBar from "common/components/navigation/AppBar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <main>
        <header>
          <AppBar />
          {/* <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/">Home</Link>
            <Link to="/contacts">Contacts</Link>
          </div> */}

          {/* <div style={{ display: "flex", gap: "10px" }}>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div> */}
        </header>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
