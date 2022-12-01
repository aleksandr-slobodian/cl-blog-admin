import { LinkProps } from "@mui/material/Link";
import { createTheme } from "@mui/material/styles/";
import React from "react";
import { useMemo } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const useTheme = () => {
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
          mode: "light",
        },
      }),
    []
  );
};
