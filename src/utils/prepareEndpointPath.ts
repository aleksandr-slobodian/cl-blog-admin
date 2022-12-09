import { KeyValue } from "../types";

/**
 * Helper function to fill endpoint url placeholders with values
 *
 * @param url Url to which should be parametrized
 * @param values Values to insert in placeholder
 */
export const prepareEndpointPath = (url: string, values?: KeyValue): string => {
  if (values) {
    Object.entries(values).forEach((item) => {
      url = url.replace(`{${item[0]}}`, item[1]);
    });
  }

  return url;
};
