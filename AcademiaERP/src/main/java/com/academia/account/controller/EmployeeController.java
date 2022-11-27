package com.academia.account.controller;

import com.academia.account.bean.Employee;
import com.academia.account.dao.impl.EmployeeDAOImpl;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/employee")
public class EmployeeController {
    @POST
    @Path("/add")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean addEmployee(Employee employee) {
        return new EmployeeDAOImpl().addEmployee(employee);
    }
}
