import UserModel from "../../models/User";

export const get = (param, token) => ({
  type: "GET_USER",
  payload: new Promise((resolve, reject) => {
    UserModel.get(param, token)
      .then((res) => {
        resolve({ data: res.data.data, pageInfo: res.data.pageInfo });
      })
      .catch((rej) => {
        console.log(rej);
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});

export const toggleRole = (id, token) => ({
  type: "TOGGLE_ROLE",
  payload: new Promise((resolve, reject) => {
    UserModel.toggleRole(id, token)
      .then((res) => {
        resolve(true);
      })
      .catch((rej) => {
        reject({ msg: rej.response ? rej.response.data.msg : "Error server" });
      });
  }),
});
