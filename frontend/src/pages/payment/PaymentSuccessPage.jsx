import Button from "../../common/Button";
import HomePageLayout from "../../layouts/HomepageLayout";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <HomePageLayout>
            <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Complete Your Payment
                </h1>

                <h2 className="text-green-600 text-xl font-semibold mb-4">
                    Payment Submitted Successfully
                </h2>

                <p className="text-gray-700 mb-6">
                    Your payment is under admin verification.
                    You will get access once it is approved.
                </p>

                <Button
                    text="Go to Home"
                    type="button"
                    onClick={() => navigate("/home")}
                />
            </div>
        </HomePageLayout>
    );
};

export default PaymentSuccessPage;
