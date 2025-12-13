import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const features = [
    {
      icon: "💸",
      title: "Track Expenses",
      description:
        "Monitor every dollar with intelligent categorization and real-time updates",
    },
    {
      icon: "📈",
      title: "Visualize Growth",
      description:
        "Beautiful charts and insights that make your financial data come alive",
    },
    {
      icon: "🎯",
      title: "Reach Goals",
      description:
        "Set targets and watch your progress with motivating milestone tracking",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative pt-3 overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-16">
        {/* Main Content Container */}

        <div
          className={`max-w-5xl w-full transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-5 py-2 rounded-full shadow-lg shadow-pink-100/50 mb-8 border border-pink-100">
              <div className="relative">
                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Smart Financial Management
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Take Control of
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
                Your Money
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              The most beautiful way to track expenses, build budgets, and
              achieve your financial dreams. Simple, powerful, and designed for
              you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => navigate("/authentication")}
                className="group relative cursor-pointer bg-gradient-to-r  from-pink-600 to-rose-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 ">
                  Start Free Today
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() => navigate("/authentication")}
                className="group cursor-pointer bg-white/90 backdrop-blur-xl border-2 border-gray-200 hover:border-pink-300 text-gray-700 font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  See How It Works
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">4.9/5</span>
              </div>
              <span>•</span>
              <span>Trusted by 10,000+ users</span>
              <span>•</span>
              <span>Bank-level security</span>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 hover:border-pink-300 transition-all duration-500 transform hover:-translate-y-2 ${
                  activeCard === index
                    ? "shadow-2xl shadow-pink-200/50"
                    : "shadow-xl"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {[
                {
                  value: "$2.5M+",
                  label: "Money Tracked",
                  color: "from-pink-600 to-rose-600",
                },
                {
                  value: "10K+",
                  label: "Happy Users",
                  color: "from-rose-600 to-orange-600",
                },
                {
                  value: "50K+",
                  label: "Transactions",
                  color: "from-orange-600 to-pink-600",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center px-6">
                  <div
                    className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-1">
            Crafted with ❤️ by{" "}
            <span className="font-bold text-gray-700">Cyrus</span>
          </p>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
