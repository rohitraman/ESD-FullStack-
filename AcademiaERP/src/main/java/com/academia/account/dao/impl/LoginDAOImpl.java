package com.academia.account.dao.impl;

import com.academia.account.bean.Employee;
import com.academia.account.bean.Login;
import com.academia.account.bean.Response;
import com.academia.account.dao.LoginDAO;
import com.academia.account.util.HibernateUtil;
import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class LoginDAOImpl implements LoginDAO {
    @Override
    public Response loginEmployee(Login login) {
        String email = login.getEmployee().getEmailID();
        String password = login.getPassword();
        try (Session session = HibernateUtil.getSession()) {
            String hql = "FROM Login L WHERE L.employee.emailID = :email AND L.password = :password";
            Query query = session.createQuery(hql, Login.class);
            List<Login> loginList = query.setParameter("email", email).setParameter("password", password).getResultList();
            if (loginList.size() == 0) {
                return new Response(null, 400);
            }
            hql = "FROM Employee E WHERE E.emailID = '" + email + "'";
            query = session.createQuery(hql, Employee.class);
            List<Employee> employeeList = query.getResultList();
            if (employeeList.size() == 0) {
                return new Response(null, 400);
            }
            Employee employee = employeeList.get(0);
            return new Response(employee, 200);
        } catch (HibernateException e) {
            e.printStackTrace();
        }

        return new Response(null, 400);
    }

    @Override
    public boolean addLogin(Login login) {
        try (Session session = HibernateUtil.getSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(login);
            transaction.commit();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return true;
    }


}
