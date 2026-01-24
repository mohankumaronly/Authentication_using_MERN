import Button from "../../common/Button";
import InputText from "../../common/InputText";
import useInputText from "../../Hooks/InputHooks";
import CommonLayout from "../../layouts/CommonLayout";


const ResetPasswordPage = () => {

    const {
        formData,
        onChange,
        reset
    } = useInputText({
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        reset();
    }

    return (
        <>
            <CommonLayout>
                <div className='flex bg-gray-100 p-5 shadow-2xl flex-col w-96'>
                    <form onSubmit={handleSubmit}
                        className='space-y-6'
                    >
                        <InputText
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={onChange}
                        />
                        < Button text="Reset password" type="submit" fullWidth />
                    </form>
                </div>
            </CommonLayout>
        </>
    )
}

export default ResetPasswordPage