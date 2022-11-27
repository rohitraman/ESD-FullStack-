import { useEffect, useState } from "react";
import { Alert, Card, ListGroup } from "react-bootstrap";
import NavBar from "../atoms/Navbar";
import SalaryCard from "../atoms/SalaryCard";
import './ModifyPage.css';
function ModifyPage() {
    localStorage.setItem("page", "modify");
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false);
    let loggedInuser = localStorage.getItem("user")
    useEffect(() => {
        fetch("http://localhost:8080/modify/getall", {
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
        return <SalaryCard key={value.salaryID} user={value}/>        
    });
    if (salaryCard.length === 0) {
        localStorage.removeItem('modifyEmployeeID')
    }
    return (
        <div className="container">
            <NavBar />
            <p className="header-text mt-5" style={{fontSize:'20px'}}>Modify Salary Details</p>
            {(error || salaryCard.length === 0) && <Alert variant="danger">Unable to fetch data</Alert>}
            {salaryCard.length > 0 && !error && <Card className="card-style">
                <Card.Header className="card-header-style">
                    <span style={{flex: "1 1 0px"}}>ID</span>
                    <span style={{flex: "1 1 0px"}}>Name</span>
                    <span style={{flex: "1 1 0px"}}>Salary</span>
                    <span style={{flex: "0.6 1 0px"}}></span>
                </Card.Header>
                <ListGroup>
                    {salaryCard.length > 0 && salaryCard}
                </ListGroup>
            </Card>}
        </div>
    )
}


export default ModifyPage;