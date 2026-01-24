import { useNavigate } from 'react-router-dom'
import CommonLayout from '../../layouts/CommonLayout';
import Button from '../../common/Button';


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <CommonLayout>
        <Button text="Get start" onClick={() => {
          navigate('/auth/register');
        }} />
      </CommonLayout>
    </>
  )
}

export default LandingPage