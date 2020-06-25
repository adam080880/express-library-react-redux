const initState = {
  msg: "",
  items: [],
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
        ...{ msg: "Success", items: action.payload.data, status: true },
      };
    }
    case "GET_AUTHOR_REJECTED": {
      return { ...state, ...{ msg: "Failed", items: [], status: false } };
    }
    default: {
      return state;
    }
  }
};
