package com.academia.account.dao;

import com.academia.account.bean.Response;

public interface ModifySalaryDAO {
    Response updateSalary(Integer employeeID, Object obj);
    Response getAllEmployeesForSalary(Integer id);

}
