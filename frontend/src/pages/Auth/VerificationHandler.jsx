import React, { useEffect, useState } from 'react'
import CommonLayout from '../../layouts/CommonLayout'
import Button from '../../common/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { verifyEmail } from '../../services/auth.service'

const VerificationHandler = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    const [status, setStatus] = useState("loading")

    useEffect(() => {
        verifyEmail(token)
            .then(() => {
                setStatus("success")
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            })
            .catch(() => {
                setStatus("error")
            })
    }, [token, navigate])

    return (
        <CommonLayout>
            <div className="flex flex-col items-center justify-center space-y-4">
                {status === "loading" && <h1>Verifying your email… ⏳</h1>}

                {status === "success" && (
                    <>
                        <h1 className="text-green-600 font-bold">
                            Email verified successfully
                        </h1>
                        <Button
                            text="Let’s Start"
                            type="button"
                            onClick={() => navigate('/home')}
                        />
                    </>
                )}

                {status === "error" && (
                    <h1 className="text-red-600 font-bold">
                        Verification failed or link expired
                    </h1>
                )}
            </div>
        </CommonLayout>
    )
}

export default VerificationHandler
