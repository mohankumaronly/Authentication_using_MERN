import { useState } from "react";

const useInputText = (InitialValues) => {
    const [formData, setFormData] = useState(InitialValues);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const reset = () => {
        setFormData({ ...InitialValues });
    }

    return {
        formData,
        onChange,
        reset
    }
}

export default useInputText