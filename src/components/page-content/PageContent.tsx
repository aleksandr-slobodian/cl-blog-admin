import { ReactNode } from "react";
import Container from "@mui/material/Container";
import { Breakpoint, SxProps, Theme } from "@mui/material/styles";

interface PageContentProps {
  children?: ReactNode;
  maxWidth?: Breakpoint;
  isCentered?: boolean;
  isTop?: boolean;
  isFullHeight?: boolean;
  disableGutters?: boolean;
  sx?: SxProps<Theme>;
}
export const PageContent: React.FC<PageContentProps> = ({
  children,
  maxWidth,
  isCentered,
  isTop = true,
  isFullHeight = false,
  disableGutters = false,
  sx,
}) => {
  return (
    <Container
      disableGutters={disableGutters}
      maxWidth={maxWidth}
      sx={{
        paddingTop: isTop ? 4 : undefined,
        margin: isCentered ? "0 auto" : undefined,
        gap: 4,
        display: "flex",
        flexDirection: "column",
        flexGrow: isFullHeight ? 1 : 0,
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

export default PageContent;
