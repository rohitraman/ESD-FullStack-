import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/Navbar";
import './ModifyPageForm.css'

function ModifyPageForm() {
    let navigate = useNavigate();
    let loggedInuser = localStorage.getItem("user")
    const [error, setError] = useState(false);
    const [salaryObj, setSalaryObj] = useState([])
    const [show, setShow] = useState(false)
    var grossSalary = 0;
    var compObject = {};
    useEffect(() => {
        if (!loggedInuser) {
            navigate('/')
        }
    })
    useEffect(() => {
        var id = localStorage.getItem("modifyEmployeeID");
        if (id == null) {
            setError(true)
            return;
        }
        fetch("http://localhost:8080/salary/getByID/" + id, {
            method: 'GET'
        }).then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                setSalaryObj(data.object);
            } else {
                setError(true)
            }
        }).catch((err) => {
            setError(true)
        })
    }, []);

    salaryObj && salaryObj.forEach((value, i) => {
        grossSalary = grossSalary + value.amount;
        compObject[value.component] = value.amount;
    })
    var salaryElement = useRef();
    const changeEvent = (event, value) => {
        var prevValue = !compObject[value.component] ? 0 : compObject[value.component]
        var actualValue = event.target.value.trim().length === 0 ? 0 : event.target.value;
        compObject[value.component] = parseInt(actualValue);
        grossSalary = grossSalary - parseInt(prevValue) + parseInt(actualValue)

        salaryElement.current.value = grossSalary;
    }
    const salaryElements = salaryObj && salaryObj.map((value, i) => {
        return (
            <Form.Group key={value.salaryDisbursementID}>
                <Form.Label>{value.component}</Form.Label>
                <Form.Control type="text" defaultValue={value.amount} onChange={(event) => changeEvent(event, value)}  className={value.component}/>
            </Form.Group>
        )
    })
    const updateChanges = () => {
        fetch("http://localhost:8080/modify/getByID/" + localStorage.getItem("modifyEmployeeID"), {
                body: JSON.stringify(compObject),
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setSalaryObj(data.object);
                    setShow(true);
                }
            })   
    }

    return (
        <div className="container">
            <NavBar />
            <p className="header-text mt-5" style={{fontSize:'20px'}}>Modify Salary Details</p>
            {error && <Alert variant="danger">Unable to fetch data</Alert>}
            {salaryElements.length > 0 && 
            <>
            <Form>
                <div className="d-flex mt-4 form-align">
                    {salaryElements}
                    <Form.Group>
                        <Form.Label>Gross Salary</Form.Label>
                        <Form.Control type="text" disabled value={grossSalary} ref={salaryElement}/>
                    </Form.Group>
                </div>
            </Form>
            <div className="header-text mt-3">
                <Button variant="success" className="btn btn-lg" onClick={() => updateChanges()}>Save</Button>
            </div>
            </>}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    <p className="mt-3">Successfully Saved</p>
                    <div style={{textAlign:'center'}}>
                        <Button variant="success" onClick={() => {
                            setShow(false)
                            navigate('/modify')
                        }}>
                            OK
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModifyPageForm;