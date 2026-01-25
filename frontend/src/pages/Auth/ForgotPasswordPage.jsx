import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import InputText from '../../common/InputText';
import useInputText from '../../Hooks/InputHooks';
import CommonLayout from '../../layouts/CommonLayout';
import useLoading from '../../Hooks/LoadingHook';
import { forgotPassword } from '../../services/auth.service';
import Loading from '../../components/Loading';

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const {
        formData,
        onChange,
        reset
    } = useInputText({
        email: "",
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
            await forgotPassword(formData);
            navigate('/auth/forgot-password-link')
            reset();
        } catch (error) {
            if (error.response) {
                const message = error.response.data?.message || "Something went wrong"
                alert(message)
            } else if (error.request) {
                alert('Please check your Network')
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
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={onChange}
                        />
                        < Button
                            text={isLoading ? "Sending...." : "send Link"}
                            type="submit"
                            fullWidth
                            disable={isLoading}
                        />
                        <p className='font-bold text-center hover:underline cursor-pointer'
                            onClick={() => {
                                navigate('/auth/login')
                            }}
                        >Back to login</p>
                    </form>
                </div>
            </CommonLayout>
        </>
    )
}

export default ForgotPasswordPage