import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../state/auth";

export const GuestOnly: React.FC<any> = ({ children }) => {
  const { user } = useAppSelector(selectAuth);
  const location = useLocation();
  const locationState = location.state as { from?: string };
  const from = locationState?.from || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  return children;
};

export default GuestOnly;
