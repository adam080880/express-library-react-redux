import Axios from "axios";
import apiUrl from "../helpers/apiUrl";
import qs from "querystring";

export default {
  get: () => Axios.get(apiUrl("/author")),
  post: (data, token) => {
    return Axios.post(apiUrl("/author"), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  patch: (data, id, token) => {
    return Axios.patch(apiUrl(`/author/${id}`), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (id, token) => {
    return Axios.delete(apiUrl(`/author/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
