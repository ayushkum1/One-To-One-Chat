package com.app.storage;

import java.util.HashSet;
import java.util.Set;

import com.app.exception.NoUserExistException;
import com.app.exception.UserAlreadyExistException;

public class UserStorage {
	// user storage to store the users, in our project it will be coming from the
	// database(mysql), or maybe mongo, firebase, aws, not sure about that

	private static UserStorage instance; // to get one instance of this user stroage class

	private Set<String> users; // this is the set of users, currently just the name, Set<String> will be
								// changed to Set<Users> in our project where in we will have different users

	// private to make it singleton
	private UserStorage() {
		users = new HashSet<>();
	}

	public static synchronized UserStorage getInstance() {
		if (instance == null) {
			instance = new UserStorage(); // if instance is null, create a new instance
		}

		return instance;
	}

	public Set<String> getUsers() throws NoUserExistException{
		if(users.isEmpty()) {
			throw new NoUserExistException("No user in your contact to message");
		}
		return users;
	}

	public void setUsers(String userName) throws UserAlreadyExistException{
		//currently this is based on the user name so that no two users have the same name
		//good practice would be to concat username and id from the database of our project to make them unique
		//as many users might have same name
		//one thing to consider, in our project, username is already unique, as we are using their email
		if(users.contains(userName)) {
			throw new UserAlreadyExistException("user with that user name already exists");
		}
		users.add(userName);
	}
	
	
	
	
}
