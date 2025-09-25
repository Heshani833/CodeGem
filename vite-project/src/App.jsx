import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";

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
      innerWidth: "100%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#52525b",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b", // zinc-900
      color: "white",
      with: "100%",
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
      with: "100%",
    }),
    input: (base) => ({
      ...base,
      color: "white",
      with: "100%",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#a1a1aa", // zinc-400
      with: "100%",
    }),
  };

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBkm52SrYSW81hoODzzc9oEAIu1GH-3V_k",
  });

  return (
    <>
      <Navbar />
      <div
        className="main flex justify-between bg-black-500"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[87%] w-[50%]">
          <div className="tabs !mt-5 !px-5 !mb-3 w-full flex items-center gap-[10px]">
            <Select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e);
              }}
              options={options}
              styles={customStyles}
            />
            <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">
              Review
            </button>
            <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">
              Fix Code
            </button>
          </div>
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value="// some comment"
          />
        </div>

        <div className="right !p-[10px] bg-zinc-900 w-[50%] h-[100%]">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#fff] flex items-center justify-between h-[60px] ">
            <p className="font-[700] text-[17px]">Response</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
