import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../atoms/Navbar";
import './ModifyPageForm.css';

function ModifyPageForm() {
    let navigate = useNavigate();
    let loggedInuser = localStorage.getItem("user")
    const [error, setError] = useState(false);
    const [salaryObj, setSalaryObj] = useState([])
    const [validate, setValidate] = useState(false);
    localStorage.setItem("page", "modifyform");
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
        var classList = document.getElementsByClassName(value.component)[0].classList;
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            classList.remove('is-invalid');
            var prevValue = !compObject[value.component] ? 0 : compObject[value.component]
            var actualValue = event.target.value.trim().length === 0 ? 0 : event.target.value;
            compObject[value.component] = parseInt(actualValue);
            grossSalary = grossSalary - parseInt(prevValue) + parseInt(actualValue)
            
            salaryElement.current.value = grossSalary;
            setValidate(false)
        } else {
            setValidate(true);
            classList.add('is-invalid');
        }
    }
    const salaryElements = salaryObj && salaryObj.map((value) => {
        return (
            <Form.Group className = "form-group" key={value.salaryDisbursementID}>
                <Form.Label>{value.component}</Form.Label>
                <Form.Control type="text" defaultValue={value.amount} onChange={(event) => changeEvent(event, value)} className={value.component}/>
                <Form.Control.Feedback type="invalid">
                    Only numbers are allowed
                </Form.Control.Feedback>
            </Form.Group>
        )
    })
    const updateChanges = () => {
        if (validate) {
            return;
        }
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
                    toast.success('Successfully updated', {
                            position: "bottom-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                    });
                }
            })   
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
                <p className="header-text mt-5">Modify Salary Details</p>
                {error && <Alert variant="danger">Unable to fetch data</Alert>}
                {salaryElements.length > 0 && 
                <>
                <Form validated={!validate}>
                    <div className="d-flex mt-4 form-align">
                        {salaryElements}
                        <Form.Group className="form-group">
                            <Form.Label>Gross Salary</Form.Label>
                            <Form.Control type="text" disabled value={grossSalary} ref={salaryElement}/>
                        </Form.Group>
                    </div>
                </Form>
                <div className="header-text mt-3">
                    <Button variant="success" className="btn btn-lg" onClick={() => updateChanges()}>Save</Button>
                </div>
                </>}
            </div>
        </>
    )
}

export default ModifyPageForm;