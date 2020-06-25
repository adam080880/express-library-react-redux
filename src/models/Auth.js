import axios from "axios";
import qs from "querystring";

import apiUrl from "../helpers/apiUrl";

export default {
  login: (data) => {
    const { email, password } = data;
    return axios.post(apiUrl("/auth/login"), qs.stringify({ email, password }));
  },
  register: (data) => {
    const { email, password } = data;
    return axios.post(
      apiUrl("/auth/register"),
      qs.stringify({ email, password })
    );
  },
};
