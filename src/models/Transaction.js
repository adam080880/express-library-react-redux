import Axios from "axios";
import apiUrl from "../helpers/apiUrl";
import qs from "querystring";

export default {
  booking: (id, data, token) => {
    const { promise_returned_at } = data;
    return Axios.post(
      apiUrl(`/member/transaction`),
      qs.stringify({
        ...{ book_id: id },
        ...{ promise_returned_at: promise_returned_at },
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  adminTransaction: (params, token) => {
    return Axios.get(apiUrl(`/transaction?${qs.stringify(params)}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  memberTransaction: (params, token) => {
    return Axios.get(apiUrl(`/member/transaction?${qs.stringify(params)}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  toBorrow: (id, token) => {
    return Axios.patch(
      apiUrl(`/transaction/borrow/${id}`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  toReturn: (id, token) => {
    return Axios.patch(
      apiUrl(`/transaction/return/${id}`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  toCancel: (id, token) => {
    return Axios.patch(
      apiUrl(`/transaction/cancel/${id}`),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
