const initState = {
  msg: "",
  items: [],
  real: [],
  status: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "GET_GENRE_PENDING": {
      return { ...state, ...{ status: null } };
    }
    case "GET_GENRE_FULFILLED": {
      return {
        ...state,
        ...{
          msg: "Success",
          items: action.payload.data,
          real: action.payload.data,
          status: true,
        },
      };
    }
    case "GET_GENRE_REJECTED": {
      return {
        ...state,
        ...{ msg: "Failed", items: [], real: [], status: false },
      };
    }
    case "SEARCH_GENRE": {
      return { ...state, ...{ items: action.payload } };
    }
    default: {
      return state;
    }
  }
};
