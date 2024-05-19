# MinesweeperCBR

MinesweeperCBR is a project that combines a Java backend with an Angular frontend to create an interactive Minesweeper game enhanced with Case-Based Reasoning (CBR) functionality.

## Table of Contents
1. [Backend](#backend)
    - [Installation](#installation)
    - [Starting the Server](#starting-the-server)
    - [Initializing the Casebase](#initializing-the-casebase)
    - [Availability Indicator](#availability-indicator)
2. [Frontend](#frontend)
    - [Production Mode](#production-mode)
    - [Development Mode](#development-mode)
3. [Technologies Used](#technologies-used)

## Backend

The backend of the MinesweeperCBR project is built using Java and is powered by Apache Tomcat Server v10.0.

### Installation

To install the necessary dependencies, run the following command:

```
mvn clean install
```

### Starting the Server
To start the server, use the following shortcut in your IDE:

```
Alt + Shift + X, R
```

### Initializing the Casebase
To initialize the casebase, send a GET request to the following URL:

```
http://127.0.0.1:8080/minesweeper-cbr-backend/
```

### Availability Indicator
Once the server is running and the casebase is initialized, you should see the following message indicating that the CBR system is available:

```
Minesweeper-CBR-Backend running at Port:8080
```

## Frontend
The frontend of the MinesweeperCBR project is built using Angular.

### Production Mode
To start the frontend in production mode, use the following command:

```
npm run start:prod
```

In production mode, the colored hint area is generated randomly.

### Development Mode
To start the frontend in development mode, use the following command:

```
npm run start:dev
```

In development mode, you can debug the colored hint areas.

## Technologies Used

* Java: Backend logic
* MyCBR: Case-Based-Reasoning system
* Apache Tomcat Server v10.0: Hosting the backend
* Angular: User Interface
* Maven: Dependency management and build automation (backend)
* npm: Dependency management and build automation (frontend)
