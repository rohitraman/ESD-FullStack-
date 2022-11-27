package com.academia.account.controller;

import com.academia.account.bean.Login;
import com.academia.account.bean.Response;
import com.academia.account.dao.impl.LoginDAOImpl;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("login")
public class LoginController {
    @POST
    @Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Login login) {
        LoginDAOImpl loginDAO = new LoginDAOImpl();
        Response result = loginDAO.loginEmployee(login);
        return result;
    }
}
