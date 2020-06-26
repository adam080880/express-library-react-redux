import Axios from "axios";
import apiUrl from "../helpers/apiUrl";
import qs from "querystring";

export default {
  get: () => Axios.get(apiUrl("/genre")),
  post: (data, token) => {
    return Axios.post(apiUrl("/genre"), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  patch: (data, id, token) => {
    return Axios.patch(apiUrl(`/genre/${id}`), qs.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: (id, token) => {
    return Axios.delete(apiUrl(`/genre/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
