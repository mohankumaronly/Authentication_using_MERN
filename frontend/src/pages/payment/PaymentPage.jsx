import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../common/Button";
import HomePageLayout from "../../layouts/HomepageLayout";
import useLoading from "../../Hooks/LoadingHook";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { submitPayment } from "../../services/auth.service";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { isLoading, LoadingStart, LoadingStop } = useLoading();
    const [utr, setUtr] = useState("");

    if (!state) {
        navigate("/", { replace: true });
        return null;
    }

    const {
        qrCode,
        amount,
        paymentType,
        plan,
        message,
    } = state;

    const handleSubmitUTR = async () => {
        if (!utr.trim()) {
            alert("Please enter UTR number");
            return;
        }

        try {
            LoadingStart();

            await submitPayment({
                utr,
                paymentType,
                plan,
                amount,
            });

            navigate("/payment/success", { replace: true });

        } catch (error) {
            console.error("Payment verification failed", error);
            alert(
                error.response?.data?.message ||
                "Failed to submit payment. Try again."
            );
        } finally {
            LoadingStop();
        }
    };


    return (
        <HomePageLayout>
            <>
                {isLoading && <Loading />}

                <h1 className="text-2xl font-bold mb-4">
                    Complete Your Payment
                </h1>

                <p className="mb-2 text-gray-700">{message}</p>

                <p className="mb-4 font-semibold">
                    Amount: ₹{amount}
                </p>

                <div className="flex justify-center mb-6">
                    <img
                        src={qrCode}
                        alt="UPI QR Code"
                        className="w-64 h-64 border rounded"
                    />
                </div>

                <p className="text-sm text-gray-600 mb-4 text-center">
                    Scan the QR using PhonePe / GPay / Paytm
                    After payment, enter the UTR number below
                </p>

                <input
                    type="text"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder="Enter UTR Number"
                    className="w-full border px-3 py-2 rounded mb-4"
                />

                <Button
                    text="Submit Payment"
                    type="button"
                    onClick={handleSubmitUTR}
                />
            </>
        </HomePageLayout>
    );
};

export default PaymentPage;
