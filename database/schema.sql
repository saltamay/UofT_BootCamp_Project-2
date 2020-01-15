-- CREATE DATABASE 

CREATE DATABASE airdate;

USE airdate;

/* CREATE TABLE */
CREATE TABLE airport_details
( airport_id int NOT NULL auto_increment,
  name varchar(100) NOT NULL,
  city varchar(50) NOT NULL,
  country varchar(30) NOT NULL,
  IATA varchar(3),
  ICAO varchar(4),
  latitude float(20),
  longitude float(20),
  altitude int(50),
  timezone int(20),
  daylight_savings_time varchar(5),
  tz varchar(50),
  primary key(airport_id)
);

CREATE TABLE users_details
( 
	id int NOT NULL auto_increment,
	first_name varchar(30) NOT NULL,
	last_name varchar(30) NOT NULL,
    birthdate date,
    email varchar(50),
    relationship_status varchar(30),
    height int(10),
    hair_colour varchar(50),
    tagline varchar(100),
    bio varchar(300),
    image_url varchar(100),
	primary key(id)
);

CREATE TABLE trip_details
( 
	id int NOT NULL auto_increment,
    user_id int NOT NULL,
    airport varchar(100),
    time varchar(100),
	primary key(trip_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_details(id)
);

