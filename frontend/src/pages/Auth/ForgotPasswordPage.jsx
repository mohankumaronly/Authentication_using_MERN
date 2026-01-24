import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import InputText from '../../common/InputText';
import useInputText from '../../Hooks/InputHooks';
import CommonLayout from '../../layouts/CommonLayout';

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const {
        formData,
        onChange,
        reset
    } = useInputText({
        email: "",
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
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            label="Email"
                            value={formData.email}
                            onChange={onChange}
                        />
                        < Button text="send Link" type="submit" fullWidth />
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