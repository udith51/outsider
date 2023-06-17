import React, { useState } from "react";
import { TRegForm } from "../types";

const ProviderRegistration: React.FC = () => {
  const [form, setForm] = useState<TRegForm>({
    name: "",
    phone: "",
    email: "",
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
      `http://localhost:3000/register-provider/${form.category}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    // const val=await response.json();
    console.log(response.statusText);
    setForm(() => ({
      name: "",
      phone: "",
      email: "",
      category: "",
    }));
  };
  // const [name,setName]=useState<String>("");
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
      <button type="submit" className="regSubmit">
        Submit
      </button>
    </form>
  );
};

export default ProviderRegistration;
