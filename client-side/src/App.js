import React from "react";
import "./App.css";
import RouterURL from "./Router/RouterURL";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fakeAuth } from "./Router/auth";

function App() {
  return (
      <Router>
        <div>
          {/* <Header /> */}
          <div className="App">
            <RouterURL />
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
  );
}

export default App;