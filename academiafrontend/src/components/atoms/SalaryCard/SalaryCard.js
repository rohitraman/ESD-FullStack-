import { Button } from "react-bootstrap";
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
        <tbody>
            <tr>
                {page === 'view' && <td colSpan={1}>{<input type="checkbox" onClick={(event) => checkedEmployeeIDs(event, props.user.employeeID)}/> }</td>}
                <td colSpan={1}>{props.user.employeeID}</td>
                <td colSpan={1}>{props.user.name}</td>
                <td colSpan={1}>{props.user.salary}</td>
                {page === 'modify' && <td colSpan={1}>{<Button variant="success" onClick={() => modifyPage()}>Modify Salary Details</Button>}</td>}
            </tr>
        </tbody>
    )
}

export default SalaryCard;