import { useEffect, useState } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../atoms/Navbar";
import SalaryCard from "../atoms/SalaryCard";
import './DisburseSalary.css';

function DisburseSalary() {
    let navigate = useNavigate();
    let loggedInuser = localStorage.getItem("user")
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(true);
    var empIDs = [];
    localStorage.setItem("page", "view");
    const checkedEmpIDs = (id, isChecked) => {
        if (isChecked) {
            empIDs.push(id)
        } else {
            empIDs = empIDs.filter((value) => value !== id)
        }
    }
    const disburseSalary = () => {
        fetch("http://localhost:8080/salary/put", {
            method: 'PUT',
            body: JSON.stringify({
                "idList" : empIDs
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                setEmployees(data.object)
            } else {
                setEmployees([])
            }
            toast.success('Successfully disbursed', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((e) => {
            toast.error('Unable to disburse salary', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }
    useEffect(() => {
        if (!loggedInuser) {
            navigate('/')
        }
    });
    useEffect(() => {
        fetch("http://localhost:8080/salary/getall", {
            method: 'GET'
        }).then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                setEmployees(data.object)
            }
            setSpinner(false)
        }).catch((err) => {
            setError(true)
            setSpinner(false)
        })
    }, []);
    
    const salaryCard = employees.filter((value) => value.employeeID !== JSON.parse(loggedInuser).employeeID).map((value, index) => {
            return <SalaryCard key={value.salaryID} user={value} checkedEmpIDs = {(id, isChecked) => checkedEmpIDs(id, isChecked)}/>        
    });
    if (salaryCard.length === 0) {
        localStorage.removeItem('modifyEmployeeID')
    }
    return (
        <>
            <NavBar />
            <ToastContainer 
                    position="bottom-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"/>
            <div className="container">
                <p className="header-text mt-5">Salary Details</p>
                {spinner && <div className="spinner-style"> 
                        <Spinner animation="border" />
                    </div>}
                {(salaryCard.length === 0 || error) && !spinner && <Alert variant="danger">No records to show</Alert>}
                {salaryCard.length > 0 && !error && 
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    {(salaryCard.length > 0 && !error) && salaryCard}
                </Table>}
                
                {salaryCard.length > 0 && !error && <div className="align-center">
                    <Button variant="danger" className="btn btn-lg mt-3"  onClick={() => disburseSalary()}> 
                        Disburse Salary
                    </Button> 
                </div>}
            </div>
        </>
    )
}

export default DisburseSalary;