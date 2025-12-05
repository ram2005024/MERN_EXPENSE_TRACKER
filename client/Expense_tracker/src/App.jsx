import { useContext, useState } from "react";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import ViewTransaction from "./components/ViewTransaction";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { FaBars, FaTimes } from "react-icons/fa";
import { TransactionContext } from "./context/transactionContext";

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const { activeSection, sections, setActiveSectionIndex, activeSectionIndex } =
    useContext(TransactionContext);
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
              <div className="flex flex-col  justify-center items-start">
                {/* User name */}
                <span className="font-bold text-indigo-900">Shekhar</span>
                <span className="font-extralight text-indigo-900">
                  Your money
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-2">
              {sections.map((items, index) => {
                return (
                  <div
                    onClick={() => {
                      setActiveSectionIndex(index);
                      setIsActive(false);
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
        )}
        <div className="absolute top-5 right-4 block lg:hidden">
          <FaBars
            size={16}
            className="text-slate-800"
            onClick={() => setIsActive(true)}
          />
        </div>
        <Nav />
        {activeSection.type === "dashboard" && <Dashboard />}
        {activeSection.type === "viewTransaction" && <ViewTransaction />}
        {activeSection.type === "income" && <Income />}
        {activeSection.type === "expense" && <Expense />}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
