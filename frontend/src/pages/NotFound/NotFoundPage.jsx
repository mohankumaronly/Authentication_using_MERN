import { useNavigate } from "react-router-dom";
import CommonLayout from "../../layouts/CommonLayout";
import Button from "../../common/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-600">Page not found</p>

        <Button
          text="Go Home"
          type="button"
          onClick={() => navigate("/")}
        />
      </div>
    </CommonLayout>
  );
};

export default NotFoundPage;
