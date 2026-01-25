import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth.service";
import CommonLayout from "../../layouts/CommonLayout";
import Button from "../../common/Button";

const VerificationHandler = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    verifyEmail(token)
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [token]);

  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        {status === "loading" && <h1>Verifying your email… ⏳</h1>}

        {status === "success" && (
          <>
            <h1 className="text-green-600 font-bold">
              Email verified successfully
            </h1>
            <p>Please log in to continue.</p>

            <Button
              text="Go to Login"
              type="button"
              onClick={() => navigate("/auth/login")}
            />
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-red-600 font-bold">
              Verification failed or link expired
            </h1>
            <Button
              text="Back to Login"
              type="button"
              onClick={() => navigate("/auth/login")}
            />
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default VerificationHandler;
