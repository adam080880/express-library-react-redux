import Axios from "axios";

import apiUrl from "../helpers/apiUrl";
import qs from "querystring";

const authors = {
  get: (param, token) => {
    return Axios.get(apiUrl(`/user?${qs.stringify(param)}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  toggleRole: (id, token) => {
    return Axios.patch(
      apiUrl(`/user/toggle/role/${id}`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default authors;
