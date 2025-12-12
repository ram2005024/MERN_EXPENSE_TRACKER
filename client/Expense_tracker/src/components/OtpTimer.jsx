import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/transactionContext";
import { toast } from "react-toastify";

const OtpTimer = ({ time, email }) => {
  const { serverURL } = useContext(TransactionContext);
  const [canResend, setResend] = useState(false);
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    if (timer <= 0) {
      setResend(true);
      return;
    }
    const timeInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [timer]);
  const formatTime = (timeLeft) => {
    const mins = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${mins} :${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleResend = async () => {
    setResend(false);
    setTimer(time);
    try {
      const res = await axios.post(`${serverURL}/auth/forget`, { email });
      if (!res.data.success) toast.error(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <button
        className="text-sm text-gray-500 cursor-pointer"
        onClick={() => handleResend()}
        disabled={!canResend}
      >
        {canResend ? "Resend OTP" : `Resend in ${formatTime(timer)}`}
      </button>
    </div>
  );
};

export default OtpTimer;
