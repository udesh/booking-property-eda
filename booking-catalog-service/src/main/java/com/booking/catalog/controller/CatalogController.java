package com.booking.catalog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.catalog.kafkaproducer.model.Message;
import com.booking.catalog.kafkaproducer.service.MessageProducer;

@RestController
public class CatalogController {

	@Autowired
	private MessageProducer messageProducer;

	@GetMapping("/locations")
	public String hello() throws Exception {
		messageProducer.publishToQueue("key1", new Message(1, "This is a test message"));
		return "Colombo";

	}

}
