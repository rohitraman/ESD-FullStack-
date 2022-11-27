import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './NavBar.css';
function NavBar() {
    let user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    let page = localStorage.getItem("page")
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("page")
        localStorage.removeItem("modifyEmployeeID");
        navigate('/');
    }
    const redirectPage = () => {
        if (page === 'modify') {
            navigate('/disbursesalary')
        } else {
            navigate('/modify')
        }
    }
    return (
        <Navbar>
            <Navbar.Brand onClick={() => navigate('/')} style={{paddingLeft:'2%', cursor: 'pointer'}}>Academia ERP</Navbar.Brand>
            {user && 
            <>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link className="nav-link-style" onClick={() => redirectPage()}>{page === 'modify' ? 'Disburse Salary' : 'Modify'}</Nav.Link>
                <NavDropdown title={(user !== undefined && user !== null ? user.firstName : '')} >
                    <NavDropdown.Item onClick={() => logout()}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
                </Navbar.Collapse>
            </>
        }
        </Navbar>
    )
}

export default NavBar;