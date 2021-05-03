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
import {Route} from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import Customer from './Component/Customer'
import AddInfo from "./Component/LoginPage/Register/AddInfo";
import OwnerRoute from "./Router/OwnerRoute";
import LoginRoute from "./Router/LoginRoute";
import HomePage from "./Component/Customer/HomePage";
import OwnerStore from "./Component/Customer/OwnerStore";
import ProductDetails from "./Component/Customer/Product-Details";
import Chat from './Component/Customer/Chat'
import Admin from "./Component/Admin";

function App() {
    return (
        <RecoilRoot>
            <div className="">
                <Router>
                    <Switch>
                        <Route path='/chat' component={Chat}/>
                        <Route path='/add-info' component={AddInfo}/>
                        <Route path='/admin' component={Admin} />
                        <Route path='/customer' component={Customer}/>
                        <LoginRoute path='/login-page' component={LoginPage}/>
                        <OwnerRoute path="/" component={CourtManger}/>
                    </Switch>
                </Router>
            </div>
        </RecoilRoot>
    );
}

export default App;