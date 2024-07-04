import React, { useEffect, useRef, useState } from "react";
const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  let [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      passwordArray = JSON.parse(passwords);
    }
  }, []);

  const showPassword = () => {
    const source = ref.current.src;
    if (source.includes("icons/eye.png"))
      ref.current.src = "icons/eye-slash.png";
    else ref.current.src = "icons/eye.png";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    console.log([...passwordArray, form]);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer py-10">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-700">&lt;</span>
          <span>Key</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="text-white flex flex-col items-center gap-8 py-4">
          <input
            placeholder="Enter website URL"
            name="site"
            value={form.site}
            onChange={handleChange}
            className="rounded-full text-black p-4 py-1 border border-green-500 w-full"
            type="text"
          />
          <div className="flex w-full gap-8 justify-between">
            <input
              placeholder="Enter username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full w-full text-black p-4 py-1 border border-green-500"
              type="text"
            />
            <div className="relative">
              <input
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full w-full text-black p-4 py-1 border border-green-500"
                type="text"
              />
              <span
                className="text-black absolute p-2 right-0 top-[2px] cursor-pointer"
                onClick={showPassword}
              >
                <img width={18} ref={ref} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center rounded-full py-2 px-4 border border-green-500 bg-green-400 hover:bg-green-300 w-fit gap-2 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
