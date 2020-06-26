const initState = {
  lists: [],
  isLoading: null,
  status: null,
  msg: "",
  pageInfo: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_STATUS": {
      return { ...state, ...{ status: action.payload } };
    }
    case "BOOKING_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "BOOKING_FULFILLED": {
      return { ...state, ...{ isLoading: false, status: true } };
    }
    case "BOOKING_REJECTED": {
      return {
        ...state,
        ...{ isLoading: false, status: false, msg: action.payload.msg },
      };
    }
    case "GET_MEMBER_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "GET_MEMBER_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
          lists: action.payload.data,
          pageInfo: action.payload.pageInfo,
        },
      };
    }
    case "GET_MEMBER_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.msg,
          lists: [],
        },
      };
    }
    case "GET_ADMIN_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "GET_ADMIN_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
          lists: action.payload.data,
          pageInfo: action.payload.pageInfo,
        },
      };
    }
    case "GET_ADMIN_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.msg,
          lists: [],
        },
      };
    }
    case "BORROW_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "BORROW_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
        },
      };
    }
    case "BORROW_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.msg,
        },
      };
    }
    case "CANCEL_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "CANCEL_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
        },
      };
    }
    case "CANCEL_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.msg,
        },
      };
    }
    case "RETURN_PENDING": {
      return { ...state, ...{ isLoading: true, status: null } };
    }
    case "RETURN_FULFILLED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
        },
      };
    }
    case "RETURN_REJECTED": {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.msg,
        },
      };
    }
    default: {
      return state;
    }
  }
};
