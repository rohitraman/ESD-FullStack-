package com.academia.account.dao.impl;

import com.academia.account.bean.EmployeeSalary;
import com.academia.account.bean.EmployeeSalaryResponse;
import com.academia.account.bean.Response;
import com.academia.account.dao.SalaryDisbursementDAO;
import com.academia.account.util.HibernateUtil;
import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.*;

public class SalaryDisbursementDAOImpl implements SalaryDisbursementDAO {
    @Override
    public Response updateSalaryStatus(List<Integer> idList) {
        try (Session session = HibernateUtil.getSession()) {
            String hql = "FROM EmployeeSalary sd where sd.employee.employeeID in :idList";
            Query query = session.createQuery(hql, EmployeeSalary.class);
            List<EmployeeSalary> resultSet = query.setParameter("idList", idList).getResultList();
            for (int i = 0; i < resultSet.size(); i++) {
                EmployeeSalary salaryDisbursement = resultSet.get(i);
                salaryDisbursement.setPaymentDate(new Date());
                Transaction transaction = session.beginTransaction();
                session.persist(salaryDisbursement);
                transaction.commit();
            }
            return getAllEmployeesForSalary();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return new Response(null, 400);
    }


    @Override
    public boolean addSalaryDisbursement(EmployeeSalary employeeSalary) {
        try (Session session = HibernateUtil.getSession()){
            Transaction transaction = session.beginTransaction();
            session.persist(employeeSalary);
            transaction.commit();
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Response getAllEmployeesForSalary() {
        try(Session session = HibernateUtil.getSession()) {
            String hql = "FROM EmployeeSalary es where es.paymentDate is NULL";
            Query query = session.createQuery(hql, EmployeeSalary.class);
            List<EmployeeSalary> employeeSalaryList = query.getResultList();
            if (employeeSalaryList.size() == 0) {
                return new Response(null, 400);
            }
            List<EmployeeSalaryResponse> employeeSalaryResponseSet = new ArrayList<>();
            for (EmployeeSalary es : employeeSalaryList) {
                Integer empID = es.getEmployee().getEmployeeID();
                hql = "FROM EmployeeSalary es where es.employee.employeeID = " + empID;
                query = session.createQuery(hql, EmployeeSalary.class);
                List<EmployeeSalary> employeeSalariesByID = query.getResultList();
                Double sal = 0.0;
                for (EmployeeSalary employeeSalary: employeeSalariesByID) {
                    sal += employeeSalary.getAmount();
                }
                boolean isPresent = false;
                for (EmployeeSalaryResponse employeeSalaryResponse: employeeSalaryResponseSet) {
                    if (employeeSalaryResponse.getEmployeeID().equals(es.getEmployee().getEmployeeID())) {
                        isPresent = true;
                        break;
                    }
                }
                if (!isPresent)
                    employeeSalaryResponseSet.add(new EmployeeSalaryResponse(es.getSalaryDisbursementID(), es.getEmployee().getEmployeeID(), es.getEmployee().getFirstName() + ((es.getEmployee().getLastName() != null) && (es.getEmployee().getLastName().length() > 0) ? " " + es.getEmployee().getLastName() : "") , sal));
            }
            Collections.sort(employeeSalaryResponseSet, Comparator.comparingInt(employeeSalaryResponse -> employeeSalaryResponse.getEmployeeID()));
            return new Response(employeeSalaryResponseSet, 200);
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return new Response(null, 400);
    }

    @Override
    public Response getEmployeeSalarybyID(Integer id) {
        try (Session session = HibernateUtil.getSession()){
            String hql = "FROM EmployeeSalary e where e.employee.employeeID = " + id;
            Query query = session.createQuery(hql, EmployeeSalary.class);
            List<EmployeeSalary> employeeSalaryList = query.getResultList();
            if (employeeSalaryList.size() == 0)
                return new Response(null, 400);
            return new Response(employeeSalaryList, 200);
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return new Response(null, 400);
    }
}
