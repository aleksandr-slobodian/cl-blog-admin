import { DateFormatsConfig } from "../types/date-time";

export const dateFormats: DateFormatsConfig = {
  en: {
    date: {
      long: "MMMM D, YYYY",
      short: "MMM D, YYYY",
      digits: "MM/DD/YYYY",
    },
    time: {
      long: "h:mm:ss A",
      short: "h:mm A",
      digits: "HH:mm",
    },
    datetime: {
      long: "MMMM D, YYYY h:mm A",
      short: "MMM D, YYYY h:mm A",
      digits: "MM/DD/YYYY HH:mm",
    },
  },
  uk: {
    date: {
      long: "D MMMM YYYY",
      short: "D MMM YYYY",
      digits: "DD.MM.YYYY",
    },
    time: {
      long: "HH:mm:ss",
      short: "HH:mm",
      digits: "HH:mm",
    },
    datetime: {
      long: "D MMMM YYYY HH:mm",
      short: "D MMM YYYY HH:mm",
      digits: "DD.MM.YYYY HH:mm",
    },
  },
};
