import { useEffect, useState } from "react";
import { Alert, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/Navbar";
import SalaryCard from "../atoms/SalaryCard";
import './DisburseSalary.css';

function DisburseSalary() {
    let navigate = useNavigate();
    let loggedInuser = localStorage.getItem("user")
    const [show, setShow] = useState(false)
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false);
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
                setShow(true);
                setEmployees(data.object)
            } else {
                setShow(true)
                setEmployees([])
            }
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
        }).catch((err) => {
            setError(true)
        })
    }, []);
    
    const salaryCard = employees.filter((value, index) => value.employeeID !== JSON.parse(loggedInuser).employeeID).map((value, index) => {
            return <SalaryCard key={value.salaryID} user={value} checkedEmpIDs = {(id, isChecked) => checkedEmpIDs(id, isChecked)}/>        
    });
    if (salaryCard.length === 0) {
        localStorage.removeItem('modifyEmployeeID')
    }
    return (
        <div className="container">
            <NavBar />

            <p className="header-text mt-5" style={{fontSize:'20px'}}>Salary Details</p> 
            {(salaryCard.length === 0 || error) && <Alert variant="danger">No records to show</Alert>}
            {salaryCard.length > 0 && <Card style={{boxShadow: 'gainsboro 0px 0px 3px 3px', marginTop: '1%'}}>
                <Card.Header className="card-header-style">
                    <span></span>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Salary</span>
                </Card.Header>
                <ListGroup>
                    {(salaryCard.length > 0 && !error) && salaryCard}
                </ListGroup>
            </Card>}
            
            {salaryCard.length > 0 && !error && <div style={{textAlign:'center'}}>
                <Button variant="danger" className="btn btn-lg mt-3"  onClick={() => disburseSalary()}> 
                    Disburse Salary
                </Button> 
            </div>}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <p className="mt-3">Successfully Saved</p>
                    <div style={{textAlign:'center'}}>
                        <Button variant="success"  onClick={() => {
                            setShow(false)
                        }}>
                            OK
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}

export default DisburseSalary;