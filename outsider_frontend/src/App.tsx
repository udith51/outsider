import "../src/assets/css/App.css";
import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Prime from "./pages/Prime";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Support from "./pages/Support";
import { TContextType } from "./types";
import InfoProvider from "./pages/InfoProvider";

export const Context = createContext<TContextType | null>(null);
const App: React.FC = () => {
  const [path, setPath] = useState<string>("");
  const [accMode, setAccMode] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  return (
    <div className="App">
      <InfoProvider />
      {/* <Context.Provider
        value={{ path, setPath, accMode, setAccMode, userType, setUserType }}
      >
        {path !== "account" && <Navbar />}
        <Routes>
          <Route path="/prime" element={<Prime />} />
          <Route path="/account" element={<Account />} />
          <Route path="/support" element={<Support />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Context.Provider> */}
    </div>
  );
};

export default App;
