import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Service.css";
import hotel from "../assets/imgs/hotel.jpg";
import { AiOutlineEye, AiOutlineClockCircle } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { TCartItem, TContextType, TInfoProvider } from "../types";
import { Context } from "../App";

const Hotel: React.FC = () => {
  const { setCartItem, setShowCart, user } = useContext(
    Context
  ) as TContextType;

  const [item, setItem] = useState<TInfoProvider | null>();
  const [stStartDate, setStStartDate] = useState<Date>();
  const [stEndDate, setStEndDate] = useState<Date>();
  const [dlStartDate, setDlStartDate] = useState<Date>();
  const [dlEndDate, setDlEndDate] = useState<Date>();
  const [stRooms, setStRooms] = useState<number>(0);
  const [dlRooms, setDlRooms] = useState<number>(0);
  const [stRoomAmt, setStRoomAmt] = useState<number>(
    item?.standardAmt as number
  );
  const [dlRoomAmt, setDlRoomAmt] = useState<number>(item?.deluxeAmt as number);
  const [currentImg, setCurrentImg] = useState<string>("");
  const { category, id } = useParams();

  useEffect(() => {
    setDlRoomAmt(() => {
      return dlRooms === 0
        ? (item?.deluxeAmt as number)
        : dlRooms * (item?.deluxeAmt as number);
    });
    setStRoomAmt(() => {
      return stRooms === 0
        ? (item?.standardAmt as number)
        : stRooms * (item?.standardAmt as number);
    });
  }, [dlRooms, stRooms]);

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(
        `https://outsider-backend.onrender.com/provider/info/${category}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
        category: "hotel",
        stRooms,
        dlRooms,
        stStartDate: stStartDate as Date,
        stEndDate: stEndDate as Date,
        dlStartDate: dlStartDate as Date,
        dlEndDate: dlEndDate as Date,
        standardAmt: item?.standardAmt as number,
        deluxeAmt: item?.deluxeAmt as number,
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
    <div className="hotelMain">
      <div className="hotelTop">
        <div className="hotelName">{item?.name?.toUpperCase()}</div>
        <div className="hotelAdd">
          {item?.add1}, {item?.add2}, {item?.city}, {item?.state}
        </div>
      </div>
      <div className="hotelMid">
        <div className="hotelImgs">
          <img src={currentImg} alt="hotel-img" className="hotelMainImg" />
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
        <div className="hotelRight">
          <div className="spread">
            <div className="hotelView pb5">
              <AiOutlineEye className="green f20" />{" "}
              {Math.floor(Math.random() * 100)} viewing
            </div>

            <div className="hotelBooked pb5">
              <AiOutlineClockCircle className="green f20" /> Last booked:{" "}
              {Math.floor(Math.random() * 10)} hours ago
            </div>
          </div>
          <div className="br"></div>
          <div className="hotelTimings">
            <div>
              <b>CHECKIN:</b> 1:00 P.M.{" "}
            </div>
            <div className="pb5"></div>
            <div>
              <b>CHECKOUT:</b> 11:00 A.M.
            </div>
          </div>

          <div className="br"></div>
          <div className="hotelAmenities">
            {item?.amenities?.map((amenity, index) => (
              <div className="amenity" key={index}>
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hotelOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        {item?.description || <div className="">{item?.description}</div>}
      </div>
      <div className="pb20"></div>
      <b>CHOOSE ROOM</b>
      <div className="pb20"></div>
      <div className="hotelRoom">
        <b>STANDARD ROOM</b>
        <div className="hotelStandard">
          <div className="roomLeft">
            <img src={item?.pictures[0].url} alt="" className="imgSml" />
          </div>
          <div className="roomMid">
            <div className="col">
              Enter CheckIn Date
              <DatePicker
                selectsStart
                selected={stStartDate}
                onChange={(date) => setStStartDate(date as Date)}
                startDate={stStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter CheckOut Date
              <DatePicker
                selectsEnd
                selected={stEndDate}
                onChange={(date) => setStEndDate(date as Date)}
                endDate={stEndDate}
                startDate={stStartDate}
                minDate={stStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter no. of Rooms
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setStRooms((rooms) => (rooms === 0 ? rooms : rooms - 1));
                  }}
                >
                  -
                </div>
                <div className="val">{stRooms}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setStRooms((rooms) =>
                      rooms === item?.standardRooms ? rooms : rooms + 1
                    );
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="roomRight">
            <div className="finalAmt">
              &#8377; {stRoomAmt ? stRoomAmt : (item?.standardAmt as number)}{" "}
              <div className="small">/ day</div>
            </div>
          </div>
        </div>
        <b>DELUXE ROOM</b>
        <div className="hotelDeluxe">
          <div className="roomLeft">
            <img src={item?.pictures[0].url} alt="" className="imgSml" />
          </div>
          <div className="roomMid">
            <div className="col">
              Enter CheckIn Date
              <DatePicker
                selectsStart
                selected={dlStartDate}
                onChange={(date) => setDlStartDate(date as Date)}
                startDate={dlStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter CheckOut Date
              <DatePicker
                selectsEnd
                selected={dlEndDate}
                onChange={(date) => setDlEndDate(date as Date)}
                endDate={dlEndDate}
                startDate={dlStartDate}
                minDate={dlStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter no. of Rooms
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setDlRooms((rooms) => (rooms === 0 ? rooms : rooms - 1));
                  }}
                >
                  -
                </div>
                <div className="val">{dlRooms}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setDlRooms((rooms) =>
                      rooms === item?.deluxeRooms ? rooms : rooms + 1
                    );
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="roomRight">
            <div className="finalAmt">
              &#8377; {dlRoomAmt ? dlRoomAmt : (item?.deluxeAmt as number)}{" "}
              <div className="small">/ day</div>
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

export default Hotel;
