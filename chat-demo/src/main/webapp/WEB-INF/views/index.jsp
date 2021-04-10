<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%-- import spring supplied jsp tag lib for url rewriting --%>
    <%@ taglib uri ="http://www.springframework.org/tags" prefix="spring" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Custom messenger</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.1.1/list.min.js"></script>
    <!--    libs for stomp and sockjs-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
    <!--    end libs for stomp and sockjs-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet"
          type="text/css">
    <style><%@include file="/WEB-INF/views/css/style.css"%></style>
    
	<script type = "text/javascript" ><%@include file="/WEB-INF/views/js/custom.js"%></script>
	<script  type = "text/javascript" ><%@include file="/WEB-INF/views/js/chat1trial.js"%></script>
</head>
<body>
<div class="container clearfix">
    <div class="people-list" id="people-list">
        <div class="search">
            <input id="userName" placeholder="search" type="text"/>
            <button class="people-list-buttons" onclick="javascript:registration();">Enter the chat</button>
            <button class="people-list-buttons" onclick="javascript:fetchAll()">Refresh</button> <!-- refresh in this, but in react it wont be required as component will be re rendered automatically -->
        </div>
        <ul class="list" id="usersList">


        </ul>
    </div>

    <div class="chat">
        <div class="chat-header clearfix">
            <img alt="avatar" height="55px"
                 src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                 width="55px"/>

            <div class="chat-about">
                <div class="chat-with" id="selectedUserId"></div> <!-- heading of the chat, selected user -->
                <div class="chat-num-messages"></div>
            </div>
            <!-- <i class="fa fa-star"></i> -->
        </div> <!-- end chat-header -->

        <div class="chat-history">
            <ul id="ul-chat">
				<!-- this is the chat history, all the messages shared between 2 users -->
            </ul>

        </div> <!-- end chat-history -->

        <div class="chat-message clearfix">
            <textarea id="message-to-send" name="message-to-send" placeholder="Type your message" rows="3"></textarea>

            <!-- <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i class="fa fa-file-image-o"></i> -->

            <button id="sendBtn" onclick="javascript:addMessage()">Send</button>

        </div> <!-- end chat-message -->

    </div> <!-- end chat -->

</div> <!-- end container -->

<script id="message-template" type="text/x-handlebars-template">
    <li class="clearfix">
        <div class="message-data align-right">
            <span class="message-data-time">{{time}}, Today</span> &nbsp; &nbsp;
            <span class="message-data-name">You</span> <i class="fa fa-circle me"></i>
        </div>
        <div class="message other-message float-right">
            {{messageOutput}}
        </div>
    </li>
</script>

<!-- this is the response handlebars template with userName, time and response as variables, called in custom.js -->
<script id="message-response-template" type="text/x-handlebars-template">
    <li>
        <div class="message-data">
            <span class="message-data-name"><i class="fa fa-circle online"></i> {{userName}}</span>
            <span class="message-data-time">{{time}}, Today</span>
        </div>
        <div class="message my-message">
            {{response}}
        </div>
    </li>
</script>
</body>
</html>
