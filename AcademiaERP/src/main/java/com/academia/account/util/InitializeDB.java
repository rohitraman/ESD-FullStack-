package com.academia.account.util;

import com.academia.account.bean.Employee;
import com.academia.account.bean.EmployeeSalary;
import com.academia.account.bean.Login;
import com.academia.account.bean.EmployeeSalary;
import com.academia.account.dao.impl.EmployeeDAOImpl;
import com.academia.account.dao.impl.LoginDAOImpl;
import com.academia.account.dao.impl.SalaryDisbursementDAOImpl;

public class InitializeDB {
    public static void main(String[] args) {
        Employee employee = new Employee();
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employee.setFirstName("Rahul");
        employee.setEmailID("rahul@yopmail.com");

        EmployeeDAOImpl employeeDAO = new EmployeeDAOImpl();
        SalaryDisbursementDAOImpl salaryDisbursementDAO = new SalaryDisbursementDAOImpl();

        employeeDAO.addEmployee(employee);
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employee = new Employee();
        employee.setFirstName("Rohit");
        employee.setEmailID("rohit@yopmail.com");

        employeeDAO.addEmployee(employee);
        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(65000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employee = new Employee();
        employee.setFirstName("Rohan");
        employee.setEmailID("rohan@yopmail.com");

        employeeDAO.addEmployee(employee);
        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(70000d);
        employeeSalary.setComponent("HRA");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        employeeSalary = new EmployeeSalary();
        employeeSalary.setEmployee(employee);
        employeeSalary.setPaymentDate(null);
        employeeSalary.setAmount(60000d);
        employeeSalary.setComponent("PF");
        salaryDisbursementDAO.addSalaryDisbursement(employeeSalary);

        Login login = new Login();
        login.setEmployee(employee);
        login.setPassword("1234");

        LoginDAOImpl loginDAO = new LoginDAOImpl();
        loginDAO.addLogin(login);
    }
}
