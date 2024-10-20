import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const { isAuthenticate } = useAuth();

  if (!isAuthenticate) {
    return <Navigate to="/" />;
  }

  return { children };
}

export default ProtectRoute;
