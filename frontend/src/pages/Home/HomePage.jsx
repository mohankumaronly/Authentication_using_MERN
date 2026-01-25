import React, { useEffect, useState } from 'react'
import CommonLayout from '../../layouts/CommonLayout'
import Button from '../../common/Button'
import { useNavigate } from 'react-router-dom';
import { getMe, logout } from '../../services/auth.service';

const HomePage = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then(res => {
        setUser(res.data.user);
      })
      .catch(() => {
        navigate('/auth/login');
      });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login', { replace: true });
  };

  return (
    < CommonLayout>
      <h1>Welcome to {`${user?.firstName} ${user?.lastName}`}</h1>
      < Button
        text="Logout"
        type="button"
        onClick={handleLogout}
      />
    </CommonLayout>
  )
}

export default HomePage