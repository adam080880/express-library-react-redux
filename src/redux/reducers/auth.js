const initState = {
  raw_email: "",
  raw_password: "",
  isDone: true,
  session: {},
  msg: "",
  status: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_HANDLER": {
      const { param, value } = action.payload;
      return { ...state, ...{ [param]: value, status: null } };
    }
    case "LOGIN_PENDING": {
      return {
        ...state,
        ...{ isDone: false, status: null },
      };
    }
    case "LOGIN_FULFILLED": {
      const { data, msg } = action.payload;
      return {
        ...state,
        ...{
          isDone: true,
          status: true,
          session: data,
          msg,
          raw_email: "",
          raw_password: "",
        },
      };
    }
    case "LOGIN_REJECTED": {
      const { msg } = action.payload;
      return { ...state, ...{ isDone: true, status: false, msg } };
    }
    case "REGISTER_PENDING": {
      return {
        ...state,
        ...{ isDone: false, status: null },
      };
    }
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        ...{
          isDone: true,
          status: true,
          raw_email: "",
          raw_password: "",
        },
      };
    }
    case "REGISTER_REJECTED": {
      const { msg } = action.payload;
      return { ...state, ...{ isDone: true, status: false, msg } };
    }
    case "LOGOUT": {
      return { ...state, ...{ session: {} } };
    }
    default: {
      return state;
    }
  }
};

export default auth;
