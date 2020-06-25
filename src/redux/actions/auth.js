import AuthModel from "../../models/Auth";

export const changeHandler = (param, value) => ({
  type: "CHANGE_HANDLER",
  payload: {
    param: "raw_".concat(param),
    value,
  },
});

export const login = (data) => ({
  type: "LOGIN",
  payload: new Promise((resolve, reject) => {
    AuthModel.login(data)
      .then((res) => {
        resolve({ msg: "Success", data: res.data.data });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});

export const register = (data) => ({
  type: "REGISTER",
  payload: new Promise((resolve, reject) => {
    AuthModel.register(data)
      .then((res) => {
        resolve({ msg: "Success", data: res.data.data });
      })
      .catch((rej) => {
        reject({
          msg: rej.response ? rej.response.data.msg : "Error server",
        });
      });
  }),
});

export const logout = () => ({
  type: "LOGOUT",
  payload: true,
});
