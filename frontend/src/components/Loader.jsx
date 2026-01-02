import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/30 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
                <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    strokeColor="#4B5563"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
                <p className="text-xl font-medium text-gray-700 animate-pulse">
                    Processing...
                </p>
            </div>
        </div>
    );
};

export default Loader;