/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginPage from "containers/LoginPage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import PodDashboard from "containers/PodDashboard/Loadable";
import CourierManagement from "containers/CourierManagement/Loadable";
import GlobalStyle from "../../global-styles";
import TestPage from "../Testing/TestPage";

// import
// const checkLogin = ()=>{

// }
export default function App({ history }) {
  return (
    <div>
      <Helmet titleTemplate="%s - TVS Logistics" defaultTitle="EPOD Dashboard">
        <meta name="description" content="TVS Logistics React Applications" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/podDashboard" component={PodDashboard} />
        <Route exact path="/test" component={TestPage} />
        <Route exact path="/courierManagement" component={CourierManagement} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
