import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  setMessagesListAction,
  setActiveContactAction,
} from "../../redux/actions/User";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";

export default function Chattrial() {
  var stompClient = null;
  const currentState = useSelector((state) => state);
  const currentUser = currentState.currentUser;
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(
    currentState.activeContact
  );
  const [messages, setMessages] = useState(currentState.messageList);
  // -====================
  useEffect(() => {
    // if (localStorage.getItem("accessToken") === null) {
    //   props.history.push("/login");
    // }
    connect();
    loadContacts();
  }, []);

  useEffect(() => {
    if (activeContact === undefined) return;
    axios
      .get(
        `http://localhost:8080/messages/${activeContact}/${currentUser.email}`
      )
      .then((msgs) => setMessages(msgs));
    loadContacts();
  }, [activeContact]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("connected");
    console.log(currentUser);
    stompClient.subscribe(
      "/user/" + currentUser.email + "/queue/messages",
      onMessageReceived
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  //==========LOAD CONTACT=============
  const loadContacts = async () => {
    const promise = await axios
      .get(`http://localhost:8080/all-contacts/${currentUser.email}`)
      .then(
        (users) => setContacts(users.data)
        // users.data.map((contact) =>
        //   axios
        //     .get(
        //       `http://localhost:8080/messages/${contact}/${currentUser.email}/count`
        //     )
        //     .then((count) => {

        //       // contact.newMessages = count;
        //       return contact;
        //     })
        // )
      );

    // promise.then((promises) =>
    //   Promise.all(promises).then((users) => {
    //     setContacts(users);
    //     if (activeContact === undefined && users.length > 0) {
    //       setActiveContact(users[0]);
    //     }
    //   })
    // );
  };
  // ==========================

  //======================================================================
  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body);
    const active = currentState.activeContact;

    if (active === notification.senderId) {
      axios
        .get(`http://localhost:8080/message/${notification.id}`)
        .then((message) => {
          const newMessages = currentState.messageList;
          newMessages.push(message);
          setMessages(newMessages);
        });
    } else {
      window.alert("Received a new message from " + notification.senderName);
      //   message.info("Received a new message from " + notification.senderName);
    }
    loadContacts();
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: currentUser.email,
        recipientId: activeContact,
        senderName: currentUser.email,
        recipientName: activeContact,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };
  //======================================================================

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">
            <img
              id="profile-img"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              class="online"
              alt=""
            />
            <p>{currentUser.name}</p>
          </div>
        </div>
        <div id="contacts">
          <ul>
            {contacts.map((contact) => (
              <li
                onClick={() => setActiveContact(contact)}
                class={
                  activeContact && contact.id === activeContact.id
                    ? "contact active"
                    : "contact"
                }
              >
                <div class="wrap">
                  <span class="contact-status online"></span>
                  <img
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt=""
                  />
                  <div class="meta">
                    <p class="name">{contact.name}</p>
                    {contact.newMessages !== undefined &&
                      contact.newMessages > 0 && (
                        <p class="preview">
                          {contact.newMessages} new messages
                        </p>
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="bottom-bar">
          <button id="addcontact">
            <i class="fa fa-user fa-fw" aria-hidden="true"></i>{" "}
            <span>Profile</span>
          </button>
          <button id="settings">
            <i class="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="contact-profile">
          <img
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt=""
          />
          <p>{activeContact && activeContact.name}</p>
        </div>
        <ScrollToBottom className="messages">
          <ul>
            {messages.map((msg) => (
              <li class={msg.senderId === currentUser.id ? "sent" : "replies"}>
                {msg.senderId !== currentUser.id && (
                  <img
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    alt=""
                  />
                )}
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </ScrollToBottom>
        <div class="message-input">
          <div class="wrap">
            <input
              name="user_input"
              size="large"
              placeholder="Write your message..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />

            <Button
              icon={<i class="fa fa-paper-plane" aria-hidden="true"></i>}
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
