package com.academia.account.util;

import com.academia.account.bean.*;
import com.academia.account.bean.EmployeeSalary;
import com.academia.account.dao.impl.DepartmentDAOImpl;
import com.academia.account.dao.impl.EmployeeDAOImpl;
import com.academia.account.dao.impl.LoginDAOImpl;
import com.academia.account.dao.impl.SalaryDisbursementDAOImpl;

public class InitializeDB {
    public static void main(String[] args) {
        EmployeeDAOImpl employeeDAO = new EmployeeDAOImpl();
        SalaryDisbursementDAOImpl salaryDisbursementDAO = new SalaryDisbursementDAOImpl();
        LoginDAOImpl loginDAO = new LoginDAOImpl();

        // Department 1
        Department department = new Department();
        department.setDepartmentName("Accounts");

        DepartmentDAOImpl departmentDAO = new DepartmentDAOImpl();
        departmentDAO.addDepartment(department);

        // Department 2
        Department department1 = new Department();
        department1.setDepartmentName("Admissions");

        departmentDAO.addDepartment(department1);

        // Employee 2
        Employee employee2 = new Employee();
        employee2.setFirstName("Rohit");
        employee2.setEmailID("rohit@yopmail.com");

        employee2.setDepartment(department);
        employeeDAO.addEmployee(employee2);

        // Employee 1
        Employee employee1 = new Employee();
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employee1.setFirstName("Rahul");
        employee1.setLastName("Singh");
        employee1.setEmailID("rahul@yopmail.com");
        employee1.setDepartment(department);


        employeeDAO.addEmployee(employee1);

        // Employee 3
        Employee employee3 = new Employee();
        employee3.setFirstName("Rohan");
        employee3.setEmailID("rohan@yopmail.com");
        employee3.setDepartment(department1);

        employeeDAO.addEmployee(employee3);

        // Components for Employee 1
        employeeSalary.setEmployee(employee1);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee1);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee1);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("Gratuity");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        // Components for Employee 2
        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee2);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(65000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee2);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);


       // Components for employee 3
        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee3);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(70000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee3);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee3);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("Gratuity");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        // Login
        Login login = new Login();
        login.setEmployee(employee2);
        login.setPassword("1234");

        loginDAO.addLogin(login);

        Login login1 = new Login();
        login1.setEmployee(employee3);
        login1.setPassword("1234");

        loginDAO.addLogin(login1);

        Login login2 = new Login();
        login2.setEmployee(employee1);
        login2.setPassword("1234");

        loginDAO.addLogin(login2);
    }
}
