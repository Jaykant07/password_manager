import React from "react";

function Navbar() {
  return (
    <nav className="bg-slate-800 flex justify-between items-center p-2 sm:p-4 h-12 sm:h-20 mb-2 ">
      <div className="font-bold text-white text-2xl ml-4 sm:ml-10 md:ml-20">
        <span className="text-blue-500">&lt;</span>
        <span>Pass</span>
        <span className="text-blue-500">OP&gt;</span>
      </div>

      {/* <ul className="flex text-white text-lg m-20 ">
        <li className="flex gap-3">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="/">
            About
          </a>
          <a className="hover:font-bold" href="/">
            Contact
          </a>
        </li>
      </ul> */}

      <button
        className="bg-slate-700 hover:bg-blue-700 rounded-full flex justify-center items-center px-2 py-1 mr-4 sm:mr-10 ring-white ring-1 text-white"
        onClick={() =>
          window.open("https://github.com/Jaykant07/password_manager", "_blank")
        }
      >
        <img
          src="/icons/github-sign.png"
          alt="github"
          className="w-6 p-1 sm:w-8"
        />
        <span className="hidden sm:inline ml-2">GitHub</span>
      </button>
    </nav>
  );
}

export default Navbar;
