import { setUserToken, useSignupUserMutation } from "features/Users/UsersSlice";
import { useDispatch } from "react-redux";

export default function RegisterPage() {
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const dispatch = useDispatch();

  const submitCredentials = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userCredentials = Object.fromEntries(formData);
    const result = await signupUser(userCredentials);

    dispatch(setUserToken(result.data.token));
  };
  return (
    <>
      <h2>Register Page</h2>
      <form onSubmit={submitCredentials}>
        <input type="text" name="name" />
        <input type="text" name="email" />
        <input type="text" name="password" />

        <button type="submit">Register</button>
      </form>
    </>
  );
}
