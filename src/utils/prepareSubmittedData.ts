import dayjs from "dayjs";
import { KeyValue } from "../types";

interface prepareSubmittedDataOptions {
  date?: string[];
}
export function prepareSubmittedData<T>(
  data: T,
  options?: prepareSubmittedDataOptions
): T {
  if (options?.date?.length) {
    const newData = { ...data } as KeyValue;
    options.date.forEach((key: string) => {
      if (newData.hasOwnProperty(key)) {
        const val = newData[key];
        newData[key] = val ? val.unix() : dayjs().unix();
      }
    });
    return newData as T;
  }
  return data;
}

export default prepareSubmittedData;
