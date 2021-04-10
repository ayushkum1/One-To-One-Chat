const initialState = {
  name: "Ayush Kumar Singh",
  email: "ayush", //according to database
};

const activeContactInitialState = "";

const messagesListInitialState = [];

export const setCurrentUserReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case "SET_CURRENT_USER":
      return payload;

    default:
      return state;
  }
};

export const setActiveContact = (
  state = activeContactInitialState,
  { type, payload }
) => {
  switch (type) {
    case "SET_ACTIVE_CONTACT":
      return payload;

    default:
      return state;
  }
};

export const setMessagesList = (
  state = messagesListInitialState,
  { type, payload }
) => {
  switch (type) {
    case "SET_MESSAGES_LIST":
      return payload;

    default:
      return state;
  }
};
