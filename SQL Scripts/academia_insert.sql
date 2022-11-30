INSERT INTO employee (emailID, firstName) VALUES ('rohit@yopmail.com', 'Rohit'),
                                                 ('rahul@yopmail.com', 'Rahul'),
                                                 ('rohan@yopmail.com', 'Rohan');

INSERT INTO employee_salary (amount, component, employeeID) VALUES (50000, 'HRA', 1),
                                                                    (90000, 'PF', 1),
                                                                    (18000, 'HRA', 2),
                                                                    (180000, 'PF', 2),
                                                                    (100000, 'HRA', 3),
                                                                    (100000, 'PF', 3),
                                                                    (20000, 'Gratuity', 3),
                                                                    (10000, 'Gratuity', 1);
INSERT INTO login (emailID, password) VALUES ('rohit@yopmail.com', '1234'),
                                             ('rohan@yopmail.com', '1234');   