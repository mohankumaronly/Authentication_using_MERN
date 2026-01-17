import React from 'react'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'
import CommonLayout from '../layouts/CommonLayout';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <CommonLayout>
        <Button text="Get start" Onclick={() => {
          navigate('/auth/register');
        }} />
      </CommonLayout>
    </>
  )
}

export default LandingPage