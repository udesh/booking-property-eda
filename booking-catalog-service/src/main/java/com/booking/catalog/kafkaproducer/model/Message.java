package com.booking.catalog.kafkaproducer.model;

public class Message {

    int id;
    String body;

    public Message(int id, String body) {
        this.id = id;
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", body='" + body + '\'' +
                '}';
    }
}
