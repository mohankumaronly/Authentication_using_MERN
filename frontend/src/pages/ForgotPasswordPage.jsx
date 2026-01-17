import CommonLayout from '../layouts/CommonLayout'
import useInputText from '../Hooks/InputHooks'
import InputText from '../common/InputText';
import Button from '../common/Button';

const ForgotPasswordPage = () => {

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
                        < Button text="send Link" type="submit" fullWidth/>
                    </form>
                </div>
            </CommonLayout>
        </>
    )
}

export default ForgotPasswordPage