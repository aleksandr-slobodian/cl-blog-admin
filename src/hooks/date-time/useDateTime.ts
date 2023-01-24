import dayjs from "dayjs";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { dateFormats } from "../../config/date-time-formats";
import { DateTimeFormat, DateTimeType } from "../../types/date-time";

export const useDateTime = (
  date: string | number,
  format: DateTimeFormat = "long",
  type: DateTimeType = "date"
) => {
  const { i18n } = useTranslation();
  const lng = i18n.languages[0];
  return useMemo(() => {
    return dayjs(date).locale(lng).format(dateFormats[lng][type][format]);
  }, [date, format, lng, type]);
};

export default useDateTime;
