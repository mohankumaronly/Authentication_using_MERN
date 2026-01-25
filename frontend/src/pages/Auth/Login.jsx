import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import useInputText from '../../Hooks/InputHooks';
import CommonLayout from '../../layouts/CommonLayout';
import InputText from '../../common/InputText';
import Button from '../../common/Button';
import useLoading from '../../Hooks/LoadingHook';
import { login } from '../../services/auth.service';


const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) return;

    const errorMap = {
      email_exists:
        "This email is registered with email & password. Please login normally.",
      oauth_failed:
        "Google login failed. Please try again.",
      oauth_invalid_state:
        "Security validation failed. Please try again.",
      google_email_not_verified:
        "Your Google email is not verified.",
    };

    alert(errorMap[error] || "Something went wrong.");

    navigate("/auth/login", { replace: true });
  }, [searchParams, navigate]);

  const { formData, onChange, reset } = useInputText({
    email: "",
    password: "",
  });

  const { isLoading, LoadingStart, LoadingStop } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoadingStart();
    try {
      await login(formData);
      reset();
      navigate('/home');
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || "Something went wrong");
      } else if (error.request) {
        alert("Network error. Please try again later.");
      } else {
        alert(error.message);
      }
    } finally {
      LoadingStop();
    }
  };

  return (
    <>
      <CommonLayout>
        <div className='flex bg-gray-100 p-5 shadow-2xl flex-col w-96'>
          <form onSubmit={handleSubmit} className='space-y-6'>
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

            <p
              className='text-end font-bold hover:underline cursor-pointer'
              onClick={() => navigate('/auth/forgot-password')}
            >
              Forgot password?
            </p>

            <Button
              type="submit"
              text={isLoading ? "Login....." : "Login account"}
              fullWidth
              disable={isLoading}
            />

            <Button
              type="button"
              text="Continue with Google"
              fullWidth
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
              }}
            />

            <p className='text-center'>
              Don't have account?{" "}
              <span
                className='font-bold cursor-pointer hover:underline'
                onClick={() => navigate('/auth/register')}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </CommonLayout>
    </>
  );
};

export default Login;
