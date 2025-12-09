import { useContext, useState } from "react";
import Nav from "./components/Nav";
import { toast } from "react-toastify";
import Dashboard from "./components/Dashboard";
import ViewTransaction from "./components/ViewTransaction";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { FaBars, FaTimes } from "react-icons/fa";
import { TransactionContext } from "./context/transactionContext";
import axios from "axios";
import {  Outlet, useNavigate,NavLink } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";

const App = () => {
  const [isActive, setIsActive] = useState(false);

  const { sections, serverURL, userName } = useContext(TransactionContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${serverURL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) toast.success(res.data.message);
      navigate("/authentication");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full min-h-screen flex-1  bg-[url('/bg.png')] bg-cover  sm:p-10 pt-3 pl-3 pr-3 overflow-x-hidden">
      <div className="grid relative lg:grid-cols-12 md:gap-10 gap-5 h-full transition-all duration-150">
        {isActive && (
          <div className="p-5 h-full flex flex-col gap-5 bg-gray-200 z-50 absolute right-0 top-0">
            <FaTimes
              size={16}
              className="absolute left-3 top-4 text-red-600"
              onClick={() => setIsActive(false)}
            />
            <div className="flex gap-2 ">
              <img
                src="/avatar.png"
                alt="user_image"
                className="size-20 bg-white rounded-full border-6 border-white "
              />
              <div className="flex flex-col justify-center items-start">
                {/* User name */}
                <span className="font-bold text-indigo-900">{userName}</span>
                <span className="font-extralight text-indigo-900">
                  Your money
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-2">
              {sections.map((items, index) => {
               

                return (
                 <NavLink
                    key={index}
                    to={`/app/${items.type}`}
                    className={({ isActive }) =>
                      `flex gap-3 cursor-pointer relative text-gray-500 ${
                        isActive
                          ? "text-indigo-900 before:content-[''] before:absolute before:top-0 before:left-[-10px] before:h-full before:w-1 before:rounded-3xl before:bg-indigo-900 transition-all duration-200"
                          : ""
                      }`
                    }
                    onClick={() => setIsActive(false)} // just close sidebar
                  >
                    <items.icons className="size-6" />
                    {items.name}
                  </NavLink>
                );
              })}

              <div className="mt-3 flex gap-3 items-center cursor-pointer group">
                <MdExitToApp
                  size={20}
                  className="text-gray-600 group-hover:text-red-400 transition-colors duration-300"
                />
                <span
                  className="text-gray-700 group-hover:text-red-400 transition-colors duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-5 right-4 block lg:hidden">
          <FaBars
            size={16}
            className="text-slate-800"
            onClick={() => setIsActive(true)}
          />
        </div>

        <Nav />
        <Outlet />
      </div>
    </div>
  );
};
export default App;
