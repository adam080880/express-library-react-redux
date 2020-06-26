const initState = {
  raw_email: "",
  raw_password: "",
  isDone: true,
  session: {},
  msg: "",
  status: null,
  completeRegis: null,
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
    case "COMPLETE_REGISTRATION_PENDING": {
      return {
        ...state,
        ...{ completeRegis: null, isDone: false },
      };
    }
    case "COMPLETE_REGISTRATION_FULFILLED": {
      return {
        ...state,
        ...{ completeRegis: true, isDone: true },
      };
    }
    case "COMPLETE_REGISTRATION_REJECTED": {
      return {
        ...state,
        ...{
          completeRegis: false,
          msg: action.payload.msg,
          isDone: true,
        },
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        ...{ session: {}, status: null, completeRegis: null, isDone: true },
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
