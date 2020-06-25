import BookModel from "../../models/Book";

export const setStatus = (status) => ({
  type: "SET_STATUS",
  payload: status,
});

export const getBook = (param = {}) => ({
  type: "GET_BOOK",
  payload: new Promise((resolve, reject) => {
    BookModel.get(param)
      .then((res) => {
        resolve({ data: res.data.data, pageInfo: res.data.pageInfo });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});

export const findBook = (id) => ({
  type: "FIND_BOOK",
  payload: new Promise((resolve, reject) => {
    BookModel.find(id)
      .then((res) => {
        resolve({ data: res.data.data });
      })
      .catch((rej) => {
        reject({ data: {} });
      });
  }),
});

export const addBook = (data, token) => ({
  type: "ADD_BOOK",
  payload: new Promise((resolve, reject) => {
    BookModel.post(data, token)
      .then((res, rej) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const editBook = (data, id, token) => ({
  type: "EDIT_BOOK",
  payload: new Promise((resolve, reject) => {
    BookModel.patch(data, id, token)
      .then((res, rej) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const deleteBook = (data, token) => ({
  type: "DELETE_BOOK",
  payload: new Promise((resolve, reject) => {
    BookModel.delete(data, token)
      .then((res, rej) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});
