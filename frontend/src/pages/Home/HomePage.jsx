import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import { createPayment, logout } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import PaymentCard from '../../components/PaymentCard';
import HomePageLayout from '../../layouts/HomepageLayout';
import useLoading from '../../Hooks/LoadingHook';
import Loading from '../../components/Loading';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const isAdmin =
    user?.id === import.meta.env.VITE_ADMIN_USER_ID;

  const {
    isLoading,
    LoadingStart,
    LoadingStop,
  } = useLoading();

  const prices = [
    {
      id: 'chai',
      cardHeading: "Hello I am Mohan",
      cardPara: "Supporting by clicking below button",
      price: 5,
      buttonText: "Buy a Chai",
    },
    {
      id: 'monthly',
      cardHeading: "Monthly Membership",
      cardPara: "Membership by clicking below button",
      price: 1,
      buttonText: "Get Membership",
    },
    {
      id: 'six_month',
      cardHeading: "Six Month Membership",
      cardPara: "Membership by clicking below button",
      price: 2,
      buttonText: "Get Membership",
    },
    {
      id: 'yearly',
      cardHeading: "One Year Membership",
      cardPara: "Membership by clicking below button",
      price: 3,
      buttonText: "Get Membership",
    },
  ];

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/auth/login', { replace: true });
  };

  const handlePaymentRequest = async (payload) => {
    try {
      LoadingStart();

      console.log("Sending Payment Payload:");
      console.log(JSON.stringify(payload, null, 2));

      const response = await createPayment(payload);

      console.log("Payment Intent Response:");
      console.log(response.data);

      navigate("/payment/pay", {
        state: response.data,
      });

    } catch (error) {
      console.error("Payment Intent Failed");

      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    } finally {
      LoadingStop();
    }
  };


  const handlePayment = (id) => {
    switch (id) {
      case "chai":
        handlePaymentRequest({ paymentType: "ONE_TIME" });
        break;

      case "monthly":
        handlePaymentRequest({
          paymentType: "TIME_BASED",
          plan: "MONTHLY",
        });
        break;

      case "six_month":
        handlePaymentRequest({
          paymentType: "TIME_BASED",
          plan: "SIX_MONTH",
        });
        break;

      case "yearly":
        handlePaymentRequest({
          paymentType: "TIME_BASED",
          plan: "YEARLY",
        });
        break;

      default:
        console.log("Unknown payment option");
    }
  };

  return (
    <HomePageLayout>
      <>
        {isLoading && <Loading />}

        <h1 className="font-bold text-3xl">
          Welcome {`${user.firstName} ${user.lastName}`}
        </h1>

        <h3 className="text-xl mb-4">
          This project demonstrates how Authentication and Payment systems work
        </h3>

        <div className="flex space-x-3 mb-6">
          {prices.map((item) => (
            <PaymentCard
              key={item.id}
              cardHeading={item.cardHeading}
              CardPara={item.cardPara}
              Price={item.price}
              ButtonText={item.buttonText}
              onClick={() => handlePayment(item.id)}
            />
          ))}
        </div>

        <Button
          text="Logout"
          type="button"
          onClick={handleLogout}
        />
        {isAdmin && (
          <Button
            text="Admin Dashboard"
            type="button"
            onClick={() => navigate("/admin/payments")}
          />
        )}
      </>
    </HomePageLayout>
  );
};

export default HomePage;
