const initState = {
  isLoading: true,
  status: null,
  items: [],
  data: {},
  pageInfo: {},
  msg: "",
  onProgress: "",
};

const books = (state = initState, action) => {
  switch (action.type) {
    // set status
    case "SET_STATUS": {
      return { ...state, ...{ status: action.payload } };
    }

    // get books
    case "GET_BOOK_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }

    case "GET_BOOK_FULFILLED": {
      const { pageInfo, data } = action.payload;
      return {
        ...state,
        ...{ isLoading: false, items: data, pageInfo, status: null },
      };
    }

    case "GET_BOOK_REJECTED": {
      return { ...state, ...{ isLoading: false, items: [], status: null } };
    }

    // find book
    case "FIND_BOOK_PENDING": {
      return { ...state, ...{ isLoading: true } };
    }

    case "FIND_BOOK_FULFILLED": {
      const { data } = action.payload;
      return {
        ...state,
        ...{ isLoading: false, data, status: null },
      };
    }

    case "FIND_BOOK_REJECTED": {
      const { data } = action.payload;
      return { ...state, ...{ isLoading: false, data, status: null } };
    }

    // add book
    case "ADD_BOOK_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }

    case "ADD_BOOK_FULFILLED": {
      const { msg } = action.payload;
      return {
        ...state,
        ...{ isLoading: false, status: true, msg, onProgress: "create" },
      };
    }

    case "ADD_BOOK_REJECTED": {
      const { msg } = action.payload;
      return { ...state, ...{ isLoading: false, status: false, msg } };
    }

    // edit book
    case "EDIT_BOOK_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }

    case "EDIT_BOOK_FULFILLED": {
      const { msg } = action.payload;
      return {
        ...state,
        ...{ isLoading: false, status: true, msg, onProgress: "edit" },
      };
    }

    case "EDIT_BOOK_REJECTED": {
      const { msg } = action.payload;
      return { ...state, ...{ isLoading: false, status: false, msg } };
    }

    // delete  book
    case "DELETE_BOOK_PENDING": {
      return { ...state, ...{ isLoading: true } };
    }

    case "DELETE_BOOK_FULFILLED": {
      const { msg } = action.payload;
      return {
        ...state,
        ...{ isLoading: false, status: true, msg, onProgress: "delete" },
      };
    }

    case "DELETE_BOOK_REJECTED": {
      const { msg } = action.payload;
      return { ...state, ...{ isLoading: false, status: false, msg } };
    }

    default: {
      return state;
    }
  }
};

export default books;
