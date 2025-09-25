import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { DotLoader } from "react-spinners";

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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [responseType, setResponseType] = useState("review"); // 'review' or 'fix'

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      borderColor: "#3f3f46",
      color: "white",
      innerWidth: "100%",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#52525b",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#18181b",
      color: "white",
      with: "100%",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b",
      color: "white",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#3f3f46",
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
      color: "#a1a1aa",
      with: "100%",
    }),
  };

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBkm52SrYSW81hoODzzc9oEAIu1GH-3V_k",
  });

  async function reviewCode() {
    setLoading(true);
    setResponseType("review");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.

I'm sharing a piece of code written in ${selectedOption.value}.

Your job is to deeply review this code and provide the following:

1. A quality rating: Better, Good, Normal, or Bad.

2. Detailed suggestions for improvement, including best practices and advanced alternatives.

3. A clear explanation of what the code does, step by step.

4. A list of any potential bugs or logical errors if found.

5. Identification of syntax errors or runtime errors, if present.

6. Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

code: ${code}
`,
    });
    console.log(response.text);
    setResponse(response.text);
    setLoading(false);
  }

  async function fixCode() {
    setLoading(true);
    setResponseType("fix");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.

I'm sharing a piece of code written in ${selectedOption.value}.

Your job is to fix this code by:

1. Identifying and correcting any syntax errors
2. Fixing logical errors and bugs
3. Improving code efficiency and performance
4. Following best practices for the language
5. Providing the complete corrected code

Please return the fixed code with explanations of what was changed.

code: ${code}
`,
    });
    console.log(response.text);
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <Navbar responseType={responseType} />
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
            <button
              onClick={() => {
                if (code === "") {
                  alert("Please enter the code first!");
                } else {
                  reviewCode();
                }
              }}
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
            >
              Review
            </button>
            <button
              onClick={() => {
                if (code === "") {
                  alert("Please enter the code first!");
                } else {
                  fixCode();
                }
              }}
              className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
            >
              Fix Code
            </button>
          </div>
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
          />
        </div>

        <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[100%]">
          <div className="topTab border-b-[1px] border-t-[1px] border-[#fff] flex items-center justify-between h-[60px] ">
            <p className="font-[700] text-[17px]">Response</p>
          </div>
          {loading ? (
            <div className="loading-container">
              <DotLoader color="#9333ea" size={60} />
              <div className="loading-text">Analyzing your code...</div>
            </div>
          ) : (
            <div className="markdown-response">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
