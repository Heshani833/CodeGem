import React from "react";
import { BrainCircuit, Sun } from "lucide-react";

const Navbar = ({ responseType }) => {
  return (
    <>
      <div
        className="nav flex items-center justify-between h-[90px] bg-zinc-800"
        style={{ padding: "0 150px" }}
      >
        <div className="logo flex items-center gap-[10px] cursor-pointer">
          <BrainCircuit size={26} color="#3b82f6" />
          <span className="text-white font-bold text-2xl ml-2">CodeGem</span>
        </div>
        <div className="icons flex items-center gap-[20px]">
          <i
            className={`cursor-pointer transition-all duration-300 ${
              responseType === "fix"
                ? "text-blue-500 scale-125"
                : "text-white hover:scale-125 hover:text-blue-600"
            }`}
          >
            <Sun />
          </i>
        </div>
      </div>
    </>
  );
};

export default Navbar;
