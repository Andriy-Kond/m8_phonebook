import { Route, Routes } from "react-router-dom";
import { HomePage, SharedLayout } from "common/pages";
import { lazy } from "react";

const ContactsPage = lazy(() => import("common/pages/ContactsPage"));
const NotFoundPage = lazy(() => import("common/pages/NotFoundPage"));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
