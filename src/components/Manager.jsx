import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyeClosed.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyeClosed.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
    } else {
      const toast = document.createElement("div");
      toast.innerText = "Error, password not saved";
      toast.className =
        "fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full shadow-md text-center z-50";
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 1500);
    }
  };

  const deletePassword = (id) => {
    console.log("deleting password with id: ", id);
    let c = confirm("Do you really want to delete this details!");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };

  const editPassword = (id) => {
    console.log("editing password with id: ", id);
    setForm(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const toast = document.createElement("div");
      toast.innerText = "Copied!";
      toast.className =
        "fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md text-center z-50";
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 1500);
    });
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-blue-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="mx-auto w-full max-w-5xl px-2 sm:p-4">
        <h1 className="text-3xl text font-bold text-center sm:text-4xl">
          <span className="text-blue-500">&lt;</span>
          <span>Pass</span>
          <span className="text-blue-500">OP&gt;</span>
        </h1>
        <p className="text-blue-900 text-center text-sm sm:text-lg">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-1xl text-black gap-6  items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-blue-500 w-full p-3 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter website URL"
          />
          <div className="flex flex-col md:flex-row justify-between w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-blue-500 w-full p-3 py-1"
              type="text"
              name="username"
              placeholder="Enter username"
              id="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-blue-500 w-full p-3 py-1"
                type="password"
                name="password"
                placeholder="Enter Password"
                id="password"
              />
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-blue-700 font-medium"
                onClick={showPassword}
              >
                <img ref={ref} width={25} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-blue-500 hover:bg-blue-400 px-2 py-1 sm:px-4 sm:py-2 text-base sm:text-md rounded-full w-fit gap-2 sm:gap-3 border border-blue-900 transition-all duration-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
            ></lord-icon>
            <span className="text-sm sm:text-base">Save</span>
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold p-4 text-center sm:text-left">
            Your passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center">No passwords to show</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto overflow-y-auto max-h-[220px] sm:max-h-[280px] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200 rounded-md">
              <table className="table-auto w-full rounded-md overflow-hidden text-md sm:text-lg">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className=" py-2 border border-white text-center w-20 sm:w-32">
                          <div className="flex justify-center items-center gap-3">
                            <a
                              href={item.site}
                              target="_blank"
                              className="truncate max-w-[80px] text-center"
                            >
                              {item.site}
                            </a>
                            <div
                              className=" w-3.5 h-3.5 sm:w-5 sm:h-5 cursor-pointer "
                              onClick={() => copyText(item.site)}
                            >
                              <img src="icons/copy.svg" alt="copy" />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-white text-center w-20 sm:w-32">
                          <div className="flex justify-center items-center gap-3">
                            {item.username}
                            <div
                              className=" w-3.5 h-3.5 sm:w-5 sm:h-5"
                              onClick={() => copyText(item.username)}
                            >
                              <img src="icons/copy.svg" alt="copy" />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-white text-center w-20 sm:w-32">
                          <div className="flex justify-center items-center gap-3">
                            {item.password}
                            <div
                              className=" w-3.5 h-3.5 sm:w-5 sm:h-5"
                              onClick={() => copyText(item.password)}
                            >
                              <img src="icons/copy.svg" alt="copy" />
                            </div>
                          </div>
                        </td>
                        <td className=" py-2 border border-white text-center w-20 sm:w-32">
                          <div className="flex justify-center items-center gap-2 sm:gap-4">
                            <div
                              className="w-4 h-4 sm:w-5 sm:h-5 text-black cursor-pointer transition-all duration-300 hover:rotate-6"
                              onClick={() => editPassword(item.id)}
                            >
                              <img src="icons/edit.png" alt="edit" />
                            </div>
                            <div onClick={() => deletePassword(item.id)}>
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                className="w-4 h-4 sm:w-5 sm:h-5 cursore-pointer"
                              ></lord-icon>
                            </div>
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
}

export default Manager;
