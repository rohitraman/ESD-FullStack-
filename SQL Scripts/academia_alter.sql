ALTER TABLE employee_salary
ADD FOREIGN KEY (employeeID) REFERENCES employee(employeeID);

ALTER TABLE login
ADD FOREIGN KEY (emailID) REFERENCES employee(emailID);