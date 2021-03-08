package com.booking.catalog.kafkaproducer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.booking.catalog.kafkaproducer.model.Message;

@Service
public class MessageProducerImpl implements MessageProducer {

	@Autowired
	private KafkaTemplate<String, Message> kafkaTemplate;

	private static final String TOPIC = "message.topic";

	@Override
	public void publishToQueue(String key, Message value) {
		kafkaTemplate.send(TOPIC, key, value);
	}
}
