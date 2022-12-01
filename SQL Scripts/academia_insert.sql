INSERT INTO department (departmentName) VALUES ('Accounts'),
                                               ('Admissions');


INSERT INTO employee (emailID, firstName, lastName, departmentID) VALUES ('rohit@yopmail.com', 'Rohit', NULL , 1),
                                                 ('rahul@yopmail.com', 'Rahul', 'Singh' , 1),
                                                 ('rohan@yopmail.com', 'Rohan', NULL ,2);

INSERT INTO employee_salary (amount, component, employeeID) VALUES (65000, 'HRA', 1),
                                                                    (60000, 'PF', 1),
                                                                    (60000, 'HRA', 2),
                                                                    (60000, 'PF', 2),
                                                                    (70000, 'HRA', 3),
                                                                    (60000, 'PF', 3),
                                                                    (60000, 'Gratuity', 3),
                                                                    (60000, 'Gratuity', 2);
INSERT INTO login (emailID, password) VALUES ('rohit@yopmail.com', '1234'),
                                             ('rohan@yopmail.com', '1234'),
                                             ('rahul@yopmail.com', '1234');   
