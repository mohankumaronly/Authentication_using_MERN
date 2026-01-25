import CommonLayout from '../../layouts/CommonLayout';
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/auth/login', { replace: true });
  };

  return (
    <CommonLayout>
      <h1>Welcome to {`${user.firstName} ${user.lastName}`}</h1>
      <Button
        text="Logout"
        type="button"
        onClick={handleLogout}
      />
    </CommonLayout>
  );
};

export default HomePage;
