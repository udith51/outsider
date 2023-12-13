import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { uid } from "uid";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import "../assets/css/InfoProvider.css";
import { TAmenities, TContextType, TInfoProvider } from "../types";
import { Context } from "../App";
import {
  banquetAmenities,
  cateringAmenities,
  getPin,
  hotelAmenities,
} from "../lib/utils";

const InfoProvider: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context) as TContextType;
  const cat = user?.category as string;
  const category = cat?.charAt(0).toUpperCase() + cat?.slice(1);
  const [pictures, setPictures] = useState<FileList | null>();
  const [opt, setOpt] = useState<TAmenities[]>([]);
  const [selected, setSelected] = useState<TAmenities[]>([]);
  const [oldUser, setOldUser] = useState<boolean>(false);
  const userStore = localStorage.getItem("user");
  var id = "";
  if (userStore) {
    const userData = JSON.parse(userStore);
    id = userData.userId;
  }

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(
        `http://localhost:3000/provider/update-info/${category}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          const val = await response.json();
          if (val) {
            const amm = val.amenities.map(
              (val: { label: string; value: string }) => {
                return { label: val, value: val };
              }
            );
            setSelected(amm);
            setForm(val);
            setOldUser(true);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    setOpt(() => {
      var curr;
      if (cat === "hotel") curr = hotelAmenities;
      else if (cat === "catering") curr = cateringAmenities;
      else curr = banquetAmenities;
      return curr.map((amm) => {
        return {
          label: amm,
          value: amm,
        };
      });
    });
  }, [cat]);

  const [form, setForm] = useState<TInfoProvider>({
    serviceId: uid(),
    name: "",
    add1: "",
    add2: "",
    pincode: "",
    city: "",
    state: "",
    description: "",
    providerId: user?.userId as string,
    pictures: [],
    accomodation: 0,
    price: 0,
    basicAmt: 0,
    premiumAmt: 0,
    premiumPlusAmt: 0,
    mocktailAmt: 0,
    standardAmt: 0,
    deluxeAmt: 0,
    standardRooms: 0,
    deluxeRooms: 0,
    assured: Math.floor(Math.random() * 10000),
  });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setPictures(files);
  };

  const setFormData = (formData: FormData): FormData => {
    selected.forEach((item) => {
      formData.append("amenities", item.value);
    });

    if (pictures) {
      for (let i = 0; i < pictures.length; i++) {
        formData.append("pictures", pictures[i]);
      }
    }
    for (const key in form) {
      const value = form[key as keyof TInfoProvider] as string;
      if (typeof form[key as keyof TInfoProvider] === "number") {
        formData.append(key, value.toString());
      } else if (typeof form[key as keyof TInfoProvider] === "string") {
        formData.append(key, value);
      }
    }
    return formData;
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length) {
      e.target.style.border = "0.5";
      e.target.style.borderColor = "green";
      e.target.style.borderStyle = "solid";
    } else {
      e.target.style.borderColor = "red";
      e.target.style.borderStyle = "solid";
    }

    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    if (e.target.name === "pincode" && e.target.value.length === 6) {
      getPin(e.target.value)
        .then((place) => {
          setForm((prev) => {
            return {
              ...prev,
              city: place.city,
              state: place.state,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var formData = setFormData(new FormData());
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(oldUser);
    if (oldUser) {
      console.log(formData.get("pictures"));
      axios
        .patch(
          `http://localhost:3000/provider/update-info/${category}/${id}`,
          formData,
          config
        )
        .then((response) => {
          if (response.statusText === "OK") {
            console.log(response.data);
            navigate("/dash");
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `http://localhost:3000/provider/register/${category}`,
          formData,
          config
        )
        .then((response) => {
          if (response.statusText === "OK") {
            console.log(response.data);
            navigate("/dash");
          } else {
            console.log(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="infoProvider">
      <form onSubmit={handleSubmit} encType="application/form-data">
        <div className="bar">
          <label htmlFor="name">{category} Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            placeholder="Enter Name"
            onChange={handleChange}
          />
        </div>

        <div className="bar">
          <label htmlFor="address">{category} Address</label>
          {category !== "Catering" && (
            <>
              <input
                type="text"
                id="add1"
                name="add1"
                value={form.add1}
                placeholder="Enter Address Line 1"
                onChange={handleChange}
              />
              <input
                type="text"
                id="add2"
                name="add2"
                value={form.add2}
                placeholder="Enter Address Line 2"
                onChange={handleChange}
              />
            </>
          )}
          <div className="wEq">
            {category !== "Catering" && (
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={form.pincode ? form.pincode : ""}
                placeholder="Enter Pinode"
                onChange={handleChange}
              />
            )}
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              placeholder="Enter City name"
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              placeholder="Enter State name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bar">
          <label htmlFor="description">{category} Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description in 200 words"
          />
        </div>

        {category === "Banquet" && (
          <div className="w2">
            <div className="bar">
              <label htmlFor="accomodation">Banquet Accomodation</label>
              <input
                type="text"
                id="accomodation"
                name="accomodation"
                value={form.accomodation ? form.accomodation : ""}
                placeholder="Enter max accomodation in Banquet"
                onChange={handleChange}
              />
            </div>
            <div className="bar">
              <label htmlFor="price">Quote Price (in &#x20B9;)</label>
              <input
                type="text"
                id="price"
                name="price"
                value={form.price ? form.price : ""}
                placeholder="Enter Banquet Price"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="w2">
          <div className="bar">
            <label htmlFor="amenities">{category} Amenities</label>
            <MultiSelect
              options={opt}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
          <div className="bar">
            <label htmlFor="pictures">{category} Images</label>
            <input type="file" onChange={selectFile} multiple />
          </div>
        </div>

        {category === "Catering" && (
          <div className="bar">
            <label htmlFor="cateringPrice">Catering Prices (in &#x20B9;)</label>
            <div className="w4">
              <input
                type="text"
                id="basicAmt"
                name="basicAmt"
                value={form.basicAmt ? form.basicAmt : ""}
                placeholder="Enter Basic Amount"
                onChange={handleChange}
              />
              <input
                type="text"
                id="premiumAmt"
                name="premiumAmt"
                value={form.premiumAmt ? form.premiumAmt : ""}
                placeholder="Enter Premium Amount"
                onChange={handleChange}
              />
              <input
                type="text"
                id="premiumPlusAmt"
                name="premiumPlusAmt"
                value={form.premiumPlusAmt ? form.premiumPlusAmt : ""}
                placeholder="Enter Premium Plus Amount"
                onChange={handleChange}
              />
              <input
                type="text"
                id="mocktailAmt"
                name="mocktailAmt"
                value={form.mocktailAmt ? form.mocktailAmt : ""}
                placeholder="Enter Mocktail Amount"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {category === "Hotel" && (
          <div className="w2">
            <div className="bar">
              <label htmlFor="standardRooms">Standard Rooms</label>
              <input
                type="text"
                id="standardRooms"
                name="standardRooms"
                value={form.standardRooms ? form.standardRooms : ""}
                placeholder="Enter no. of Standard rooms available"
                onChange={handleChange}
              />
            </div>
            <div className="bar">
              <label htmlFor="standardAmt">
                Standard Room Price (in &#x20B9;)
              </label>
              <input
                type="text"
                id="standardAmt"
                name="standardAmt"
                value={form.standardAmt ? form.standardAmt : ""}
                placeholder="Enter Standard Room Price"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {category === "Hotel" && (
          <div className="w2">
            <div className="bar">
              <label htmlFor="deluxeRooms">Deluxe Rooms</label>
              <input
                type="text"
                id="deluxeRooms"
                name="deluxeRooms"
                value={form.deluxeRooms ? form.deluxeRooms : ""}
                placeholder="Enter no. of Deluxe rooms available"
                onChange={handleChange}
              />
            </div>
            <div className="bar">
              <label htmlFor="deluxeAmt">Deluxe Room Price (in &#x20B9;)</label>
              <input
                type="text"
                id="deluxeAmt"
                name="deluxeAmt"
                value={form.deluxeAmt ? form.deluxeAmt : ""}
                placeholder="Enter Deluxe Room Price"
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <button type="submit" className="infoSub">
          {oldUser ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default InfoProvider;
