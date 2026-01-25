import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useInputText from "../../Hooks/InputHooks";
import useLoading from "../../Hooks/LoadingHook";
import { register } from "../../services/auth.service";
import CommonLayout from "../../layouts/CommonLayout";
import Loading from "../../components/Loading";
import InputText from "../../common/InputText";
import Button from "../../common/Button";

const RegisterPage = () => {

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

  const {
    formData,
    onChange,
    reset
  } = useInputText({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const {
    isLoading,
    LoadingStart,
    LoadingStop,
  } = useLoading(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoadingStart();

    try {
      await register(formData);
      reset();
      navigate('/auth/verification');
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "Something went wrong";
        alert(message);
      } else if (error.request) {
        alert("Network error. Please try again later.");
      } else {
        alert(error.message);
      }
    }
    finally {
      LoadingStop();
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      < CommonLayout>
        <div className='flex bg-gray-100 p-5 shadow-2xl flex-col w-96'>
          <form onSubmit={handleSubmit}
            className='space-y-6'
          >
            <InputText
              type="text"
              placeholder="Enter first name"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={onChange}
            />
            <InputText
              type="text"
              placeholder="Enter second name"
              name="lastName"
              label="Second name"
              value={formData.lastName}
              onChange={onChange}
            />
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
            <Button
              type="submit"
              text={isLoading ? "Creating...." : "Create an account"}
              fullWidth
              disabled={isLoading}
            />
            <Button
              type="button"
              text="Continue with google"
              fullWidth
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
              }}
            />
            <p className='text-center'>Already have an account? <span className='font-bold cursor-pointer hover:underline'
              onClick={() => {
                navigate('/auth/login');
              }}
            >Sign in</span></p>
          </form>
        </div>
      </CommonLayout>
    </>
  )
}

export default RegisterPage