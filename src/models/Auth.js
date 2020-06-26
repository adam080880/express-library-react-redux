import axios from "axios";
import qs from "querystring";

import apiUrl from "../helpers/apiUrl";
import Axios from "axios";

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
  completeBiodata: (data, token) => {
    const { name, birth, phone, gender } = data;
    return Axios.post(
      apiUrl("/auth/complete_registration"),
      qs.stringify({ name, birthdate: birth, phone, gender }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
