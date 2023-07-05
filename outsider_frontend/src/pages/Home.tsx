import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App";
import { TContextType, TInfoProvider } from "../types";
import Item from "../components/Item";
import "../assets/css/Home.css";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") as string)?.userType;
  const { activeTab, showCart } = useContext(Context) as TContextType;
  const [items, setItems] = useState<TInfoProvider[] | null>();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    async function getData(): Promise<void> {
      await fetch(`http://localhost:3000/provider/all/${activeTab}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const val = await response.json();
          setItems(val);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (!user) console.log("No user");
    else {
      getData();
    }
  }, [activeTab, user]);

  useEffect(() => {
    if (showCart) {
      ref.current?.classList.add("ovHidden");
    } else {
      ref.current?.classList.remove("ovHidden");
    }
  }, [showCart]);
  return (
    <>
      <Navbar />
      <div className="home" ref={ref as React.MutableRefObject<HTMLDivElement>}>
        <div className="homeLeft"></div>
        <div className="homeRight">
          {items?.map((item) => {
            return <Item item={item} key={item.add1} />;
          })}
        </div>
      </div>
      {showCart && <Cart />}
    </>
  );
};

export default Home;
