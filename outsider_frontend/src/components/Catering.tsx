import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { TCartItem, TContextType, TInfoProvider } from "../types";
import { useParams } from "react-router-dom";
import catering from "../assets/imgs/catering.jpeg";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import DatePicker from "react-datepicker";

const Catering: React.FC = () => {
  const { setCartItem, setShowCart } = useContext(Context) as TContextType;

  const [item, setItem] = useState<TInfoProvider | null>();
  const [bsStartDate, setBsStartDate] = useState<Date>();
  const [bsEndDate, setBsEndDate] = useState<Date>();
  const [prStartDate, setPrStartDate] = useState<Date>();
  const [prEndDate, setPrEndDate] = useState<Date>();
  const [prPStartDate, setPrPStartDate] = useState<Date>();
  const [prPEndDate, setPrPEndDate] = useState<Date>();
  const [bsGuests, setBsGuests] = useState<number>(0);
  const [prGuests, setPrGuests] = useState<number>(0);
  const [prPGuests, setPrPGuests] = useState<number>(0);
  const [bsSerAmt, setBsSerAmt] = useState<number>(0);
  const [prSerAmt, setPrSerAmt] = useState<number>(0);
  const [prPSerAmt, setPrPSerAmt] = useState<number>(0);

  useEffect(() => {
    setBsSerAmt(() => {
      return bsGuests * (item?.basicAmt as number);
    });
    setPrSerAmt(() => {
      return prGuests * (item?.premiumAmt as number);
    });
    setPrPSerAmt(() => {
      return prPGuests * (item?.premiumPlusAmt as number);
    });
  }, [bsGuests, prGuests, prPGuests]);

  const { category, id } = useParams();

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
    const rsv: TCartItem = {
      id: item?._id as number,
      providerId: item?.id as number,
      name: item?.name as string,
      category: category as string,
      bsGuests,
      prGuests,
      prPGuests,
      basicAmt: item?.basicAmt as number,
      premiumAmt: item?.premiumAmt as number,
      premiumPlusAmt: item?.premiumPlusAmt as number,
      bsStartDate,
      bsEndDate,
      prStartDate,
      prEndDate,
      prPStartDate,
      prPEndDate,
    };
    console.log(rsv);

    setCartItem((items) => [...items, rsv]);
    setShowCart(true);
  };

  return (
    <div className="cateringMain">
      <div className="cateringTop">
        <div className="cateringName">{item?.name?.toUpperCase()}</div>
        <div className="cateringAdd">
          {item?.city}, {item?.state}
        </div>
      </div>
      <div className="cateringMid">
        <div className="cateringImgs">
          <img src={catering} alt="catering-img" className="cateingMainImg" />
          <div className="imgRoll">
            <img src={catering} className="imgItem" />
            <img src={catering} className="imgItem" />
            <img src={catering} className="imgItem" />
            <img src={catering} className="imgItem" />
            <img src={catering} className="imgItem" />
          </div>
        </div>
        <div className="cateringRight">
          <div className="cateringView pb5">
            <AiOutlineEye className="green f20" />{" "}
            {Math.floor(Math.random() * 100)} viewing
          </div>
          <div className="hotelBooked pb5">
            <AiOutlineClockCircle className="green f20" /> Last booked:{" "}
            {Math.floor(Math.random() * 10)} hours ago
          </div>
          <div className="br"></div>
          <div className="cateringAmenities"></div>
        </div>
      </div>
      <div className="cateringOverview">
        <b>OVERVIEW</b>
        <div className="pb5"></div>
        {item?.description || (
          <div className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            natus blanditiis quasi at non quia sit neque, incidunt consequatur
            necessitatibus. Alias deleniti inventore, id adipisci nesciunt iusto
            recusandae dolores facere laudantium quaerat. Sunt reiciendis
            blanditiis totam ut a ratione temporibus doloremque excepturi,
            dignissimos nisi animi deleniti inventore fuga error aut quam
            voluptas aperiam ullam sed tenetur mollitia quia facilis optio
            eaque. Culpa, explicabo labore sequi nisi hic omnis? Nesciunt quasi
            aliquam animi accusamus aperiam exercitationem dolor sit qui
            aliquid! Perspiciatis explicabo consequuntur non labore assumenda,
            iste consectetur ex nobis exercitationem cupiditate nulla, corrupti
            fugiat. Voluptates sunt eum distinctio quia, dolores quod facilis
            architecto molestiae provident. Eaque distinctio tenetur ullam, sit
            dolor eligendi exercitationem dolorem assumenda iste eius eum esse
            voluptas cum?
          </div>
        )}
      </div>
      <div className="pb20"></div>
      <b>CHOOSE SERVICE</b>
      <div className="pb20"></div>
      <div className="cateringBooking">
        <b>BASIC PLAN</b>
        <div className="cateringBasic">
          <div className="cateringServiceLeft">
            <div className="col">Sweets (2)</div>
            <div className="col">South Indian Dishes(3)</div>
            <div className="col">Chinese Dishes (3)</div>
            <div className="col">Main Course (3)</div>
            <div className="col">Breads (4)</div>
            <div className="col">Starters (3)</div>
            <div className="col">Desserts & Beverage (8)</div>
          </div>
          <div className="cateringServiceMid">
            <div className="col">
              From Date
              <DatePicker
                selectsStart
                selected={bsStartDate}
                onChange={(date) => setBsStartDate(date as Date)}
                startDate={bsStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              To Date
              <DatePicker
                selectsEnd
                selected={bsEndDate}
                onChange={(date) => setBsEndDate(date as Date)}
                endDate={bsEndDate}
                startDate={bsStartDate}
                minDate={bsStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter Guests
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setBsGuests((guests) =>
                      guests === 0 ? guests : guests - 100
                    );
                  }}
                >
                  -
                </div>
                <div className="val">{bsGuests}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setBsGuests((guests) => guests + 100);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="cateringServiceRight">
            <div className="finalAmt">
              &#8377; {bsSerAmt ? bsSerAmt : (item?.basicAmt as number)}{" "}
              <div className="small">/ meal</div>
            </div>
          </div>
        </div>
        <b>PREMIUM PLAN</b>
        <div className="cateringPremium">
          <div className="cateringServiceLeft">
            <div className="col">Sweets (3)</div>
            <div className="col">South Indian Dishes(3)</div>
            <div className="col">Chinese Dishes (3)</div>
            <div className="col">Chaat (4)</div>
            <div className="col">Main Course (3)</div>
            <div className="col">Breads (5)</div>
            <div className="col">Starters (5)</div>
            <div className="col">Desserts & Beverage (10)</div>
          </div>
          <div className="cateringServiceMid">
            <div className="col">
              From Date
              <DatePicker
                selectsStart
                selected={prStartDate}
                onChange={(date) => setPrStartDate(date as Date)}
                startDate={prStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              To Date
              <DatePicker
                selectsEnd
                selected={prEndDate}
                onChange={(date) => setPrEndDate(date as Date)}
                endDate={prEndDate}
                startDate={prStartDate}
                minDate={prStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter Guests
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setPrGuests((guests) =>
                      guests === 0 ? guests : guests - 100
                    );
                  }}
                >
                  -
                </div>
                <div className="val">{prGuests}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setPrGuests((guests) => guests + 100);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="cateringServiceRight">
            <div className="finalAmt">
              &#8377; {prSerAmt ? prSerAmt : (item?.premiumAmt as number)}{" "}
              <div className="small">/ meal</div>
            </div>
          </div>
        </div>
        <b>PREMIUM PLUS PLAN</b>
        <div className="cateringPremiumPlus">
          <div className="cateringServiceLeft">
            <div className="col">Sweets (4)</div>
            <div className="col">South Indian Dishes(3)</div>
            <div className="col">Chinese Dishes (3)</div>
            <div className="col">Chaat (4)</div>
            <div className="col">Main Course (5)</div>
            <div className="col">Breads (5)</div>
            <div className="col">Pizza (3)</div>
            <div className="col">Starters (5)</div>
            <div className="col">Desserts & Beverage (12)</div>
          </div>
          <div className="cateringServiceMid">
            <div className="col">
              From Date
              <DatePicker
                selectsStart
                selected={prPStartDate}
                onChange={(date) => setPrPStartDate(date as Date)}
                startDate={prPStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              To Date
              <DatePicker
                selectsEnd
                selected={prPEndDate}
                onChange={(date) => setPrPEndDate(date as Date)}
                endDate={prPEndDate}
                startDate={prPStartDate}
                minDate={prPStartDate}
                placeholderText="MM/DD/YYYY"
                className="date"
              />
            </div>
            <div className="col">
              Enter Guests
              <div className="count">
                <div
                  className="minus"
                  onClick={() => {
                    setPrPGuests((guests) =>
                      guests === 0 ? guests : guests - 100
                    );
                  }}
                >
                  -
                </div>
                <div className="val">{prPGuests}</div>
                <div
                  className="plus"
                  onClick={() => {
                    setPrPGuests((guests) => guests + 100);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="cateringServiceRight">
            <div className="finalAmt">
              &#8377; {prPSerAmt ? prPSerAmt : (item?.premiumPlusAmt as number)}{" "}
              <div className="small">/ meal</div>
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

export default Catering;
