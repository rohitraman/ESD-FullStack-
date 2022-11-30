import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './NavBar.css';
function NavBar() {
    let user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    let page = localStorage.getItem("page")
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("page");
        localStorage.removeItem("modifyEmployeeID");
        navigate('/');
    }
    const redirectPage = (currentPage) => {
        if (currentPage === 'disburse') {
            navigate('/disbursesalary')
        } else {
            navigate('/modify')
        }
    }
    return (
        <Navbar className="nav-style">
            <Navbar.Brand className="navbar-brand" onClick={() => navigate('/')}>Academia ERP</Navbar.Brand>
            {user && 
            <>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                {(page === "modify" || page === "modifyform") && <Nav.Link className="nav-link-style" onClick={() => redirectPage("disburse")}>Disburse Salary</Nav.Link>}
                {(page === "view" || page === "modifyform") && <Nav.Link className="nav-link-style" onClick={() => redirectPage("modify")}>Modify</Nav.Link>}
                <NavDropdown title={(user !== undefined && user !== null ? user.firstName : '')}>
                    <NavDropdown.Item onClick={() => logout()} className="nav-item-style">
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