import { useNavigate } from 'react-router-dom'
import useInputText from '../../Hooks/InputHooks';
import CommonLayout from '../../layouts/CommonLayout';
import InputText from '../../common/InputText';
import Button from '../../common/Button';

const Login = () => {

  const navigate = useNavigate();


  const {
    formData,
    onChange,
    reset
  } = useInputText({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    reset();
  }

  return (
    <>
      < CommonLayout>
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
            <InputText
              type="password"
              placeholder="Enter password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={onChange}
            />
            <p className='text-end font-bold hover:underline cursor-pointer'
              onClick={() => navigate('/auth/forgot-password')}
            >Forgot password?</p>
            <Button type="submit" text="Login account" fullWidth />
            <p className='text-center'>Don't have account? <span className='font-bold cursor-pointer hover:underline'
              onClick={() => {
                navigate('/auth/register');
              }}
            >Sign up</span></p>
          </form>
        </div>
      </CommonLayout>
    </>
  )
}

export default Login