import React, { useState, useContext } from "react";
import { TContextType, TLogForm } from "../types";
import { Context } from "../App";

const Login: React.FC = () => {
  const { setAccMode } = useContext(Context) as TContextType;

  const [form, setForm] = useState<TLogForm>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = () => {};

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="bar">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={form.email}
          name="email"
          id="email"
          onChange={onChange}
        />
      </div>
      <div className="bar">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          name="password"
          id="password"
          onChange={onChange}
        />
      </div>
      <button type="submit" className="accSubmit">
        Login
      </button>
      <div
        className="btmText"
        onClick={() => {
          setAccMode("signup");
        }}
      >
        Not a registered user?
      </div>
    </form>
  );
};

export default Login;
