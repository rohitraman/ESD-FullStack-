package com.academia.account.dao.impl;

import com.academia.account.bean.Department;
import com.academia.account.dao.DepartmentDAO;
import com.academia.account.util.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;


public class DepartmentDAOImpl implements DepartmentDAO {
    @Override
    public boolean addDepartment(Department department) {
        try (Session session = HibernateUtil.getSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(department);
            transaction.commit();
            return true;
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return false;
    }
}
