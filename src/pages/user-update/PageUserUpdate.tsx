import { useCallback } from "react";
import { useParams } from "react-router-dom";
import DrawerUseAvatars from "../../components/drawer-user-avatars/DrawerUserAvatars";
import FormUser from "../../components/form-user/FormUser";
import PageContent from "../../components/page-content/PageContent";
import PageLoadingIndicator from "../../components/page-loading-indicator/PageLoadingIndicator";
import UserAvatar from "../../components/user-avatars/UserAvatar";
import { AVATARS_BASE_PATH } from "../../config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useGetUserQuery } from "../../services/users";
import {
  selectDrawerById,
  selectDrawers,
  toggleDrawer,
} from "../../state/drawers";
import { PageDefault } from "../default";
import ToolbarTop from "./components/ToolbarTop";

export const PageUserUpdate = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetUserQuery(id as string);

  const dispatch = useAppDispatch();

  const handleDrawarAvatar = useCallback(() => {
    dispatch(toggleDrawer("user-avatars-drawer"));
  }, [dispatch]);

  const drawers = useAppSelector(selectDrawers);
  const { isOpen } = selectDrawerById(drawers, "user-avatars-drawer") || {};

  if (error) {
    return <PageDefault />;
  }

  if (isLoading) {
    return <PageLoadingIndicator />;
  }

  if (!data) {
    return null;
  }

  return (
    <PageContent>
      <ToolbarTop />
      <UserAvatar
        onClick={handleDrawarAvatar}
        sx={{ width: 64, height: 64, cursor: "pointer" }}
        src={data?.avatar ? `${AVATARS_BASE_PATH}${data?.avatar}` : undefined}
      />
      <FormUser values={data} />
      <DrawerUseAvatars
        isOpen={isOpen}
        onClose={handleDrawarAvatar}
        user={data}
      />
    </PageContent>
  );
};

export default PageUserUpdate;
