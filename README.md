# Pi Calculator

> A server that is calculating Pi Value and a client that shows the latest server calculation of the Pi Value and calculates the circumferrence of the sun

### Server

#### ExpressJS with TypeScript
##### Socket IO to keep the calculation of Pi running and return the latest value with queried with HTTP GET request
##### Pi calculation algorithm: Spigot Algorithm

### Client

#### ReactJS with TypeScript
##### Material UI as styling framework

## Installing / Getting started

### Prerequisites

You need to have NodeJS installed on your device.

```shell
git clone https://github.com/kuohongteodev/pi-calculator.git
cd pi-calculator
cd server
npm install
cd ..
cd client
npm install
```

Running the command above will install required packages/libraries for the project

### Building

To run the project (server)

```shell
cd pi-calculator
cd server
npm run server
```

To run the project (client)

In another terminal

```shell
cd pi-calculator
cd client
npm run start
```

A webpage with URL http://localhost:3000/ should open automatically after running the command above

## Limitation

#### No Database involved. Calculation will reset once the server is stopped.
#### Server calculates Pi value every 2 seconds to prevent crashes

## Future Improvement

#### We can run the calculation a Cloud Server to prevent unforseen circumstances like electricity shortage if local devices are used as server
#### Involvement of database to keep the calculation running 
#### UI improvement (Timestamp, Animation)
