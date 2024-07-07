import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-1 bg-slate-800 text-white py-1 relative bottom-0 m-0">
      <span className="font-bold text-xl">
        <span className="text-green-600">&lt;</span>
        <span>Key</span>
        <span className="text-green-600">OP/&gt;</span>
      </span>
      <span>🔐 Securing your digital life, one password at a time ✨</span>
    </div>
  );
};

export default Footer;
