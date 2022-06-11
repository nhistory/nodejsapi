# Table of Contents
1. [What is nodejsapi?](https://github.com/nhistory/nodejsapi/edit/master/README.md#what-is-nodejsapi)
2. [Initial setup](https://github.com/nhistory/nodejsapi/edit/master/README.md#initial-setup)
3. [Initiate database](https://github.com/nhistory/nodejsapi/edit/master/README.md#initiate-database)
5. [Implement API server](https://github.com/nhistory/nodejsapi/edit/master/README.md#implement-api-server)
6. [Pino - Logging library](https://github.com/nhistory/nodejsapi/edit/master/README.md#pino---logging-library)
7. [Controller structure](https://github.com/nhistory/nodejsapi/edit/master/README.md#controller-structure)
8. [How to test this API](https://github.com/nhistory/nodejsapi/edit/master/README.md#how-to-test-this-api)
9. [Containerization with docker](https://github.com/nhistory/nodejsapi/edit/master/README.md#containerization-with-docker)
10. [References](https://github.com/nhistory/nodejsapi/edit/master/README.md#references)

## What is nodejsapi?

An API to handle patient database with NodeJS back-end connected to a MySQL database server.
- Track the API performance by using NodeJS logging library Pino.
- Initiate database and handle by query commands to controll patientdb.
- Fetch and retrieve patient data by using MVC controller.
- Test API request and reponse by using httpie.
- Build docker container by using docker-compose.yml setup.


## Initial setup
You can start ```nodejsapi``` by following steps below.
-   Initiate nodejs project: `npm init`
-   Install dependencies: `npm i express mysql cors dotenv ip pino-pretty`
-   Install nodemon as development mode: `npm i -D nodemon`
-   Scripts for dev mode and prod mode

```json
"start:dev": "NODE_ENV=dev nodemon src/index.js",
"start:prod": "NODE_ENV=prod node src/index.js"
```

-   Type setting for using javascript import, export method.

```json
"type": "module"
```

-   package.json
<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/171910322-1039642e-8738-4d18-9ffe-5a9e4ba86aa8.png">

-   Response test by using [Httpie](https://httpie.io/): `http :3000`
<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/172006602-27e01dd2-9f54-41f6-a8c2-7e516f3bf376.png">


## Initiate database

-   patients entity (init.sql)
<img width="200" alt="image" src="https://user-images.githubusercontent.com/39740066/172004626-bb4de846-f9b7-472c-adc1-4ef058937bc9.png">

## Implement API server
There are different configurations in Nodejs, production and development environments. Node.js assumes that it's always running in a development environment. You can signal Node.js that you are running in production by setting the ```NODE_ENV=production environment``` variable.

Setting the environment to production generally ensures that
- logging is kept to a minimum, essential level
- more caching levels take place to optimize performance

![image](https://user-images.githubusercontent.com/39740066/173159523-1d936dcf-2f31-4d51-978e-b3811c05a347.png)

There is a [article](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that compares CPU usage between development mode and production mode. As you can see, the development mode needs way more resources from CPU. It makes sense because we usually like real-time monitoring tools such as nodemon when developing applications. Therefore it is important to distinguish the Nodejs environment depending on the stage of development.

- run server by dev mode : ```npm run start:dev```

## Pino - Logging library
Logging library can give unprecedented insights into how the application is working. Having proper logging is equivalent to having a powerful telescope in a space with all applications. [Pino](https://www.npmjs.com/package/pino) is a Node.js logging library that attributes asynchronous logging to its fast performance. With Pino, you can send the logs to many services using proper transports like MySQL, Datadog, AWS cloud watch, or log flare. In this project, Pino provides logging messages to determine what API is doing and if there are any errors. [commit](https://github.com/nhistory/nodejsapi/commit/4a9d4d6678fa146d53172434646d17f12eb19716)

## Controller structure
<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173194875-c2465ae6-567f-4c9e-bed8-40e3eeb243de.png">


When you make a request (means request a data) to MVC application, a controller is responsible for returning the response to that request. The controller can perform one or more actions. The controller action can return different types of action results to a particular request. In this application, there are 5 actions at ```patient.controller.js```.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173167326-5b071043-f6c9-4b8c-b8ed-5b9d7136fbb9.png">

## How to test this API
After you pull this application, you can execute API with ```npm run start:dev```(development mode) command inside of working directory ```nodejsapi```. If there is no error and conflicts, you can see the message like this.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173194775-69a2ecfb-7dfd-4d27-b44b-bc3c070306da.png">

If you want to test by using httpie, ```http :3000``` or ```http :3000/patients``` command will help for checking there are any issues with PORT 3000.

<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173195029-1c9d891f-e52e-4cc0-8050-5abca85fa080.png">
<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173196859-7498817e-19a1-4e81-aa2c-60d829fc863a.png">

## Containerization with docker

Docker is an open-source containerization platform. It enables developers to package applications into containers. We can handle the initial setting of docker container with docker-compose. In this application, we will build a docker image for using MySQL without install in the host computer directly. Before starting the docker-compose file, you need to check if any docker image is currently running with ```docker ps -a``` and ```docker images```. We can also check the docker-compose file using the command ```docker-compose config```.
```docker-compose up -d``` command start downloading MySQL 8 version docker image and run. You can see detailed information with docker ps.

- If you already installed and are running MySQL on the host, there would be an error regard to PORT.(address already in use)
- Get into the MySQL cli mode : ```mysql -h localhost -P 3306 --protocol=tcp -uroot -pletmein```

You can find ```patientsdb``` after using ```SHOW DATABASES``` command.

<img width="207" alt="image" src="https://user-images.githubusercontent.com/39740066/173204659-75bf9890-4e42-44ad-a6b9-91024abe7056.png">

And we can check patients entity information by using ```DESC patients```

<img width="450" alt="image" src="https://user-images.githubusercontent.com/39740066/173204721-275e31d9-51b7-4150-8a5f-750b878c519c.png">


## References
- https://www.youtube.com/playlist?list=PLopcHtZ0hJF1XfuyxnFmGmpmHrdyKO6Bx
- https://geshan.com.np/blog/2021/01/nodejs-logging-library/
- https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production
- https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/
- https://www.tutorialspoint.com/mvc_framework/mvc_framework_controllers.htm
- https://www.ibm.com/in-en/cloud/learn/docker
