import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <MoonLoader size={40} color="#36d7b7" />
            <p>Loading...</p>
        </div>
    )
}

export default Loading