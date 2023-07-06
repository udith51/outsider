import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Service.css";
import banquet from "../assets/imgs/banquet.jpg";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TCartItem, TContextType, TInfoProvider } from "../types";
import { useParams } from "react-router-dom";
import { Context } from "../App";
const Banquet: React.FC = () => {
  const { setShowCart, setCartItem } = useContext(Context) as TContextType;

  const [item, setItem] = useState<TInfoProvider | null>();
  const [date, setDate] = useState<Date>(new Date());
  const [halls, setHalls] = useState<number>(1);
  const [hallAmt, setHallAmt] = useState<number>(0);

  const { category, id } = useParams();

  useEffect(() => {
    setHallAmt(() => {
      return halls * (item?.price as number);
    });
  }, [halls]);

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(`http://localhost:3000/provider/${category}/${id}`, {
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

  const addToCart = () => {
    window.scrollTo(0, 0);
    const rsv: TCartItem = {
      id: item?._id as number,
      providerId: item?.id as number,
      name: item?.name as string,
      category: category as string,
      halls,
      date,
      price: item?.price,
    };
    setCartItem((items) => [...items, rsv]);
    setShowCart(true);
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
          <img src={banquet} alt="banquetImg" className="banquetMainImg" />
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
          <div className="banquetAmenities">Amenities</div>
        </div>
      </div>
      <div className="banquetOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nisi
        possimus modi. Repellendus facilis eius autem, facere dolore distinctio
        placeat quas magni, mollitia amet quidem nisi asperiores natus libero
        numquam? Reprehenderit, hic eius aliquid dignissimos quibusdam at quae
        quis facere aperiam non ratione, ut maxime sed dolorum possimus aut
        quisquam neque quasi sapiente quia fuga! Quasi error veniam magnam quam!
        Perferendis ut unde distinctio libero vel nisi blanditiis architecto eos
        officiis a est, error sint officia, doloribus dolore quaerat nam magni
        praesentium. Neque alias similique molestiae illo itaque voluptatum
        eius? Aspernatur asperiores voluptatum sit enim, alias nihil
        reprehenderit animi quas consequuntur? Commodi necessitatibus odit
        voluptatem itaque minima. Possimus laudantium deleniti perferendis
        culpa! Praesentium placeat eius sequi. Pariatur, dolor? Qui, quaerat.
      </div>
      <div className="pb20"></div>
      <div className="banquetBooking">
        <div className="hall">
          <div className="hallLeft">
            <img src={banquet} alt="" className="imgSml" />
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
          BOOK NOW
        </div>
      </div>
    </div>
  );
};

export default Banquet;
