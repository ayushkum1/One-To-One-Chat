const initialState = [];

export const setCurrentContactListReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "SET_USER_CONTACTS":
      return payload;

    default:
      return state;
  }
};
