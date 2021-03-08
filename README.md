
<hr>

## About this project

Application is being developed using Java, Spring and React with Kafka for supporting the Event Driven Microservices Architecture.

Using Spring Cloud Microservices and Spring Boot Framework extensively to make this application distributed. 

<hr>

## Architecture
All the Microservices are developed using spring boot. 
This spring boot applications will be registered with Consul discovery server.

Zuul will route the requests to microservice
based on the url route. Zuul also registers with Consul and gets the ip/domain from Consul for microservice while routing the request. 

<hr>

## Run this project in Local Machine

>Frontend App 

Navigate to `booking-frontend-react-app` folder
Run below commnads to start Frontend React Application

```
yarn install
yarn start
```

>Backend Services
>
To Start Backend Services follow below steps.

Use below method to deploy all the services in docker.

>Using Docker.

Start Docker Engine in your machine.

Run `mvn clean install` at root of project to build all the microservices jars.

Run `docker-compose up --build` to start all the containers.


<hr>

### Service Discovery
This project uses Consul as Discovery service.

Since docker-compose manages all consul stuff hence using Consul while running services in docker.

