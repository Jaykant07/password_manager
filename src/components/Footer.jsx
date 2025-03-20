import React from "react";

function Footer() {
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center text-white h-12 sm:h-20  fixed bottom-0 w-full p-4 text-center">
      <div className="font-bold text-white text-1xl sm:text-2xl m-1">
        <span className="text-blue-500">&lt;</span>
        <span>Pass</span>
        <span className="text-blue-500">OP&gt;</span>
      </div>
      <div className="flex justify-center items-center text-sm mb-2 sm:text-baser">
        Created with{" "}
        <img className="w-5 sm:w-7 mx-2" src="/icons/heart.png" alt="love" /> by
        Jaykant007
      </div>
    </div>
  );
}

export default Footer;
