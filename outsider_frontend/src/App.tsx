import "./App.css";
import React from "react";
// import ProviderRegistration from './components/ProviderRegistration';
import Navbar from "./components/Navbar";
import Registration from "./pages/Registration";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <ProviderRegistration/> */}
      {/* <Navbar /> */}
      <Registration />
    </div>
  );
};

export default App;
