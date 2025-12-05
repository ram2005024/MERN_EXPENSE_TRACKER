import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TransactionContext } from "../context/transactionContext";
const Authentication = () => {
  const [section, setSection] = useState("login");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const { serverURL } = useContext(TransactionContext);
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

      navigate("/app/dashboard");
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center px-4">
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
            <form className="space-y-4">
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
                <button className="text-pink-600 hover:text-pink-700 font-medium">
                  Forgot password?
                </button>
              </div>

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
    </div>
  );
};

export default Authentication;
