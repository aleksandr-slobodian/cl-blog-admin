import { LinkProps } from "@mui/material/Link";
import { createTheme } from "@mui/material/styles/";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useMemo } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectDarkMode } from "../state/theme/themeSlice";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const useTheme = () => {
  const darkMode = useAppSelector(selectDarkMode);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return useMemo(
    () =>
      createTheme({
        typography: {
          h1: {
            fontSize: 30,
            fontWeight: 400,
          },
          h2: {
            fontSize: 22,
            fontWeight: 400,
          },
        },
        components: {
          MuiTextField: {
            defaultProps: {
              size: "small",
            },
          },
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehavior,
            },
          },
        },
        palette: {
          mode:
            darkMode === undefined
              ? prefersDarkMode
                ? "dark"
                : "light"
              : darkMode
              ? "dark"
              : "light",
        },
      }),
    [darkMode, prefersDarkMode]
  );
};
