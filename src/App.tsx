import React from "react";
import { Router, Link, Switch, Route, Redirect } from "react-router-dom";
import AuthProvider from "auth/AuthProvider";
import PrivateRoute, {LoginRoute} from "auth/PrivateRoute";

import Maps from "pages/Maps/Maps";
import Salary from "pages/Salary/Salary";
import Auth from "pages/Auth/Auth";

import history from "./history/history";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        {/* <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li style={{ paddingRight: "15px" }}>
              <Link to="/login">Auth</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/maps" component={Maps} />
          <LoginRoute path="/login" exact component={Auth} />

          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
function Home() {
  return <Redirect to="/maps" />;
}
export default App;


