import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

export default ({ children }: { children: JSX.Element }) => {
    let auth = useAuth();
    const location = useLocation();
    // indien niet authenticated --> naar login page
    // wel authenticated --> child page tonen van die route (in dit geval profile)
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }