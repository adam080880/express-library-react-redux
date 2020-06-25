export const openModal = (form) => {
  return {
    type: "OPEN_MODAL",
    payload: form,
  };
};

export const toggleModal = () => {
  return {
    type: "TOGGLE_MODAL",
    payload: true,
  };
};
