import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div
        className="main flex items-center justify-between bg-red-500"
        style={{ height: "calc(100vh - 90px)" }}
      ></div>
    </>
  );
};

export default App;
