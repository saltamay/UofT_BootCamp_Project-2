const connection = require('../config/connection');

const database = {
  dropAirportTable: 'DROP TABLE IF EXISTS Airport',
  dropUserTable: 'DROP TABLE IF EXISTS User',
  dropTripTable: 'DROP TABLE IF EXISTS Trip',
  createAirportTable: `CREATE TABLE Airport
  ( id int NOT NULL auto_increment,
    airportName VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(30) NOT NULL,
    iata VARCHAR(3),
    icao VARCHAR(4),
    latitude float(20),
    longitude float(20),
    altitude int(50),
    timezone int(20),
    dst VARCHAR(5),
    tz VARCHAR(50),
    primary key(id)
  )`,
  createUserTable: `CREATE TABLE User
  ( 
    id int NOT NULL auto_increment,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    birthdate date,
    gender VARCHAR(30),
    email VARCHAR(50),
    relationshipStatus VARCHAR(30),
    height int(10),
    hairColour VARCHAR(50),
    tagline VARCHAR(100),
    bio VARCHAR(300),
    imageUrl VARCHAR(100),
    primary key(id)
  )`,
  createTripTable: `CREATE TABLE Trip
  ( 
    id int NOT NULL auto_increment,
    userId int NOT NULL,
    airport VARCHAR(100),
    tripDate VARCHAR(100),
    timeSlot VARCHAR(100),
    primary key(id),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES User(id)
  )`,
  reset() {
    connection.query(this.dropTripTable, err => {
      if (err) throw err;
    });

    connection.query(this.dropUserTable, err => {
      if (err) throw err;
    });

    connection.query(this.createUserTable, err => {
      if (err) throw err;
    });

    connection.query(this.createTripTable, err => {
      if (err) throw err;
    });
  },
  init() {
    // Seed User table
    connection.query(
      `INSERT INTO User (firstName, lastName, birthdate, gender, email, relationshipStatus, height, hairColour, tagline, bio, imageUrl) VALUES 
    ('John', 'Doe', '1990-06-15', 'Male', 'johndoe@gmail.com', 'Single', 170, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Odis', 'Lasher', '1990-06-15', 'Male', 'johndoe@gmail.com', 'Single', 170, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Peter', 'Aubert', '1990-06-15', 'Male', 'johndoe@gmail.com', 'Single', 170, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Elvis', 'Canning', '1990-06-15', 'Male', 'johndoe@gmail.com', 'Single', 155, 'Golden', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Zackary', 'Chartrand', '1990-06-15', 'Male', 'johndoe@gmail.com', 'Single', 170, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Marth', 'Castile', '1990-06-15', 'Female', 'johndoe@gmail.com', 'Single', 180, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Kindra', 'Nicholas', '1990-06-15', 'Female', 'johndoe@gmail.com', 'Single', 170, 'Black', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Leana', 'Chalker', '1990-06-15', 'Female', 'johndoe@gmail.com', 'Married', 170, 'Green', 'Test Tag Line', 'Meet me at airport', 'Test Link'),
    ('Tim', 'Hortons', '1990-06-15', 'Female', 'johndoe@gmail.com', 'Single', 182, 'Brown', 'Test Tag Line', 'Meet me at airport', 'Test Link')`,
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );

    connection.query(
      `INSERT INTO Trip (userId, airport, tripDate, timeSlot) 
        VALUES 
          (1, 'Lester B. Pearson International Airport', '2020-01-22', ''),
          (2, 'London Heathrow Airport', '2020-02-14', ''),
          (2, 'Paris-Le Bourget Airport', '2020-02-21', ''),
          (3, 'London Gatwick Airport', '2020-02-14', ''),
          (5, 'John F Kennedy International Airport', '2020-02-14', ''),
          (1, 'John F Kennedy International Airport', '2020-02-14', '0,1,2')`,
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }
};

module.exports = database;
