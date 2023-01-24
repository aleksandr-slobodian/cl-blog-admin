export type DateTimeType = "date" | "time" | "datetime";
export type DateTimeFormat = "long" | "short" | "digits";
export type DateFormatsConfig = {
  [K in string]: {
    [K in DateTimeType]: {
      [K in DateTimeFormat]: string;
    };
  };
};
