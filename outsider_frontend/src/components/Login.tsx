import React, { useState, useContext } from "react";
import { TContextType, TLogForm } from "../types";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { userType, setAccMode, setUser } = useContext(Context) as TContextType;
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, userType }),
    });
    if (response.status === 200) {
      const val = await response.json();
      setUser(val);
      if (val.userType === "provider") navigate("/dash");
      else navigate("/");
    } else {
      const val = await response.json();
      setMessage(val);
    }

    setForm({
      email: "",
      password: "",
    });
  };
  console.log(message);

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="bar">
        <label htmlFor="email">Email</label>
        <input
          className="aInput"
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
          className="aInput"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          name="password"
          id="password"
          onChange={onChange}
        />
      </div>
      <div className="message">{message}</div>
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
