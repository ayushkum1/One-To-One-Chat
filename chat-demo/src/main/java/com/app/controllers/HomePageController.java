package com.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

	public HomePageController() {
		System.out.println("in home page constructor");
	}
	
	@RequestMapping("/")
	public String setHomePage() {
		System.out.println("in setHomePage()");
		return "/index";
	}
	
}
