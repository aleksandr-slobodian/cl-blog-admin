import dayjs from "dayjs";
import { useMemo } from "react";
import { KeyValue } from "../../types";

interface preparedDataOptions {
  date?: string[];
}

export function useFormsPreparedData<T>(
  data: T,
  options?: preparedDataOptions
): T {
  return useMemo(() => {
    if (!data) {
      return data;
    }
    if (options?.date?.length) {
      const newData = { ...data } as KeyValue;
      options.date.forEach((key: string) => {
        if (newData.hasOwnProperty(key)) {
          const val = newData[key];
          newData[key] =
            val && typeof val === "number" ? dayjs(val * 1000) : dayjs();
        }
      });
      return newData as T;
    }
    return data;
  }, [data, options?.date]);
}

export default useFormsPreparedData;
