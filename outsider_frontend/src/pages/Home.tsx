import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { TContextType, TInfoProvider } from "../types";

const Home: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") as string)?.userType;
  const { activeTab } = useContext(Context) as TContextType;
  const [items, setItems] = useState<TInfoProvider[] | null>();

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
  return (
    <>
      {items?.map((item) => {
        return item.name;
      })}
    </>
  );
};

export default Home;
