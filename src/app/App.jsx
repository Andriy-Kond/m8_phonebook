import { Route, Routes } from "react-router-dom";
import { HomePage, SharedLayout } from "common/pages";
import { lazy, useEffect } from "react";
import {
  setIsLoggedIn,
  useGetUserByTokenQuery,
} from "features/Users/UsersSlice";
import { useDispatch } from "react-redux";

const ContactsPage = lazy(() => import("common/pages/ContactsPage"));
const RegisterPage = lazy(() => import("common/pages/RegisterPage"));
const LoginPage = lazy(() => import("common/pages/LoginPage"));
const NotFoundPage = lazy(() => import("common/pages/NotFoundPage"));

export default function App() {
  const { error } = useGetUserByTokenQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(setIsLoggedIn(false));
    } else {
      dispatch(setIsLoggedIn(true));
    }
  }, [dispatch, error]);
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
