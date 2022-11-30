import { useEffect, useState } from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/Navbar";
import SalaryCard from "../atoms/SalaryCard";
import './ModifyPage.css';
function ModifyPage() {
    const navigate = useNavigate();
    localStorage.setItem("page", "modify");
    const [employees, setEmployees] = useState([])
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(true);
    let loggedInuser = localStorage.getItem("user")
    useEffect(() => {
        if (!loggedInuser) {
            navigate('/')
        }
    })
    useEffect(() => {
        fetch(`http://localhost:8080/modify/getall/${JSON.parse(loggedInuser).employeeID}`, {
            method: 'GET'
        }).then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                setEmployees(data.object)
            }
            setSpinner(false);
        }).catch((err) => {
            setError(true)
            setSpinner(false)
        })
    }, [loggedInuser]);
    const salaryCard = employees.map((value) => {
        return <SalaryCard key={value.salaryID} user={value}/>        
    });
    if (salaryCard.length === 0) {
        localStorage.removeItem('modifyEmployeeID')
    }
    return (
        <>
            <NavBar />
            <div className="container">
                <p className="header-text mt-5">Modify Salary Details</p>
                {spinner && <div className="spinner-style">
                    <Spinner animation="border" />
                </div>}
                {(error || salaryCard.length === 0) && !spinner && <Alert variant="danger">Unable to fetch data</Alert>}
                {salaryCard.length > 0 && !error && <Table bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th></th>
                        </tr>
                    </thead>
                    {salaryCard.length > 0 && salaryCard}
                </Table>}
            </div>
        </>
    )
}


export default ModifyPage;