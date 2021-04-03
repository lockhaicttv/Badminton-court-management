import React from "react";
import "./App.css";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {fakeAuth} from "./Router/auth";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue
} from "recoil";
import {Switch, BrowserRouter} from "react-router-dom";
import CourtManger from "./Component/CourtManager";
import Route from "react-router-dom/es/Route";
import LoginPage from './Component/LoginPage';
import Customer from './Component/Customer'
import AddInfo from "./Component/LoginPage/Register/AddInfo";
import OwnerRoute from "./Router/OwnerRoute";
import CustomerRoute from './Router/CustomerRoute';
import ls from './Utils/localStorage';
function App() {
    return (
        <RecoilRoot>
            <div className="">
                <Router>
                    <Switch>
                        <Route path='/add-info' component={AddInfo}/>
                        <Route path='/customer' component={Customer}/>
                        <Route path='/login-page' component={LoginPage}/>
                        <OwnerRoute path="/" component={CourtManger}/>
                    </Switch>
                </Router>
            </div>
        </RecoilRoot>
    );
}

export default App;