const url = "http://localhost:7070"; //the constant url part of localhost
let stompClient; //our Stomp client
let selectedUser; //global variable to whom we want to send the message
let newMessages = new Map(); //map of messages from users

//we will get this userName from the method param / request param
function connectToChat(userName) {
  console.log("connecting to chat...");
  let socket = new SockJS(url + "/chat/"); //this will connect socket to our registry.addEndpoint("/chat")
  console.log(socket);
  stompClient = Stomp.over(socket); //using stomp client on top of web socket
  //connect the stomp client, this method will take some params and a function with frame
  //Frame class represents a STOMP frame
  //Frame constructor. command, headers and body are available as properties.
  //Many of the Client methods pass instance of received Frame to the callback
  stompClient.connect({}, function (frame) {
    console.log("connected to: " + frame);
    //subscribe the user to the topic, append by the userName, same as in MessageController
    stompClient.subscribe("/topic/messages/" + userName, function (response) {
      let data = JSON.parse(response.body); //parse the data as stomp handles only text messages, and we need json so we parse it here
      console.log(data);
      //check if the selected user the user from the data got by json response
      if (selectedUser === data.fromLogin) {
        render(data.message, data.fromLogin);
      } else {
        newMessages.set(data.fromLogin, data.message);
        $("#userNameAppender_" + data.fromLogin).append(
          '<span id="newMessage_' +
            data.fromLogin +
            '" style="color: orange">new message</span>'
        ); //this is for new messages from existing user, +1 pop over for unread message, should be a counter, or can put new message instead of +1, what if user sent 2 or more messages
        console.log("new messages", newMessages);
      }
    });
  });
}

//function to send the message
function sendMsg(from, text) {
  //dest prefix starts from /app and then followed by /chat
  stompClient.send(
    "/app/chat/" + selectedUser,
    {},
    JSON.stringify({
      //the below fields has to be same as the fields in message model
      //from the person sending
      fromLogin: from,
      //the message in text format
      message: text,
    })
  );
}

//register the user
function registration() {
  let userName = document.getElementById("userName").value;
  //get the username and add it to the url, mapping to register user in user controller
  $.get(url + "/registration/" + userName, function (response) {
    connectToChat(userName);
  }).fail(function (error) {
    if (error.status === 400) {
      alert("Login is already busy!"); //this could be changed by our parameter, also check for other status codes for error
    }
  });
}

//function to allow our users to select a user from the chat
function selectUser(userName) {
  console.log("selecting users: " + userName);
  selectedUser = userName;
  let isNew = document.getElementById("newMessage_" + userName) !== null; //checking if there exist a span (i.e. +1 ) or not, differentiating between new user or existing user

  //check if user is new or not,
  if (isNew) {
    //if true, when user selects the user, the +1 should be removed
    let element = document.getElementById("newMessage_" + userName);
    element.parentNode.removeChild(element);
    render(newMessages.get(userName), userName);
  }
  $("#selectedUserId").html(""); //clear the element everytime we click the selected user else it will append it to the previous one
  $("#selectedUserId").append("Chat with " + userName); //heading
}

//method to fetch all the registered/entered chat users
function fetchAll() {
  //map to the /fetchAllUsers in users controller
  $.get(url + "/fetchAllUsers", function (response) {
    let users = response; //get all the users to display in the contacts section i.e. the left side of the chat app
    let usersTemplateHTML = ""; //add users dynamically
    for (let i = 0; i < users.length; i++) {
      //make it a anchor as one should chat only with the selected user,
      //for selectUser in onClick
      //var inputElement = document.createElement('input');
      //inputElement.type = "button"
      //inputElement.addEventListener('click', function(){
      //gotoNode(result.name);
      //});
      usersTemplateHTML =
        usersTemplateHTML +
        '<a href="#" onclick="selectUser(\'' +
        users[i] +
        '\')"><li class="clearfix">\n' +
        '                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" width="55px" height="55px" alt="avatar" />\n' +
        '                <div class="about">\n' +
        '                    <div id="userNameAppender_' + //giving a unique id to user, but this is not a good way, better way would be to use unique id
        users[i] +
        '" class="name">' +
        users[i] +
        "</div>\n" +
        '                    <div class="status">\n' +
        '                        <i class="fa fa-circle offline"></i>\n' +
        "                    </div>\n" +
        "                </div>\n" +
        "            </li></a>";
    }
    $("#usersList").html(usersTemplateHTML); //add it to the usersList component, index.jsp
  });
}
