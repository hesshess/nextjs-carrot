import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
}

const Login: NextPage = () => {
  const { register } = useForm<LoginForm>();

  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">email : </label>
      <input type="email" />
    </form>
  );
};

export default Login;
