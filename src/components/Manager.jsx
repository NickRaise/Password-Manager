import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
// uuidv4();  ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  let [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    const source = ref.current.src;
    if (source.includes("icons/eye.png")) {
      ref.current.src = "icons/eye-slash.png";
      console.log(passwordRef.current.type);
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "icons/eye.png";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (form.site.length < 3 || form.username.length < 3 || form.password < 4) {
      toast.error("Error: Password not saved!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("visited");
      return;
    }
    const doesExist = checkExist();
    if (doesExist == false) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
    } else {
      updatePassword();
    }
    setForm({ site: "", username: "", password: "" });
  };

  const checkExist = () => {
    const item = passwordArray.filter(
      (item) => form.site === item.site && form.username === item.username
    );
    if (item.length === 0) return false;
    return true;
  };

  const updatePassword = () => {
    const newPasswordArray = passwordArray.map((item) => {
      if (form.site === item.site && form.username === item.username) {
        item.password = form.password;
        return item;
      } else return item;
    });
    console.log(newPasswordArray);
    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
  };

  const deletePassword = (id) => {
    let agreeToDelete = confirm("Delete this record?");
    if (agreeToDelete) {
      const newPasswordArray = passwordArray.filter((item) => item.id != id);
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    }
  };

  const editPassword = (id) => {
    console.log("edit item id", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
  };

  const copyItem = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="md:mycontainer py-10 min-h-[85vh]">
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
          <div className="flex w-full flex-col md:flex-row gap-8 justify-between">
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
                ref={passwordRef}
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full w-full text-black p-4 py-1 border border-green-500"
                type="password"
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
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && (
            <div className="px-6">No password to show!</div>
          )}
          {passwordArray.length != 0 && (
            <div className="overflow-x-hidden">
              <table className="table-auto w-full rounded-xl overflow-hidden border-collapse">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="p-2 border border-white">Website</th>
                    <th className="p-2 border border-white">Username</th>
                    <th className="p-2 border border-white">Password</th>
                    <th className="p-2 border border-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className="py-2 border border-white w-1/2">
                          <div className="flex items-center justify-between px-4 gap-1">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordicon-copy cursor-pointer size-7 pt-1"
                              onClick={() => copyItem(item.site)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white">
                          <div className="flex items-center justify-between px-4 gap-1">
                            <span>{item.username}</span>
                            <div
                              className="lordicon-copy cursor-pointer size-7 pt-1"
                              onClick={() => copyItem(item.username)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white">
                          <div
                            className="flex items-center justify-between px-4 gap-1  cursor-pointer"
                            onClick={() => copyItem(item.password)}
                          >
                            <span>{'\u2022'.repeat(item.password.length)}</span>
                            <div className="lordicon-copy size-7 pt-1">
                              <lord-icon
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-2 border border-white">
                          <div className="flex gap-4 justify-center items-center">
                            <span
                              className="cursor-pointer"
                              onClick={() => editPassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => deletePassword(item.id)}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
