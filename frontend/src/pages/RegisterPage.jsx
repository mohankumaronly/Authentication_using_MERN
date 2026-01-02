import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../services/api.service';
import Loader from '../components/Loader';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await userRegister(FormData);
      alert(res.data.message);
      console.log(res);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {Loading && <Loader />}
      <div className="flex flex-col items-center mt-10">
        <div className="w-72">
          <h1 className="text-xl font-bold mb-4">Register</h1>

          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <div className="flex flex-col">
              <label className="text-sm">First Name</label>
              <input
                type="text"
                className="border border-black p-1"
                name='firstName'
                value={FormData.firstName}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                className="border border-black p-1"
                name='lastName'
                value={FormData.lastName}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="border border-black p-1"
                name='email'
                value={FormData.email}
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Password</label>
              <input
                type="password"
                className="border border-black p-1"
                name='password'
                value={FormData.password}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="border border-black bg-gray-100 py-1 mt-2 cursor-pointer">
              Submit
            </button>
          </form>

          <div className="mt-4 text-sm flex">
            <p>Already have an account? </p><span
              className='font-bold hover:underline cursor-pointer px-2'
              onClick={() => navigate('/login')}
            >Sign in</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;