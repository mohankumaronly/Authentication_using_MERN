import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Auth/LandingPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import Login from "../pages/Auth/Login";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/Auth/ResetPasswordPage";
import VerificationPage from "../pages/Auth/VerificationPage";
import VerificationHandler from "../pages/Auth/VerificationHandler";
import HomePage from "../pages/Home/HomePage";
import VerificationLinkPage from "../pages/Auth/VerificationLinkPage";

import RequireAuth from "../components/RequireAuth";
import RedirectIfAuth from "../components/RedirectIfAuth";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import PaymentPage from "../pages/payment/PaymentPage";
import PaymentSuccessPage from "../pages/payment/PaymentSuccessPage";
import AdminPaymentsPage from "../pages/Admin/AdminPaymentsPage";
import RequireAdmin from "../components/RequireAdmin";

const AppRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
                path="/auth/register"
                element={
                    <RedirectIfAuth>
                        <RegisterPage />
                    </RedirectIfAuth>
                }
            />
            <Route
                path="/auth/login"
                element={
                    <RedirectIfAuth>
                        <Login />
                    </RedirectIfAuth>
                }
            />

            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/verification" element={<VerificationPage />} />
            <Route path="/auth/verify-email/:token" element={<VerificationHandler />} />
            <Route path="/auth/forgot-password-link" element={<VerificationLinkPage />} />
            <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />

            <Route
                path="/home"
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path="/payment/pay"
                element={
                    <RequireAuth>
                        <PaymentPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/payment/success"
                element={
                    <RequireAuth>
                        <PaymentSuccessPage />
                    </RequireAuth>
                }
            />
            <Route
                path="/admin/payments"
                element={
                    <RequireAdmin>
                        <AdminPaymentsPage />
                    </RequireAdmin>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouters;
