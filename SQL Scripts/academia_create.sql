CREATE DATABASE AcademiaERPDB;

USE AcademiaERPDB;

CREATE TABLE employee (
  employeeID int NOT NULL AUTO_INCREMENT,
  emailID varchar(255) NOT NULL UNIQUE,
  firstName varchar(255) NOT NULL,
  lastName varchar(255),
  photoGraphPath varchar(255),
  title varchar(255),
  PRIMARY KEY (employeeID)
);

CREATE TABLE employee_salary (
  salaryDisbursementID int NOT NULL AUTO_INCREMENT,
  amount double NOT NULL,
  component varchar(255) NOT NULL,
  description varchar(255),
  payment_date datetime(6),
  employeeID int,
  PRIMARY KEY (salaryDisbursementID)
);

CREATE TABLE login (
  loginID int NOT NULL AUTO_INCREMENT,
  password varchar(255) NOT NULL,
  emailID varchar(255),
  PRIMARY KEY (loginID)
);