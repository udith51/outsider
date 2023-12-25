import React, { useEffect, useContext, useState } from "react";
import "../assets/css/Booking.css";
import ReserveBox from "../components/ReserveBox";
import { Context } from "../App";
import { TCartItem, TContextType } from "../types";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo-no-background1.png";
import { MdOutlineAccountCircle } from "react-icons/md";

const Booking: React.FC = () => {
  const { user, setUser } = useContext(Context) as TContextType;
  const [reservations, setReservation] = useState<TCartItem[]>([]);

  useEffect(() => {
    async function getData() {
      await fetch(
        `https://outsider-backend.onrender.com/reserve/${user?.category}/${user?.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (data) => {
          const resp = await data.json();
          setReservation(resp);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="dashNav">
        <div className="dashNavContents">
          <div
            className="navLogo"
            onClick={() => {
              navigate("/dash");
            }}
          >
            <img src={logo} className="logo" />
          </div>
          <div className="navAccount">
            <div className="dropbtn">Hi {user?.name.split(" ")[0]}</div>
            <div className="tdropbtn">
              <MdOutlineAccountCircle className="w26 h26" />
            </div>
            <div className="dropdown-Content">
              <div
                onClick={() => {
                  setUser(undefined);
                  navigate("/");
                }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bookingsWrapper">
        <div className="booking">
          {reservations.map((reservation, index) => {
            return <ReserveBox key={index} reservation={reservation} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Booking;
