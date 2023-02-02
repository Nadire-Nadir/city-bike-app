# Helsinki-city-bike-app

This is a fullstack web application,  It provides a plateform to display data from journeys made with city bikes in the Helsinki Capital area, and display all existing city bicycle staions data, and also display related datas of each station, like station basic infomation, total number of journeys starting from and ending at this station, average distance of journeys starting from and ending at this station, and a map marked the station location.

## Technologies
### backend:
 - NodeJS  `v18.12.1`
 - ExpressJS `^4.18.2`
 - Prisma `^4.8.1`
 - Typescript `^4.9.4`
 - Jest `^29.3.1`
 - PostgresQL
 
 ### frontend:
 - ReactJS `^18.2.0`
 - Typescript `^4.9.4`
 - TestCafe `2.3.0`

 
## Installation

To get started with a project, you need to have NPM and Node installed on your computer.

 - Clone the project
$ `git clone git@github.com:Nadire-Nadir/helsinki-city-bike-app.git`

 - Go inside the project's root directory
 $ `cd helsinki-city-bike-app` 
 - Go inside the server directory 
 helsinki-city-bike-app $ `cd server`
 - Install dependencies in server
 server $ `npm  install or yarn add` 
 - Go back to project's root directory
 server $ `cd . .`
 - Go inside the client directory 
 helsinki-city-bike-app $ `cd client`
 - Install dependencies in client
 client $ `npm  install or yarn install` 


## Get started
### Database

#### Seeding your database

 - Go to server directory 
 helsinki-city-bike-app $ `cd server`
 
 - For seeding your database, run this command
  server $  `npx prisma db seed`
  
  For more info, click [HERE](https://www.prisma.io/docs/guides/database/seed-database).

### Server

#### Start dev server
 - Go to server directory the project's root directory
 helsinki-city-bike-app $ `cd server`
 
 - Start `dev` server in local machine
  server $  `STAGE=local npm run dev`
  
### Client

#### Start client
 - Go to client directory from the project's root directory
 helsinki-city-bike-app $ `cd client`
 
 - Start client `dev` server
  client $  `npm start`

## Tests

### Backend Test:
 - Go inside the server directory 
 helsinki-city-bike-app $ `cd server`
 - Run test
 server $ STAGE=test npm run test

### Frontend Test:
 - Go inside the client directory 
 helsinki-city-bike-app $ `cd client`
  - Run test
 client $  npm run test

## Features

### Frontend
#### Current features 
 - JWT Authentication handling
 - Login view
 - Signup view
 - After login, journey list view
 - Data sorting
 - Data filtering
 - Pegination
 - Privious & Next page selection
 - Row sum per page selection
 - Per row click
 - Station detail page view with marked map
 - Test Coverage for all the interaction
 
#### Todo
 - Ui for adding new journey
 - Ui for deleting a journey
 - Ui for adding new station
 - Ui for Deleting a station
 - Ui for Editing a station
 - Ability to filter journeys list per month
 - Ability to filter all the calculations in station detail in per month
 - More test

### Backtend
#### Current features 

 - Route for signup new user
 - Route for signin user
 - Route for get all journeys
 - Route for creating new journey
  - Route for get all stations
 - Route for creating new station
 - Route for get one station with id
 - Route for delete a station with id
 - Route for edit a station with id
 - Route for counting total number of journeys starting from the given station and counting total number of journeys ending at the given station
 - Route for aggregate the average distance of a journey starting from the given station and aggregate the average distance of a journey ending at the given station
 - Test coverage for auth, journey and station routes

#### Todo

 - More test coverage
