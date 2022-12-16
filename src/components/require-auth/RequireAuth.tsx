import { Navigate, useLocation } from "react-router-dom";
import { APP_PATH_LOGIN } from "../../config";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../state/auth";

export const RequireAuth: React.FC<any> = ({ children }) => {
  const { user } = useAppSelector(selectAuth);
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={APP_PATH_LOGIN}
        state={{ from: location?.pathname }}
        replace
      />
    );
  }

  return children;
};

export default RequireAuth;
