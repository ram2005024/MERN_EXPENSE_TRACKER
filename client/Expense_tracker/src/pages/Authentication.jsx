import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Exclamation from "../assets/exclamation.png";
import { TransactionContext } from "../context/transactionContext";
import changePassword from "../assets/changePwd.png";
import otpImage from "../assets/otp_image.png";
import { FaArrowLeft, FaExclamation } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import OtpTimer from "../components/OtpTimer";
const Authentication = () => {
  const [section, setSection] = useState("login");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const inputRef = useRef([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const { serverURL, fetchUserAndData } = useContext(TransactionContext);
  const navigate = useNavigate();
  //------------------------------------------------//Register---------------------------------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${serverURL}/auth/register`,
        {
          userName,
          email,
          pwd,
          confirm,
        },
        {
          withCredentials: true,
        }
      );
      if (!resp.data.success) {
        setMessage(resp.data.message);
        return;
      }
      await fetchUserAndData();

      setEmail("");
      setPwd("");
      setConfirm("");
      setUserName("");
      navigate("/app/dashboard");
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //-----------------------------------------Login Handler---------------------------------------------
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverURL}/auth/login`,
        { email, pwd, rememberMe },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setMessage(res.data.message);
        return;
      }
      await fetchUserAndData();
      setEmail("");
      setPwd("");
      setConfirm("");
      setUserName("");

      navigate("/app/dashboard");
      toast.success(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");

      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  useEffect(() => {
    if (section === "login" && section === "signup" ) {
      setEmail("");
      setPwd("");
      setConfirm("");
      setUserName("");
      setMessage("");
    }
  }, [section]);
  //------------------------handle forget password system----------------------------------------
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/auth/forget`, { email });
      if (!res.data.success) setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
      setSection("verifyOTP");
      toast.success(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message);
      toast.error(error.response?.data?.message || error.message);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };
  const handleInputOTP = (e, index) => {
    if (e.target.value && index < 4) {
      inputRef.current[index + 1].focus();
    }
  };
  const getOTP = () => {
    return inputRef.current.map((i) => i.value).join("");
  };
  const handleKeyDelete = (e, index) => {
    if (!e.target.value && e.key == "Backspace" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const chars = e.clipboardData.getData("text").trim();
    const allowedOTP = chars.split("").slice(0, 5);
    allowedOTP.forEach((i, index) => {
      if (index < 5) inputRef.current[index].value = i;
    });
    inputRef.current[Math.min(4, allowedOTP.length)].focus();
  };
  const handleOTPSubmit = async () => {
    const otp = getOTP();
    try {
      const res = await axios.post(`${serverURL}/auth/verifyOTP`, {
        otp: Number(otp),
        email,
      });
      if (!res.data.success) return toast.error(res.data.message);
      toast.success(res.data.message);
      setSection("newPassword");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/auth/newPassword`, {
        pwd,
        confirm,
        email,
      });
      if (!res.data.success) {
        toast.error(res.data.message);

        setMessage(res.data.message);
        return;
      }
      setPwd("");
      setConfirm("");
      setMessage("");
      setEmail("");
      setSection("login");
      toast.success(res.data.message);
      navigate("/authentication");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4">
      {section !== "forget" &&
        section !== "verifyOTP" &&
        section !== "newPassword" && (
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {section === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {section === "login"
                    ? "Sign in to your account"
                    : "Sign up to get started"}
                </p>
              </div>

              {/* Login Form */}
              {section === "login" && (
                <form className="space-y-4" onSubmit={(e) => handleSignIn(e)}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button
                      className="text-pink-600 hover:text-pink-700 font-medium "
                      onClick={() => setSection("forget")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  {message && (
                    <div className="text-red-700 text-start">
                      <span>{message}</span>
                    </div>
                  )}
                  <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-3 rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all">
                    Sign In
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {section === "signup" && (
                <form className="space-y-4" onSubmit={(e) => handleSignUp(e)}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  {message && (
                    <div>
                      <span className="text-red-700">{message}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold py-3 rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all"
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Toggle */}
              <div className="mt-6 text-center text-sm text-gray-600">
                {section === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() =>
                    setSection(section === "login" ? "signup" : "login")
                  }
                  className="text-pink-600 hover:text-pink-700 font-semibold"
                >
                  {section === "login" ? "Sign up" : "Sign in"}
                </button>
              </div>
            </div>
          </div>
        )}
      {section == "forget" && (
        <form
          className="flex py-20 px-12 border gap-4 border-gray-400 flex-col text-center rounded-lg"
          onSubmit={(e) => handleForgetPassword(e)}
        >
          <div className="flex flex-col gap-6 items-center">
            <img src={Exclamation} alt="image_" className="size-12" />
            <span className="text-xl font-semibold">Forget Password</span>
          </div>
          <p className="text-sm text-gray-500">
            Enter your email and we'll send otp to reset your password
          </p>
          <div className="relative text-start">
            <input
              type="text"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 p-2 w-full text-gray-500 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-gray-500"
            />
            <MdEmail
              size={19}
              className="text-gray-500 absolute left-2.5 top-3"
            />
          </div>
          {message && (
            <div className="text-red-700 text-sm text-start">{message}</div>
          )}
          <button
            type="submit"
            className="text-center p-2.5 cursor-pointer rounded-lg bg-green-700 text-white font-light w-full "
          >
            Submit
          </button>
          <button
            onClick={() => setSection("login")}
            className="w-full text-gray-500 flex items-center gap-1.5 cursor-pointer mt-2 justify-center "
          >
            <FaArrowLeft size={12} className="text-gray-500" />
            <span> Back to login</span>
          </button>
        </form>
      )}
      {section == "verifyOTP" && (
        <div className="border border-gray-500 rounded-lg py-10 px-8 flex flex-col items-center gap-3 text-center bg-slate-50">
          <img src={otpImage} alt="otp_icon" className="size-18 " />
          <span className="text-xl font-semibold">OTP Verification</span>
          <span className="text-sm text-gray-500">
            We've sent an OTP on given {email.slice(0, 4)}******@gmail.com
          </span>
          <OtpTimer email={email} time={80} />
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              return (
                <input
                  key={index}
                  maxLength={1}
                  type="text"
                  required={true}
                  ref={(e) => (inputRef.current[index] = e)}
                  onChange={(e) => {
                    handleInputOTP(e, index);
                  }}
                  onKeyDown={(e) => handleKeyDelete(e, index)}
                  onPaste={(e) => handlePaste(e)}
                  className="rounded-lg w-10 h-10 text-center border border-gray-400 text-gray-500 font-semibold text-xl focus:ring focus:ring-orange-500 focus:outline-0 focus:border-0"
                />
              );
            })}
          </div>
          <button
            className="text-center bg-indigo-500 rounded-lg p-2.5 cursor-pointer mb-4 text-white font-semibold w-full mt-4"
            onClick={() => handleOTPSubmit()}
          >
            Submit
          </button>
        </div>
      )}
      {section == "newPassword" && (
        <div className="border border-gray-500 py-12 px-10 flex flex-col gap-5  rounded-lg bg-zinc-50 text-center">
          <img
            src={changePassword}
            alt="changePwd_logo"
            className="size-12 self-center"
          />
          <h2 className="text-2xl font-semibold">Change your password</h2>
          <span className="text-sm text-gray-500 ">
            Enter a new password below to make a new password
          </span>
          <form onSubmit={(e) => handleNewPassword(e)}>
            <div className="flex flex-col gap-2.5 w-full">
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="New password"
                className="text-gray-500 p-2.5 rounded-lg w-full border focus:ring focus:ring-orange-400 focus:outline-none"
              />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                className="text-gray-500 p-2.5 rounded-lg w-full border focus:ring focus:ring-orange-400 focus:outline-none"
              />
            </div>
            {message && <span className="text-red-500 text-sm">{message}</span>}
            <button
              type="submit"
              className="text-white  w-full cursor-pointer text-center mt-5 rounded-lg p-2.5 mb-3.5 bg-indigo-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
