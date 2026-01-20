import React, { useState } from 'react'

const useLoading = (initialValues = false) => {

    const [isLoading, setIsLoading] = useState(initialValues);

    const LoadingStop = () => setIsLoading(false);
    const LoadingStart = () => setIsLoading(true);

    return {
        isLoading,
        LoadingStart,
        LoadingStop,
    }
}

export default useLoading