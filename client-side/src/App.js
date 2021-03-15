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
import {Switch} from "react-router-dom";
import CourtManger from "./Component/CourtManager";
import Route from "react-router-dom/es/Route";
import LoginPage from './Component/LoginPage'
function App() {
    return (
        <RecoilRoot>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path='/login-page' component={LoginPage} />
                        <Route path="/" component={CourtManger}/>
                    </Switch>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;