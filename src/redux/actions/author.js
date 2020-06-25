import AuthorModel from "../../models/Author";

export const getAuthor = () => ({
  type: "GET_AUTHOR",
  payload: new Promise((resolve, reject) => {
    AuthorModel.get()
      .then((res) => {
        resolve({ msg: "Success", data: res.data.data });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const createAuthor = (data, token = null) => ({
  type: "CREATE_AUTHOR",
  payload: new Promise((resolve, reject) => {
    AuthorModel.post(data, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const updateAuthor = (data, id, token = null) => ({
  type: "UPDATE_AUTHOR",
  payload: new Promise((resolve, reject) => {
    AuthorModel.patch(data, id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const deleteAuthor = (id, token = null) => ({
  type: "DELETE_AUTHOR",
  payload: new Promise((resolve, reject) => {
    AuthorModel.delete(id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});
