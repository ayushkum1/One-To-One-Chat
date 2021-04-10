package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.NoUserExistException;
import com.app.model.MessageModel;
import com.app.storage.UserStorage;

@RestController // to tell spring its a rest controller
public class MessageController {

	@Autowired
	private SimpMessagingTemplate simpMessageTemplate; //provides methods for sending messages to a user.
	
	// since our register end point is chat, we will start mapping as chat
	@MessageMapping("/chat/{user}") // {user} is the person who will receive this message, in other tutorials its
									// generally "myTopic" or "topic"
	//bundling {user} to method using @DestinationVariable, refer docs in sts
	public void sendMessage(@DestinationVariable String user, MessageModel message) {
		
		System.out.println("inside sendMessage() for handling message"
				+ " \nmessage: " + message + "\nto " + user);
		boolean isExists;
		//check if user exists in our UserStorage(later would be from database)
		try {
			isExists = UserStorage.getInstance().getUsers().contains(user);
			if(isExists) {
				simpMessageTemplate.convertAndSend("/topic/messages/"+user, message);
				//convertAndSend takes 2 parameter, destination and payload
				//destination starts with /topic, to make the url more readable add /message and /user to it
				//while payload is the message
			}
		}
		catch (NoUserExistException e) {
			System.out.println("Exception " + e.getMessage());
		}
	}

}
