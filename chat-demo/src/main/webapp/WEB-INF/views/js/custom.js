let $chatHistory;
let $button;
let $textarea;
let $chatHistoryList;

function init() {
  cacheDOM();
  bindEvents();
}

//not working with jsp
function bindEvents() {
  $button.on("click", addMessage.bind(this));
  $textarea.on("keyup", addMessageEnter.bind(this));
}

function cacheDOM() {
  $chatHistory = $(".chat-history"); //chat history id from index.jsp
  $button = $("#sendBtn"); //send button id from index.jsp
  $textarea = $("#message-to-send"); //message to send text area id from index.jsp
  $chatHistoryList = $chatHistory.find("ul"); //chat historys ul id from index.jsp, only one ul child is there, can be id specific
}

//renders message and the user name
//this method will be called in chat1trial.js to render the message after sendMessage(), inside sendMSg(chat1trial.js)
function render(message, userName) {
  scrollToBottom();
  // responses
  // message-response-template id from index.jsp
  var templateResponse = Handlebars.compile(
    $("#message-response-template").html()
  );
  console.log("inside handle bar message-response-template");
  var contextResponse = {
    response: message,
    time: getCurrentTime(),
    userName: userName,
  };

  console.log("context Response ", contextResponse);

  setTimeout(
    function () {
      $("#ul-chat").append(templateResponse(contextResponse));
      scrollToBottom();
    }.bind(this),
    1500
  );
}

//method to send messages to user
function sendMessage(message) {
  let username = $("#userName").val(); //get the username from index.jsp
  console.log(username);
  sendMsg(username, message); //call the method from the chat1trial.js, that will send the message via stompclient, sends message to the server first
  scrollToBottom();
  if (message.trim() !== "") {
    var template = Handlebars.compile($("#message-template").html());
    var context = {
      messageOutput: message,
      time: getCurrentTime(),
      toUserName: selectedUser,
    };

    $("#ul-chat").append(template(context));
    scrollToBottom();
    $("#message-to-send").val("");
  }
}

function scrollToBottom() {
  $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
}

function getCurrentTime() {
  return new Date()
    .toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}

function addMessage() {
  console.log("inside add message ()");
  sendMessage($("#message-to-send").val());
}

function addMessageEnter(event) {
  // enter was pressed
  if (event.keyCode === 13) {
    addMessage();
  }
}

init();
