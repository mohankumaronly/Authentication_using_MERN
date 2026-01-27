import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  const adminId = import.meta.env.VITE_ADMIN_USER_ID;

  if (loading) return null;

  // ✅ DEBUG (optional, can remove later)
  console.log("ADMIN ENV ID:", adminId);
  console.log("USER ID:", user?.id);
  console.log(
    "ID MATCH:",
    String(user?.id) === String(adminId)
  );

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (String(user.id) !== String(adminId)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RequireAdmin;
