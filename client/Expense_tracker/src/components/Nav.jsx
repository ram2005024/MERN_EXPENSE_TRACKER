import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/transactionContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const { sections, userName, serverURL } = useContext(TransactionContext);
  const [activeType, setActiveType] = useState("dashboard");
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
    <div className=" hidden  lg:bg-gray-100 lg:border-2 lg:col-span-3 lg:border-white lg:px-6 lg:py-8 lg:flex lg:flex-col lg:justify-between lg:rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 ">
          <img
            src="/avatar.png"
            alt="user_image"
            className="size-20 bg-white rounded-full border-6 border-white "
          />
          <div className="flex flex-col  justify-center items-start">
            {/* User name */}
            <span className="font-bold text-indigo-900">{userName}</span>
            <span className="font-extralight text-indigo-900">Your money</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-2">
          {sections.map((items, index) => {
            const to = `/app/${items.type}`;

            return (
              <div
                key={index}
                className={`flex gap-3 cursor-pointer relative text-gray-500 ${
                  activeType === items.type
                    ? "text-indigo-900 before:content-[''] before:absolute before:top-0 before:left-[-10px] before:h-full before:w-1 before:rounded-3xl before:bg-indigo-900 transition-all duration-200"
                    : ""
                }`}
              >
                <items.icons className="size-6 " />
                <Link to={to} onClick={() => setActiveType(items.type)}>
                  {items.name}
                </Link>
              </div>
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
    </div>
  );
};

export default Nav;
