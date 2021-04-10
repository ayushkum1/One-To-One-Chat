package com.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

@Configuration // to tell spring this is config class
@EnableWebSocketMessageBroker // enable the websocket message broker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

	// override the 2 methods to serve the incoming messages

	// STOMP: Simple (or Streaming) Text Orientated Messaging Protocol
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// TODO Auto-generated method stub
//		WebSocketMessageBrokerConfigurer.super.registerStompEndpoints(registry);

		// any incoming request with "/chat"
		// withSockJS : enable sockjs fallback options(learn more)
			
		/*this error comes when we use setAllowedOrigins, instead use setAllowedOriginPatterns when you want any pattern i.e "*"
		 * When allowCredentials is true, allowedOrigins cannot contain the special
		 * value "*" since that cannot be set on the "Access-Control-Allow-Origin"
		 * response header. To allow credentials to a set of origins, list them
		 * explicitly or consider using "allowedOriginPatterns" instead.
		 */
		registry.addEndpoint("/chat").setAllowedOriginPatterns("*").withSockJS();

	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// TODO Auto-generated method stub
//		WebSocketMessageBrokerConfigurer.super.configureMessageBroker(registry);

		// ("/app") prefix to differentiate or filter the request
		// ("/topic") to filter destinations targeting the broker
		registry.setApplicationDestinationPrefixes("/app").enableSimpleBroker("/topic");
	}

}
