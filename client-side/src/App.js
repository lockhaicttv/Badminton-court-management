import React from "react";
import "./App.css";
import RouterURL from "./Router/RouterURL";
import {BrowserRouter as Router} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {fakeAuth} from "./Router/auth";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue
} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <div>
                    <div className="App">
                        <RouterURL/>
                    </div>
                </div>
            </Router>
        </RecoilRoot>
    );
}

export default App;