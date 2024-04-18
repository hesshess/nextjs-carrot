import React from "react";
import { useForm } from "react-hook-form";
import useMutation from "@lib/client/useMutation";
interface CreateForm {
  name: string;
  email: string;
}

export default () => {
  const [enter, { loading, data, error }] = useMutation("/api/user/enter");
  const { register, handleSubmit, reset } = useForm<CreateForm>();
  const onValid = (validForm: CreateForm) => {
    enter(validForm);
    reset();
  };
  console.log(loading, data, error);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <h1>Create Account</h1>
      <label htmlFor="name">name : </label>
      <input
        {...register("name", { required: "please enter your name" })}
        id="name"
      />
      <br />
      <label htmlFor="email">email : </label>
      <input
        {...register("email", { required: "please enter your email" })}
        id="email"
      />
      <br />
      <button>Create Account</button>
    </form>
  );
};
