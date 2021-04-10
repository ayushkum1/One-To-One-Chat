export const setUserAction = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};

export const setCurrentUserContacts = (userContactList) => {
  return {
    type: "SET_USER_CONTACTS",
    payload: userContactList,
  };
};

export const setActiveContactAction = (activeContact) => {
  return {
    type: "SET_ACTIVE_CONTACT",
    payload: activeContact,
  };
};

export const setMessagesListAction = (messageList) => {
  return {
    type: "SET_MESSAGES_LIST",
    payload: messageList,
  };
};
