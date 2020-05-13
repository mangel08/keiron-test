import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { authServices } from "./services/";

import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import LayoutContainer from "./components/Layout";

const AppRouter = ({ history }) => {
  const verifyRoute = (Component) => {
    return authServices.isLoggedIn() ? <Component /> : <Redirect to="/login" />;
  };

  const verifyHome = (Component) => {
    return authServices.isLoggedIn() ? <Redirect to="/home" /> : <Component />;
  };

  return (
    <Router history={history}>
      <LayoutContainer>
        <Switch>
          <Redirect to="/login" exact path="/" render={() => verifyHome(Login)} />
          <Route exact path="/login" component={Login} render={() => verifyHome(Login)} />
          <Route exact path="/register" component={Register} render={() => verifyHome(Login)} />
          <Route exact path="/home" render={() => verifyRoute(Home)} />
        </Switch>
      </LayoutContainer>
    </Router>
  );
};

export default AppRouter;
