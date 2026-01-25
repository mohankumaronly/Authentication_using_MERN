import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import InputText from "../../common/InputText";
import useInputText from "../../Hooks/InputHooks";
import useLoading from "../../Hooks/LoadingHook";
import CommonLayout from "../../layouts/CommonLayout";
import { resetPassword } from "../../services/auth.service";
import Loading from "../../components/Loading";


const ResetPasswordPage = () => {


    const navigate = useNavigate();
    const { token } = useParams()

    const {
        formData,
        onChange,
        reset
    } = useInputText({
        password: "",
    });

    const {
        isLoading,
        LoadingStart,
        LoadingStop,
    } = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        LoadingStart();
        try {
            await resetPassword(token, formData);
            navigate('/auth/login');
            reset();
        } catch (error) {
            if (error.response) {
                const message = error.response.data?.message || "Something went wrong";
                alert(message);
            } else if (error.request) {
                alert("Please check your Network");
            } else {
                alert(error.message);
            }
        } finally {
            LoadingStop();
        }
    }

    return (
        <>
            {isLoading && < Loading />}
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
                        < Button
                            text={isLoading ? "Resetting...." : "Reset Password"}
                            type="submit"
                            fullWidth
                        />
                    </form>
                </div>
            </CommonLayout>
        </>
    )
}

export default ResetPasswordPage