import React, { useState, useContext } from "react";
import { TContextType, TRegForm } from "../types";
import { Context } from "../App";

const Registration: React.FC = () => {
  const { userType, setAccMode } = useContext(Context) as TContextType;

  const [form, setForm] = useState<TRegForm>({
    name: "",
    phone: "",
    email: "",
    password: "",
    category: "",
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
    const response = await fetch(
      `http://localhost:3000/register-${userType}/${form.category}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    console.log(response.statusText);
    setForm(() => ({
      name: "",
      phone: "",
      email: "",
      password: "",
      category: "",
    }));
  };

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="bar">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          name="name"
          id="name"
          onChange={onChange}
        />
      </div>
      <div className="bar">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          placeholder="Enter Phone"
          value={form.phone}
          name="phone"
          id="phone"
          onChange={onChange}
        />
      </div>
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
          placeholder="Enter Password (min 8 characters)"
          value={form.email}
          name="password"
          id="password"
          onChange={onChange}
        />
      </div>
      {userType === "provider" && (
        <div className="bar">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            value={form.category}
            name="category"
            id="category"
            onChange={onChange}
          />
        </div>
      )}
      <button type="submit" className="accSubmit">
        Register
      </button>
      <div
        className="btmText"
        onClick={() => {
          setAccMode("login");
        }}
      >
        Already a registered user?
      </div>
    </form>
  );
};

export default Registration;
