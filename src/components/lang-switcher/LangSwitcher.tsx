import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../i18n/config";

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const hanleClick = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
    },
    [i18n]
  );

  if (!supportedLngs.length) {
    return null;
  }
  return (
    <ButtonGroup size="small">
      {supportedLngs.map((code: string) => (
        <Button
          variant={code === i18n?.languages[0] ? "contained" : "outlined"}
          key={`lngsw-code-${code}`}
          onClick={() => hanleClick(code)}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default LangSwitcher;
