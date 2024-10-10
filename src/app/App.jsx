import { Route, Routes } from "react-router-dom";
import { HomePage, SharedLayout } from "common/pages";
import { lazy, useEffect } from "react";
import {
  setIsLoggedIn,
  useGetUserByTokenQuery,
} from "features/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "./selectors";
import PrivateRoute from "common/components/navigation/PvivateRoute";
import PublicRoute from "common/components/navigation/PublicRoute";

const ContactsPage = lazy(() => import("common/pages/ContactsPage"));
const RegisterPage = lazy(() => import("common/pages/RegisterPage"));
const LoginPage = lazy(() => import("common/pages/LoginPage"));
const NotFoundPage = lazy(() => import("common/pages/NotFoundPage"));

export default function App() {
  const dispatch = useDispatch();
  const authUserToken = useSelector(selectUserToken);

  const { isSuccess } = useGetUserByTokenQuery(undefined, {
    skip: !authUserToken, // Пропускає запит, якщо токен відсутній
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoggedIn(true));
    } else {
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch, isSuccess]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/contacts" element={<ContactsPage />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
