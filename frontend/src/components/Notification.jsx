import React from 'react';

const Notification = ({ message, type = 'success' }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className={`border border-black ${bgColor} p-2 mb-4 text-sm`}>
      {message}
    </div>
  );
};

export default Notification;