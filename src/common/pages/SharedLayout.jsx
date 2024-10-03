import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <main>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home Page</Link>
          <Link to="/contacts">Contacts Page</Link>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
