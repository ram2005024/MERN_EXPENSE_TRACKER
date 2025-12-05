import React, { useContext } from "react";
import { TransactionContext } from "../context/transactionContext";

const Nav = () => {
  const { sections, activeSectionIndex, setActiveSectionIndex } =
    useContext(TransactionContext);
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
            <span className="font-bold text-indigo-900">Shekhar</span>
            <span className="font-extralight text-indigo-900">Your money</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-2">
          {sections.map((items, index) => {
            return (
              <div
                onClick={() => {
                  setActiveSectionIndex(index);
                }}
                key={index}
                className={`flex gap-3 cursor-pointer relative text-gray-500  
                  ${
                    activeSectionIndex === index
                      ? " text-indigo-900 before:content-[''] before:absolute before:top-0 before:left-[-10px] before:h-full before:w-1 before:rounded-3xl before:bg-indigo-900 transition-all duration-200 "
                      : ""
                  }
                  `}
              >
                <items.icons className="size-6 " />
                <span>{items.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Nav;
