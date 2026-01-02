import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-72">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input type="email" className="border border-black p-1" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Password</label>
            <input type="password" className="border border-black p-1" />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-xs gap-1">
              <input type="checkbox" className="border border-black" />
              Remember me
            </label>
            <span className='hover:underline font-bold text-xs cursor-pointer'
            onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </span>
          </div>
          <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm">
          <span>Don't have an account? </span>
          <span
            className='font-bold hover:underline cursor-pointer px-2'
            onClick={() => navigate('/')}
          >Register</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;