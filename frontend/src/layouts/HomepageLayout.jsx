import React from 'react'

const HomePageLayout = ({ children }) => {
    return (
        <div className='flex items-center justify-center h-screen flex-col space-y-10'>
            {children}
        </div>
    )
}

export default HomePageLayout