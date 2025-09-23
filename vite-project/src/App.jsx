import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";

const App = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const changeLang = () => {};
  return (
    <>
      <Navbar />
      <div
        className="main flex items-center justify-between bg-red-500"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%]">
          <Select
            value={options[0]}
            onChange={(e) => {
              console.log(e);
            }}
            options={options}
          />
          <Editor
            height="100%"
            theme="vs-dark"
            language="javascript"
            value="// some comment"
          />
        </div>
      </div>
    </>
  );
};

export default App;
