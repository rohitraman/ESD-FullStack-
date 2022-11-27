import './App.css';
import { createBrowserRouter,  Navigate,  RouterProvider } from 'react-router-dom';
import ModifyPage from './components/ModifyPage';
import Login from './components/Login';
import ModifyPageForm from './components/ModifyPageForm';
import DisburseSalary from './components/DisburseSalary';

function App(props) {
    const router = createBrowserRouter([
      {
        path:"/",
        element: (
            <Login/>
          )
        }, {
          path : "/login",
          element :(
            <Navigate to="/" replace={true}/>
          )
      }, {
        path: "/modify",
        element : (
            <ModifyPage /> 
        )
      }, {
        path : "/disbursesalary",
        element : (
            <DisburseSalary/> 
        )
    
      }, {
        path: "/modifyform",
        element: (
          <ModifyPageForm />
        )
      }
    ]);
    props.renderRoot(<RouterProvider router={router} />)
}


export default App;
