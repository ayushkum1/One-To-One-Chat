import {
  Grid,
  makeStyles,
  Button,
  TextareaAutosize,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  Typography,
  Divider,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState, useRef } from "react";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  setMessagesListAction,
  setActiveContactAction,
  setCurrentUserContacts,
} from "../../redux/actions/User";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import LeftPanel from "../search/LeftPanel";
import CurrentUserDisplay from "../search/CurrentUserDisplay";

const useStyle = makeStyles((theme) => ({
  header: {
    height: "10%",
    width: "100%",
  },
  body: {
    height: "80%",
    width: "100%",
    background: "#f3f3f3",
    borderRadius: "20px",
    margin: "10px",
    overflowY: "scroll",
  },
  message: {
    height: "10%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaPosition: {
    display: "flex",
    marginLeft: "10px",
    width: "100%",
  },
  divheight: {
    height: "95vh",
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    padding: "1em",
    borderRadius: "10px",
    outline: "none",
    border: "1px solid rgb(219, 219, 219)",
    fontSize: "1.5em",
    boxShadow: "5px 5px rgb(209, 207, 207, 0.8)",
  },
  messageRecieved: {
    width: "fit-content",
    display: "flex",
    background: "#71c468",
    wordBreak: "break-all",
    margin: "1em",
    borderRadius: "10px",
    outline: "none",
    border: "1px solid rgb(219, 219, 219)",
    fontSize: "1.5em",
    boxShadow: "4px 4px rgb(171, 171, 171, 0.5)",
  },
  messageSent: {
    width: "fit-content",
    textAlign: "end",
    background: "rgb(207, 200, 0, 0.5)",
    float: "right",
    wordBreak: "break-all",
    margin: "1em",
    borderRadius: "10px",
    outline: "none",
    border: "none",
    fontSize: "1.5em",
    boxShadow: "4px 4px rgb(171, 171, 171, 0.5)",
  },
  gridmargin: {
    margin: "10px",
    padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  typoDiv: {
    width: "100%",
    padding: "5px",
  },
  typo: {
    fontSize: "1.3em",
  },
  divider: {
    background: "white",
  },
  contactsbackground: {
    overflowY: "scroll",
  },
}));

export default function Chat() {
  const currentState = useSelector((state) => state);
  const [messages, setmessages] = useState(currentState.messageList);
  const [newNotification, setnewNotification] = useState(false);
  const [unreadMessageSender, setunreadMessageSender] = useState({});
  const dispatch = useDispatch();
  const [text, settext] = useState("");
  const [activeCon, setactiveCon] = useState("");
  const [contactList, setcontactList] = useState([]);

  var stompClient = null;
  console.log("Stomp from line 77", stompClient);
  const Stomp = require("stompjs");
  console.log("Stomp ", Stomp);
  var SockJS = require("sockjs-client");
  console.log("SockJS ", SockJS);
  SockJS = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(SockJS);
  console.log("Stomp from connect()", stompClient);

  const getMessagesList = async (activeContact, setmessages) => {
    await axios
      .get(
        `http://localhost:8080/messages/${activeContact}/${currentState.currentUser.email}`
      )
      .then((media) => {
        console.log("messages", media.data);
        setmessages(media.data);
        // dispatch(setMessagesListAction(media.data));
      });
  };

  useEffect(async () => {
    await axios
      .get(
        `http://localhost:8080/messages/${currentState.activeContact}/${currentState.currentUser.email}`
      )
      .then((media) => {
        console.log("messages", media.data);
        setmessages(media.data);
        dispatch(setMessagesListAction(media.data));
      });
    getMessagesList(currentState, setmessages);
  }, [currentState.activeContact]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/all-contacts/${currentState.currentUser.email}`
      ) //currently hardcoded, set the state in previos useEffect, during sign in and then get the email of the current user
      .then((media) => {
        console.log(media.data);
        dispatch(setCurrentUserContacts(media.data));
        setcontactList(media.data);
      })
      .catch((error) => {
        console.log(error);
      });
    connect();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const connect = () => {
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    console.log("connected");
    console.log("inside onConnected ", currentState.currentUser);
    stompClient.subscribe(
      "/user/" + currentState.currentUser.email + "/queue/messages",
      onMessageReceived
    );
  };
  const onError = (err) => {
    console.log("error", err);
  };

  function GetMessage(notification) {
    console.log("inside getmessage()");
    axios
      .get(`http://localhost:8080/message/${notification.id}`)
      .then((message) => {
        console.log("from --->>>>>", message);
        const newMessages = [...currentState.messageList];
        console.log("--->>>> newMessages", newMessages);
        newMessages.push(message);
        console.log("--->>>> newMessages", newMessages);
        setmessages(newMessages);
        console.log("--->>>> messages", messages);
        dispatch(setMessagesListAction(newMessages));
      });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // function NotificationSnackbar(notificationMsg) {
  //   setnewNotification(true);
  //   console.log("notification message ", notificationMsg);
  //   return <Alert severity="info">{notificationMsg}</Alert>;
  // }

  const handleAlertClick = () => {
    setnewNotification(false);
    console.log("unreadMessageSender -->>>", unreadMessageSender);
    dispatch(setActiveContactAction(unreadMessageSender.senderId));
  };

  const onMessageReceived = (msg) => {
    console.log("helllllo", msg);
    const notification = JSON.parse(msg.body);

    console.log("in before if part");
    console.log("this is active contact", currentState.activeContact);
    console.log("this is sender id", notification.senderId);
    if (currentState.activeContact === notification.senderId) {
      console.log("in if part");
      console.log("this is active contact", currentState.activeContact);
      console.log("this is sender id", notification.senderId);
      setactiveCon(notification.senderId);

      // GetMessage(notification);
      // getMessagesList(notification.senderId, setmessages);
      // let newMess = [...currentState.messageList];
      // axios
      //   .get(`http://localhost:8080/message/${notification.id}`)
      //   .then((message) => {
      //     console.log("from --->>>>>", message);
      //     newMess.push(message.data);
      //     console.log("okayyyygdhebdjhebde", newMess);
      //     setmessages(newMess);
      //   });
    } else {
      console.log("in else part");

      console.log("this is active contact", currentState.activeContact);
      console.log("this is sender id", notification.senderId);
      setunreadMessageSender(notification);
      setnewNotification(true);
      // getMessagesList(currentState, setmessages);
      // NotificationSnackbar("mesage from " + notification.senderId);
    }
    getMessagesList(activeCon, setmessages);
  };

  const sendMessage = (msg) => {
    if (msg !== "") {
      const message = {
        senderId: currentState.currentUser.email,
        recipientId: currentState.activeContact,
        senderName: currentState.currentUser.name,
        recipientName: currentState.activeContact,
        content: msg,
        timestamp: moment(new Date().toISOString()).format("YYYY-MM-DD"),
      };
      console.log("from send message()", stompClient);
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setmessages(newMessages);
      dispatch(setMessagesListAction(messages)); //required to set the messages with the new one
      settext("");
    }
  };

  const scrollRef = useRef(null);
  const classes = useStyle();
  return (
    <div>
      <Grid container>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <div>
            <Grid container>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <CurrentUserDisplay current={currentState.currentUser.name} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                {contactList.map((contact) => (
                  <Grid
                    container
                    //1
                    onClick={() => dispatch(setActiveContactAction(contact))}
                  >
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                      <Grid container className={classes.gridmargin}>
                        <Grid
                          item
                          xs={3}
                          md={3}
                          lg={3}
                          xl={3}
                          className={classes.avatarAlignment}
                        >
                          <Avatar
                            alt="current-user-photo"
                            className={classes.small}
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                          />
                        </Grid>
                        <Grid xs={9} md={9} lg={9} xl={9}>
                          <div className={classes.typoDiv}>
                            <Typography
                              variant="subtitle1"
                              align="left"
                              className={classes.typo}
                            >
                              {contact}
                            </Typography>
                            {/* {console.log(
                        "plssssss",
                        count.filter(
                          (x) =>
                            x.senderId === contact && x.status === "RECIEVED"
                        ).length
                      )} */}
                            {/* {count.filter(
                        (x) => x.senderId === contact && x.status === "RECIEVED"
                      ).length > 0 ? ( */}
                            <Typography>
                              {/* {
                            count.filter(
                              (x) =>
                                x.senderId === contact &&
                                x.status === "RECIEVED"
                            ).length
                          } */}
                              {/* new messages */}
                            </Typography>
                            {/* ) : null} */}
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container className={classes.gridmargin}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Divider className={classes.divider} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={9} md={9} lg={9} xl={9}>
          <div className={classes.divheight}>
            <Grid container className={classes.header}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <ChatHeader />
              </Grid>
            </Grid>
            {newNotification && (
              <Snackbar open={newNotification} onClose={handleAlertClick}>
                <Alert severity="info" onClose={handleAlertClick}>
                  {console.log(
                    "--------------<>>><><><>",
                    unreadMessageSender.senderName
                  )}
                  Received a new message from {unreadMessageSender.senderName}
                </Alert>
              </Snackbar>
            )}
            <Grid container className={classes.body}>
              {/* chat body */}
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <div>
                  <Grid container>
                    {messages.map((msg, i) => (
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        {/* map the list (sent or replied condition)*/}
                        <List>
                          <ListItem
                            className={
                              currentState.currentUser.email === msg.senderId
                                ? classes.messageSent
                                : classes.messageRecieved
                            }
                          >
                            <ListItemAvatar>
                              <Avatar src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={msg.content}
                              secondary={msg.timestamp}
                            />
                          </ListItem>
                          <ListItem ref={scrollRef} />
                        </List>
                      </Grid>
                    ))}
                  </Grid>
                </div>
                {/* <ChatBody messageList={currentState.messageList} /> */}
              </Grid>
            </Grid>
            <Grid container className={classes.message}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                {/* message text area */}
                <div>
                  <Grid container className={classes.textAreaPosition}>
                    <Grid item xs={9} md={9} lg={9} xl={9}>
                      <TextareaAutosize
                        rowsMin="1"
                        placeholder="Type a message"
                        className={classes.textarea}
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      md={2}
                      lg={2}
                      xl={2}
                      className={classes.button}
                    >
                      <Button
                        variant="contained"
                        color="default"
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick={() => sendMessage(text)}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
