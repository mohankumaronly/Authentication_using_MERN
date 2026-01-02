import React, { useState } from 'react';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("Link is sent to the email!");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-72">
        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>

        <Notification message={msg} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm">Enter your Email</label>
            <input type="email" required className="border border-black p-1" />
          </div>
          <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className='font-bold text-xs hover:underline cursor-pointer'
            onClick={() => navigate('/login')}
          >Back to Login</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;