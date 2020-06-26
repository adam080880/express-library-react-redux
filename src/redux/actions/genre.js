import GenreModel from "../../models/Genre";

export const getGenre = () => ({
  type: "GET_GENRE",
  payload: new Promise((resolve, reject) => {
    GenreModel.get()
      .then((res) => {
        resolve({ msg: "Success", data: res.data.data });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const createGenre = (data, token = null) => ({
  type: "CREATE_GENRE",
  payload: new Promise((resolve, reject) => {
    GenreModel.post(data, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const updateGenre = (data, id, token = null) => ({
  type: "UPDATE_GENRE",
  payload: new Promise((resolve, reject) => {
    GenreModel.patch(data, id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const deleteGenre = (id, token = null) => ({
  type: "DELETE_GENRE",
  payload: new Promise((resolve, reject) => {
    GenreModel.delete(id, token)
      .then((res) => {
        resolve({ msg: "Success" });
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const search = (key = "", items = []) => {
  const payload = items.filter((val) =>
    val.name.toLowerCase().includes(key.toLowerCase())
  );
  return {
    type: "SEARCH_GENRE",
    payload,
  };
};
