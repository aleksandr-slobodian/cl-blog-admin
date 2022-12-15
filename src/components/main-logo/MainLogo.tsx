import IconButton from "@mui/material/IconButton";
import PagesIcon from "@mui/icons-material/Pages";
import { useNavigate } from "react-router-dom";

export const MainLogo = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate("/")} color="inherit" edge="end">
      <PagesIcon fontSize="large" />
    </IconButton>
  );
};

export default MainLogo;
