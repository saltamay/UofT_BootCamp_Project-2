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

