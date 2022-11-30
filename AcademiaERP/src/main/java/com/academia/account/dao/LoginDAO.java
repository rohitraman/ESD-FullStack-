package com.academia.account.dao;

import com.academia.account.bean.Login;
import com.academia.account.bean.Response;

public interface LoginDAO {
    Response loginEmployee(Login login);
    boolean addLogin(Login login);
}
