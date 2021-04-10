import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setMessagesListAction } from "../../redux/actions/User";

const useStyle = makeStyles((theme) => ({
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
}));

// @GetMapping("/messages/{senderId}/{recipientId}")
// 	public ResponseEntity<?> findChatMessages(@PathVariable String senderId, @PathVariable String recipientId) throws Exception{

// 		return ResponseEntity.ok(chatMessageService.findChatMessages(senderId, recipientId));

// 	}

//we have recipient id as active contac and sender id as current user email

export default function ChatBody(props) {
  const dispatch = useDispatch();

  //make a default name for active contact as initial state, in case of no selection of contact
  function getMessagesList(currentState, setmessages) {
    axios
      .get(
        `http://localhost:8080/messages/${currentState.currentUser.email}/${currentState.activeContact}`
      )
      .then((media) => {
        console.log("messages", media.data);
        setmessages(media.data);
        dispatch(setMessagesListAction(media.data));
      });
  }

  const [messages, setmessages] = useState([]);

  const classes = useStyle();

  const currentState = useSelector((state) => state);

  useEffect(() => {
    getMessagesList(currentState, setmessages);
  }, [currentState.activeContact]); //becoz state would be empty, but after click it should call again

  return (
    <div>
      <Grid container>
        {props.messageList.map((msg, i) => (
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
                <ListItemText primary={msg.content} secondary={msg.timestamp} />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
