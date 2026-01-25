import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return < Loading />

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default RequireAuth;
