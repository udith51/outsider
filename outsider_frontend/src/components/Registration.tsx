import React, { useState, useContext } from "react";
import axios from "axios";
import { TContextType, TRegForm } from "../types";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
  const { userType, setAccMode, setUser } = useContext(Context) as TContextType;
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
    if (
      !form.email ||
      !form.password ||
      !form.phone ||
      !form.name ||
      (userType === "provider" && !form.category)
    ) {
      setMessage("All the fields are required.");
      return;
    }
    if (form.password.length < 8) {
      setMessage("Password length should be greater than 8 characters.");
      return;
    }
    if (form.phone.length !== 10) {
      setMessage("Incorrect Phone number.");
      return;
    }
    var validRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (validRegEx.test(form.email) !== true) {
      setMessage("Incorrect email address.");
      return;
    }
    setLoading(true);
    await axios
      .post(`https://outsider-backend.onrender.com/auth/register`, {
        ...form,
        userType,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          if (response.data.userType === "provider") navigate("/info");
          else navigate("/");
        }
      })
      .catch((val) => {
        setMessage(val.response.data);
      });
    setLoading(false);
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
    <form className="authForm" onSubmit={onSubmit}>
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
            value={form.category}
            name="category"
            id="category"
            onChange={onChange}
          >
            <option disabled value="" className="aOptions">
              Select a category
            </option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="message">{message}</div>
      {loading ? (
        <div className="spinner">
          <span className="loader"></span>
        </div>
      ) : (
        <button type="submit" className="accSubmit">
          Register
        </button>
      )}

      {!loading && (
        <div
          className="btmText"
          onClick={() => {
            setAccMode("login");
          }}
        >
          Already a registered user?
        </div>
      )}
    </form>
  );
};

export default Registration;
