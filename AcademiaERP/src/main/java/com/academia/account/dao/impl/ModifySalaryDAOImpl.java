package com.academia.account.dao.impl;

import com.academia.account.bean.EmployeeSalary;
import com.academia.account.bean.EmployeeSalaryResponse;
import com.academia.account.bean.Response;
import com.academia.account.dao.ModifySalaryDAO;
import com.academia.account.util.HibernateUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.*;

public class ModifySalaryDAOImpl implements ModifySalaryDAO {
    @Override
    public Response updateSalary(Integer employeeID, Object obj) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(objectMapper.writeValueAsString(obj));
            Iterator<String> iterator = jsonNode.fieldNames();
            Map<String, Double> map = new HashMap<>();
            while (iterator.hasNext()) {
                String key = iterator.next();
                map.put(key, jsonNode.get(key).doubleValue());
            }
            try (Session session = HibernateUtil.getSession()) {
                for (String key : map.keySet()) {
                    Transaction transaction = session.beginTransaction();
                    String hql = "update EmployeeSalary es set es.amount = " + map.get(key) + " where es.component = '" + key + "' and es.employee.employeeID = " + employeeID;
                    Query query = session.createQuery(hql);
                    query.executeUpdate();
                    transaction.commit();
                }
                String hql = "FROM EmployeeSalary es where es.employee.employeeID = " + employeeID;
                Query query = session.createQuery(hql, EmployeeSalary.class);
                List<EmployeeSalary> employeeSalaryList = query.getResultList();
                return new Response(employeeSalaryList, 200);
            } catch (HibernateException e) {
                e.printStackTrace();
            }
            return new Response(map, 200);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new Response(null, 400);
    }
    @Override
    public Response getAllEmployeesForSalary(Integer id) {
        try(Session session = HibernateUtil.getSession()) {
            String hql = "FROM EmployeeSalary es";
            Query query = session.createQuery(hql, EmployeeSalary.class);
            List<EmployeeSalary> employeeSalaryList = query.getResultList();
            if (employeeSalaryList.size() == 0) {
                return new Response(null, 400);
            }
            List<EmployeeSalaryResponse> employeeSalaryResponseSet = new ArrayList<>();
            for (EmployeeSalary es : employeeSalaryList) {
                Integer empID = es.getEmployee().getEmployeeID();
                if (id != null && empID.equals(id)) {
                    continue;
                }
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
                    employeeSalaryResponseSet.add(new EmployeeSalaryResponse(es.getSalaryDisbursementID(), es.getEmployee().getEmployeeID(), es.getEmployee().getFirstName(), sal));
            }
            Collections.sort(employeeSalaryResponseSet, Comparator.comparingInt(employeeSalaryResponse -> employeeSalaryResponse.getEmployeeID()));
            return new Response(employeeSalaryResponseSet, 200);
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return new Response(null, 400);
    }
}
