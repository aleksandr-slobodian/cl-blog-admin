import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { User } from "../../types/api";
import UserAvatars from "../user-avatars/UserAvatars";
import UserAvatar from "../user-avatars/UserAvatar";
import { AVATARS_BASE_PATH } from "../../config";

interface DrawerUseAvatarsProps {
  isOpen?: boolean;
  onClose?: () => void;
  user?: User;
}

export const DrawerUseAvatars: React.FC<DrawerUseAvatarsProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Drawer anchor={"right"} open={isOpen} onClose={onClose}>
      <Toolbar variant="dense" sx={{ alignContent: "center" }}>
        <UserAvatar
          sx={{ width: 36, height: 36 }}
          src={user?.avatar ? `${AVATARS_BASE_PATH}${user?.avatar}` : undefined}
        />
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box width={"100vw"} maxWidth={375} p={3} flexGrow={1}>
        <UserAvatars currentUser={user} />
      </Box>
    </Drawer>
  );
};

export default DrawerUseAvatars;
