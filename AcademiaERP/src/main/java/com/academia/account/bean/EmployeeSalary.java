package com.academia.account.bean;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "employee_salary")
public class EmployeeSalary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer salaryDisbursementID;

    @ManyToOne
    @JoinColumn(name = "employeeID", referencedColumnName = "employeeID")
    private Employee employee;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(nullable = false)
    private String component;

    @Column(nullable = false)
    private Double amount;

    private String description;

    public Integer getSalaryDisbursementID() {
        return salaryDisbursementID;
    }

    public void setSalaryDisbursementID(Integer salaryDisbursementID) {
        this.salaryDisbursementID = salaryDisbursementID;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getComponent() {
        return component;
    }

    public void setComponent(String component) {
        this.component = component;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
