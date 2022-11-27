import { Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './SalaryCard.css';

function SalaryCard(props) {
    let navigate = useNavigate();
    let page = localStorage.getItem("page")
    const modifyPage = () => {
        navigate('/modifyform');
        localStorage.setItem("modifyEmployeeID", props.user.employeeID);
    }
    const checkedEmployeeIDs = (event, empID) => {
        props.checkedEmpIDs(empID, event.target.checked)
    }
    return (
        <ListGroup.Item className="card-salary-style">
        {/* <Card className="card-style" style={{boxShadow: 'gainsboro 0px 0px 3px 3px', marginTop: '1%'}}> */}
            <div className="d-flex card-body">
                {page === 'view' && <input type="checkbox" onClick={(event) => checkedEmployeeIDs(event, props.user.employeeID)}/> }
                <span>{props.user.employeeID}</span>
                <span>{props.user.name}</span>
                <span>{props.user.salary}</span>
                {page === 'modify' && <Button variant="success" onClick={() => modifyPage()}>Modify Salary Details</Button>}
            </div>
        </ListGroup.Item>
    )
}

export default SalaryCard;