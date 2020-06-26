const initState = {
  msg: "",
  items: [],
  real: [],
  status: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_AUTHOR_PENDING": {
      return { ...state, ...{ items: [], status: null } };
    }
    case "GET_AUTHOR_FULFILLED": {
      return {
        ...state,
        ...{
          msg: "Success",
          items: action.payload.data,
          status: true,
          real: action.payload.data,
        },
      };
    }
    case "GET_AUTHOR_REJECTED": {
      return { ...state, ...{ msg: "Failed", items: [], status: false } };
    }
    case "SEARCH": {
      return { ...state, ...{ items: action.payload } };
    }
    default: {
      return state;
    }
  }
};
