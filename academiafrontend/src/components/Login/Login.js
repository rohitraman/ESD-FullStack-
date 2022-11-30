import { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../atoms/Navbar";
import './Login.css';
function Login(props) {
    let navigate = useNavigate();
    let loggedInuser = localStorage.getItem("user");
    useEffect(() => {
        if (loggedInuser) {
            navigate('/disbursesalary')
        }
    })
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [pageLoad, setPageLoad] = useState(true);
    const changeEvent = (event, isEmail) => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (isEmail) {
            if (emailRegex.test(event.target.value)) {
                setEmail(event.target.value);
                setInvalidEmail(false);
            } else {
                setInvalidEmail(true);
            }
        } else {
            if (event.target.value.length > 0) {
                setInvalidPassword(false);
                setPassword(event.target.value)
            }
            else {
                setInvalidPassword(true);
            }
        }
        setPageLoad(false);
    }
    const checkLogin = (event, email, password) => {
        if (email.length === 0 && password.length === 0) {
            setInvalidPassword(true);
            setInvalidEmail(true);
            return;
        }
        if (email.length === 0) {
            setInvalidEmail(true);
            return;
        }
        if (password.length === 0) {
            setInvalidPassword(true);
            return;
        }
        if (invalidEmail || invalidPassword) {
            return;
        }
        fetch("http://localhost:8080/login", 
           {
               body : JSON.stringify({
                "employee" : {
                    "emailID" : email
                },
               "password" : password
            },), 
            method: "POST",            
            headers: {
               'Content-Type': 'application/json'
           }}).then((response) => response.json())
           .then((data) => {
               if (data.status === 200) {
                   localStorage.setItem("user", JSON.stringify(data.object))
                   navigate('/disbursesalary');
               } else {
                   setError(true);
               }
           }).catch((err) => {
                setError(true);
           });
    }

    return (
        <>
        <NavBar />
        <div className="container">
            <div className="mt-5 login-card">
                <Card>
                    <Form className="m-5" validated={!pageLoad && (!invalidEmail && !invalidPassword)}>
                        <p>{!pageLoad && (!invalidEmail || !invalidPassword)}</p>
                        <p className="welcome-text">Welcome to Academic Accounts Page. Please enter credentials to login!</p>
                        {error && <Alert variant="danger">Invalid Credentials </Alert>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event) => changeEvent(event, true)} isInvalid={invalidEmail} required={!pageLoad}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid Email ID
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(event) => changeEvent(event, false)} isInvalid={invalidPassword} required={!pageLoad}/>
                            <Form.Control.Feedback type="invalid">
                                Empty Input for Password
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="button-center">
                            <Button variant="primary" type="button" size="lg" onClick={(event) => checkLogin(event, email, password)}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Login;