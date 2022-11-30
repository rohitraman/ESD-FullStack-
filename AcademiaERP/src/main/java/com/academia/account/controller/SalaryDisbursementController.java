package com.academia.account.controller;

import com.academia.account.bean.EmployeeSalaryResponse;
import com.academia.account.bean.Response;
import com.academia.account.bean.SalaryDisbursementRequest;
import com.academia.account.dao.impl.SalaryDisbursementDAOImpl;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("salary")
public class SalaryDisbursementController {
    @PUT
    @Path("/put/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getList(@PathParam("id") Integer id, SalaryDisbursementRequest employeeIDRequest) {
        SalaryDisbursementDAOImpl salaryDisbursementDAO = new SalaryDisbursementDAOImpl();
        return salaryDisbursementDAO.updateSalaryStatus(id, employeeIDRequest.getIdList());
    }

    @GET
    @Path("/getall/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployeesForSalary(@PathParam("id") Integer id) {
        return new SalaryDisbursementDAOImpl().getAllEmployeesForSalary(id);
    }

    @GET
    @Path("/getByID/{id}")
    public Response getEmployeeSalary(@PathParam("id") Integer id) {
        return new SalaryDisbursementDAOImpl().getEmployeeSalarybyID(id);
    }


}
