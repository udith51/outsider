import React, { useContext, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import "../assets/css/InfoProvider.css";
import { TAmenities, TContextType, TInfoProvider } from "../types";
import { Context } from "../App";
import {
  banquetAmenities,
  cateringAmenities,
  hotelAmenities,
} from "../lib/utils";

const InfoProvider: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context) as TContextType;
  const cat = user?.category as string;
  const id = user?.id;
  const category = cat?.charAt(0).toUpperCase() + cat?.slice(1);
  const [oldUser, setOldUser] = useState<boolean>(false);

  // const [pictures, setPictures] = useState<File>();
  const [opt, setOpt] = useState<TAmenities[]>([]);
  const [selected, setSelected] = useState<TAmenities[]>([]);

  useEffect(() => {
    setOpt(() => {
      var curr;
      if (cat === "hotel") curr = hotelAmenities;
      else if (cat === "catering") curr = cateringAmenities;
      else curr = banquetAmenities;
      return curr.map((amm) => {
        return { label: amm, value: amm };
      });
    });
  }, []);

  // useEffect(() => {
  //   async function details() {
  //     await fetch(`http://localhost:3000/provider/info/${category}/${id}`)
  //       .then((val) => {
  //         return val.json();
  //       })
  //       .then((res) => {
  //         console.log(res);

  //         // if (res.size !== 0) setForm(res[0]);
  //         // setOldUser(true);
  //       })
  //       .catch((e) => console.log(e));
  //   }
  //   details();
  // }, []);

  const [form, setForm] = useState<TInfoProvider>({
    name: "",
    add1: "",
    add2: "",
    city: "",
    state: "",
    description: "",
    zipcode: 0,
    accomodation: 0,
    price: 0,
    amenities: [],
    basicAmt: 0,
    premiumAmt: 0,
    premiumPlusAmt: 0,
    mocktailAmt: 0,
    standardAmt: 0,
    deluxeAmt: 0,
    standardRooms: 0,
    deluxeRooms: 0,
    assured: 0,
  });

  // const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { files } = event.target;
  //   const selectedFiles = files as FileList;

  //   setPictures(selectedFiles?.[0]);
  //   console.log(pictures);
  // };

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
    console.log(form);
    if (e.target.name === "zipcode" && e.target.value.length === 6) {
      await fetch(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((val) => {
          return val.json();
        })
        .then((res) => {
          if (res[0].PostOffice)
            setForm((prev) => {
              return {
                ...prev,
                city: res[0].PostOffice[0].District,
                state: res[0].PostOffice[0].State,
              };
            });
        })
        .catch(() => {
          setForm((prev) => {
            return { ...prev };
          });
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!oldUser) {
    const assured = Math.floor(Math.random() * 10000);
    const amenities = selected.map((item) => {
      return item.value;
    });
    // console.log({ ...form, id, assured, amenities });
    console.log(form);

    const response = await fetch(
      `http://localhost:3000/provider/register/${category}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id, assured, amenities }),
      }
    );
    if (response.statusText === "OK") {
      const val = await response.json();
      console.log(val);
      navigate("/dash");
    } else {
      const val = await response.json();
      console.log(val);
    }
    // } else {
    //   const response = await fetch(
    //     `http://localhost:3000/provider/info/${category}/${id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...form }),
    //     }
    //   );
    //   if (response.statusText === "OK") {
    //     const val = await response.json();
    //     console.log(val);
    //     navigate("/dash");
    //   } else {
    //     const val = await response.json();
    //     console.log(val);
    //   }
    // }
  };

  return (
    <div className="infoProvider">
      <form onSubmit={handleSubmit}>
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
                id="zip"
                name="zipcode"
                value={form.zipcode ? form.zipcode : ""}
                placeholder="Enter ZipCode"
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
            {/* <input
            type="text"
            id="pictures"
            name="pictures"
            value={form.pictures}
            placeholder="Enter Image"
            onChange={handleChange}
          /> */}
            {/* <input type="file" onChange={selectFile} /> */}
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
