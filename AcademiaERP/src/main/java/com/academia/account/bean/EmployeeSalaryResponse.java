package com.academia.account.bean;

import java.util.List;

public class EmployeeSalaryResponse {
    private Integer salaryID;
    private Integer employeeID;
    private String name;
    private Double salary;

    public EmployeeSalaryResponse(Integer salaryID, Integer employeeID, String name, Double salary) {
        this.salaryID = salaryID;
        this.employeeID = employeeID;
        this.name = name;
        this.salary = salary;
    }

    public Integer getSalaryID() {
        return salaryID;
    }

    public void setSalaryID(Integer salaryID) {
        this.salaryID = salaryID;
    }

    public Integer getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(Integer employeeID) {
        this.employeeID = employeeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
