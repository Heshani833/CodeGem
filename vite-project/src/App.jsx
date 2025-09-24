import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";

const App = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#18181b", // zinc-900
      borderColor: "#3f3f46", // zinc-700
      color: "white",
      innerWidth: "20%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#52525b", // zinc-600
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b", // zinc-900
      color: "white",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b", // hover zinc-800
      color: "white",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#3f3f46", // zinc-700
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    input: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#a1a1aa", // zinc-400
    }),
  };

  return (
    <>
      <Navbar />
      <div
        className="main flex items-center justify-between bg-black-500"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%]">
          <div className="tabs"></div>

          <Select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e);
            }}
            options={options}
            styles={customStyles}
          />
          <button className="btnNormal bg-zinc-900">Review</button>
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
