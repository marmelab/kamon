import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:3001";
const httpClient = fetchUtils.fetchJson;

// TypeScript users must reference the type `DataProvider`
export const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      limit: perPage,
      offset: page - 1,
      order: `${field}.${order.toLowerCase()}`,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      console.log(json);
      return {
        data: json,
        total: json.length,
      };
    });
  },
};
