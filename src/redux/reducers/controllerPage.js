const initState = {
  modalInDashboard: "",
  isOpen: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        ...{ modalInDashboard: action.payload, isOpen: true },
      };
    }

    case "TOGGLE_MODAL": {
      return { ...state, ...{ isOpen: !state.isOpen, modalInDashboard: "" } };
    }

    default: {
      return state;
    }
  }
};
