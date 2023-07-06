import React, { useState, useContext } from "react";
import { TContextType, TRegForm } from "../types";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const { userType, setAccMode, setUser } = useContext(Context) as TContextType;
  const navigate = useNavigate();

  const [form, setForm] = useState<TRegForm>({
    name: "",
    phone: "",
    email: "",
    password: "",
    category: "",
  });

  const onChange = (e: { target: HTMLInputElement | HTMLSelectElement }) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, userType }),
    });
    if (response.statusText === "OK") {
      const val = await response.json();

      setUser(val);
      if (val.userType === "provider") navigate("/info");
      else navigate("/");
    } else {
      // TODO
      const val = await response.json();
      console.log(val);
    }

    setForm(() => ({
      name: "",
      phone: "",
      email: "",
      password: "",
      category: "",
    }));
  };

  const options = [
    { value: "banquet", label: "Banquet" },
    { value: "hotel", label: "Hotel" },
    { value: "catering", label: "Catering" },
  ];

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="bar">
        <label htmlFor="name">Name</label>
        <input
          className="aInput"
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
          className="aInput"
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
          placeholder="Enter Password (min 8 characters)"
          value={form.password}
          name="password"
          id="password"
          onChange={onChange}
        />
      </div>
      {userType === "provider" && (
        <div className="bar">
          <label htmlFor="category">Category</label>
          <select
            className="aInput"
            name="category"
            id="category"
            defaultValue=""
            onChange={onChange}
          >
            <option disabled value="">
              Select a category
            </option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <input
            type=""
            placeholder="Enter category"
            value={form.category}
            name="category"
            id="category"
            onChange={onChange}
          /> */}
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
