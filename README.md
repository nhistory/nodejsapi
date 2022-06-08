# nodejsapi

An API to handle patient database with NodeJS back-end connected to a MySQL database server.

## Initial setup

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
<img width="300" alt="image" src="https://user-images.githubusercontent.com/39740066/171910322-1039642e-8738-4d18-9ffe-5a9e4ba86aa8.png">

-   Response test by using [Httpie](https://httpie.io/): `http :3000`
<img width="476" alt="image" src="https://user-images.githubusercontent.com/39740066/172006602-27e01dd2-9f54-41f6-a8c2-7e516f3bf376.png">


## Initiate database

-   patients entity (init.sql)
<img width="186" alt="image" src="https://user-images.githubusercontent.com/39740066/172004626-bb4de846-f9b7-472c-adc1-4ef058937bc9.png">

## Implement API server
- run server by dev mode : ```npm run start:dev```

## Pino - Logging library
Logging library can give unprecedented insights into how application is working. Having proper logging is equivalent to having poweful telescope in a space with all applications. [Pino](https://www.npmjs.com/package/pino) is a Node.js logging library that attributes asynchronous logging to its fast performance. With Pino, you can send the logs to many services by using proper transports like MySQL, Datadog, AWS cloud watch, or log flare.


# References
- https://www.youtube.com/playlist?list=PLopcHtZ0hJF1XfuyxnFmGmpmHrdyKO6Bx
- https://geshan.com.np/blog/2021/01/nodejs-logging-library/
