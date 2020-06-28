const initState = {
  users: [],
  isLoading: true,
  status: null,
  done: false,
  msg: "",
  pageInfo: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_USER_PENDING": {
      return { ...state, ...{ isLoading: true, status: null, done: false } };
    }
    case "GET_USER_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
          done: true,
          users: action.payload.data,
          pageInfo: action.payload.pageInfo,
        },
      };
    }
    case "GET_USER_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          done: true,
          msg: action.payload.msg,
        },
      };
    }
    default: {
      return state;
    }
  }
};
