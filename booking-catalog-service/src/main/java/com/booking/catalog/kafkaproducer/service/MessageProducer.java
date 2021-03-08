package com.booking.catalog.kafkaproducer.service;

import com.booking.catalog.kafkaproducer.model.Message;

public interface MessageProducer {
	void publishToQueue(String key, Message message);
}
