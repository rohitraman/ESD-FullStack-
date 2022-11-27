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
    const changeEvent = (event, isEmail) => {
        if (isEmail)
            setEmail(event.target.value);
        else {
            setPassword(event.target.value)
        }
    }
    const checkLogin = (email, password) => {
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
        <div className="container">
            <NavBar />
            <div className="mt-5 login-card">
                <Card>
                    <Form className="m-5">
                        <p className="welcome-text">Welcome to Academic Accounts Page. Please enter credentials to login!</p>
                        {error && <Alert variant="danger">Invalid Credentials </Alert>}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event) => changeEvent(event, true)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={(event) => changeEvent(event, false)}/>
                        </Form.Group>
                        <div className="button-center">
                            <Button variant="primary" type="button" size="lg" onClick={(event) => checkLogin(email, password)}>
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