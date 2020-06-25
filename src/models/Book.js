import axios from "axios";
import qs from "querystring";

import apiUrl from "../helpers/apiUrl";

export default {
  find: (id) => {
    return axios.get(apiUrl(`/books/${id}`));
  },
  get: (param) => {
    return axios.get(apiUrl(`/books?${qs.stringify(param)}&limit=4`));
  },
  post: (formData, token) => {
    return axios.post(apiUrl("/books"), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  patch: (formData, id, token) => {
    return axios.patch(apiUrl(`/books/${id}`), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete: (id, token) => {
    return axios.delete(apiUrl(`/books/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
