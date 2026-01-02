import React, { useState } from 'react';
import Notification from '../components/Notification';

const ResetPasswordPage = () => {
    const [msg, setMsg] = useState("");

    const handleUpdate = (e) => {
        e.preventDefault();
        setMsg("Password updated successfully!");
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="w-72">
                <h1 className="text-xl font-bold mb-4">Reset Password</h1>

                <Notification message={msg} />

                <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <label className="text-sm">New Password</label>
                        <input type="password" required className="border border-black p-1" />
                    </div>
                    <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
                        Update Password
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/login" className="underline text-xs">Return to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

