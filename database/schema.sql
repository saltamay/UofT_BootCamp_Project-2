/* CREATE TABLE */
CREATE TABLE Airport
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
);

CREATE TABLE User
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
);

CREATE TABLE Trip
( 
	id int NOT NULL auto_increment,
  userId int NOT NULL,
  airport VARCHAR(100),
  tripDate VARCHAR(100),
  timeSlot VARCHAR(100),
	primary key(id),
	CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES User(id)
);

