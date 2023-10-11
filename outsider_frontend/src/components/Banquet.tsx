import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Service.css";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TCartItem, TContextType, TInfoProvider } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../App";
const Banquet: React.FC = () => {
  const { setShowCart, setCartItem, user } = useContext(
    Context
  ) as TContextType;

  const [item, setItem] = useState<TInfoProvider | null>();
  const [date, setDate] = useState<Date>(new Date());
  const [halls, setHalls] = useState<number>(1);
  const [hallAmt, setHallAmt] = useState<number>(0);
  const [currentImg, setCurrentImg] = useState<string>("");
  const { category, id } = useParams();

  useEffect(() => {
    setHallAmt(() => {
      return halls * (item?.price as number);
    });
  }, [halls]);

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(`http://localhost:3000/provider/info/${category}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const val = await response.json();
          setItem(val);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    item?.pictures && setCurrentImg(item.pictures[0].url);
  }, [item]);

  const navigate = useNavigate();

  const addToCart = () => {
    if (user) {
      const rsv: TCartItem = {
        picture: item?.pictures[0].url || "",
        customerId: user?.userId as string,
        customerName: user?.name as string,
        customerEmail: user?.email as string,
        customerPhone: user?.phone as string,
        providerId: item?.providerId as string,
        serviceId: item?.serviceId as string,
        name: item?.name as string,
        category: "banquet",
        halls,
        date,
        price: item?.price,
      };
      setCartItem((items) => {
        const finCart = items.filter(
          (item) => item.serviceId !== rsv.serviceId
        );
        return [rsv, ...finCart];
      });
      setShowCart(true);
    } else {
      navigate("/account");
    }
  };

  return (
    <div className="banquetMain">
      <div className="banquetTop">
        <div className="banquetName">{item?.name?.toUpperCase()}</div>
        <div className="banquetAdd">
          {item?.add1}, {item?.add2}, {item?.city}, {item?.state}
        </div>
      </div>
      <div className="banquetMid">
        <div className="banquetImgs">
          <img src={currentImg} alt="banquet-img" className="banquetMainImg" />
          <div className="imgRoll">
            {item?.pictures.map((pic, index) => {
              return (
                <img
                  src={pic.url}
                  key={index}
                  className="imgItem"
                  alt="banquet-img"
                  onClick={() => {
                    setCurrentImg(pic.url);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="banquetRight">
          <div className="banquetView pb5">
            <AiOutlineEye className="green f20" />{" "}
            {Math.floor(Math.random() * 100)} viewing
          </div>
          <div className="banquetBooked pb5">
            <AiOutlineClockCircle className="green f20" /> Last booked:{" "}
            {Math.floor(Math.random() * 10)} hours ago
          </div>
          <div className="br"></div>
          <div className="banquetInfo">
            <b>ACCOMODATION:</b> Upto {item?.accomodation as string | 1500}{" "}
            people <div className="pb5"></div>
            <b>TOTAL HALLS:</b> 5
          </div>
          <div className="br"></div>
          <div className="banquetAmenities">
            {item?.amenities?.map((amenity, index) => (
              <div className="amenity" key={index}>
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="banquetOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        {item?.description || <div className="">{item?.description}</div>}
      </div>
      <div className="pb20"></div>
      <b>CHOOSE SERVICE</b>
      <div className="pb20"></div>
      <div className="banquetBooking">
        <div className="hall">
          <div className="hallLeft">
            <img src={currentImg} alt="" className="imgSml" />
          </div>
          <div className="hallMid">
            <div className="col">
              Enter Event Date
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date as Date)}
                className="date"
                placeholderText="MM/DD/YYYY"
              />
            </div>
            <div className="col">
              Enter no. of Halls
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setHalls((halls) => (halls === 1 ? halls : halls - 1));
                  }}
                >
                  -
                </div>
                <div className="val">{halls}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setHalls((halls) => (halls === 5 ? halls : halls + 1));
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="hallRight">
            <div className="finalAmt">
              &#8377; {hallAmt ? hallAmt : item?.price}
            </div>
          </div>
        </div>
        <div className="pb20"></div>
        <div className="bookNow" onClick={addToCart}>
          CONFIRM DETAILS
        </div>
      </div>
    </div>
  );
};

export default Banquet;
