package com.academia.account.dao;

import com.academia.account.bean.EmployeeSalary;
import com.academia.account.bean.Response;

import java.util.List;

public interface SalaryDisbursementDAO {
    Response updateSalaryStatus(Integer id, List<Integer> idList);
    boolean addSalaryDisbursement(EmployeeSalary employeeSalary);
    Response getAllEmployeesForSalary(Integer id);
    Response getEmployeeSalarybyID(Integer id);
}
