import Transaction from "../../models/Transaction";

export const setStatus = (status) => ({
  type: "SET_STATUS",
  payload: status,
});

export const booking = (data, token) => ({
  type: "BOOKING",
  payload: new Promise((resolve, reject) => {
    const { book_id, promise_returned_at } = data;
    Transaction.booking(book_id, { promise_returned_at }, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const getMember = (param, token) => ({
  type: "GET_MEMBER",
  payload: new Promise((resolve, reject) => {
    Transaction.memberTransaction(param, token)
      .then((res) => {
        resolve({ data: res.data.data, pageInfo: res.data.pageInfo });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
          data: [],
        });
      });
  }),
});

export const getAdmin = (param, token) => ({
  type: "GET_ADMIN",
  payload: new Promise((resolve, reject) => {
    Transaction.adminTransaction(param, token)
      .then((res) => {
        resolve({ data: res.data.data, pageInfo: res.data.pageInfo });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
          data: [],
        });
      });
  }),
});

export const borrow = (id, token) => ({
  type: "BORROW",
  payload: new Promise((resolve, reject) => {
    Transaction.toBorrow(id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});

export const toReturn = (id, token) => ({
  type: "RETURN",
  payload: new Promise((resolve, reject) => {
    Transaction.toReturn(id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});

export const cancel = (id, token) => ({
  type: "CANCEL",
  payload: new Promise((resolve, reject) => {
    Transaction.toCancel(id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});
