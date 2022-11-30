package com.academia.account.controller;

import com.academia.account.bean.Response;
import com.academia.account.dao.impl.ModifySalaryDAOImpl;
import com.academia.account.dao.impl.SalaryDisbursementDAOImpl;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("modify")
public class ModifySalaryController {
    @PUT
    @Path("getByID/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getObject(@PathParam("id") Integer id, Object obj) {
        return new ModifySalaryDAOImpl().updateSalary(id, obj);
    }

    @GET
    @Path("/getall/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployeesForSalary(@PathParam("id") Integer id) {
        return new ModifySalaryDAOImpl().getAllEmployeesForSalary(id);
    }

}
