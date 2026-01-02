import React from 'react';

const HomePage = () => {
  const user = {
    firstName: "John",
    lastName: "Doe"
  };

  const handleLogout = () => {
    console.log("User logged out");

  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-72 border border-black p-4">
        <h1 className="text-xl font-bold mb-4">Home</h1>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600">Welcome back,</p>
          <p className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </p>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full border border-black bg-gray-100 py-1 text-sm hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;