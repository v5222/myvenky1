/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginPage from "containers/LoginPage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import PodDashboard from "containers/PodDashboard/Loadable";
import CourierManagement from "containers/CourierManagement/Loadable";
import DwmApplication from "containers/DwmApplication/Loadable";
import GlobalStyle from "../../global-styles";
import TestPage from "../Testing/TestPage";
import withAuthProvider from "containers/app/AuthProvider";
import { connect } from "react-redux";
import { makeSelectLogin } from "./selectors";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

// import
// const checkLogin = ()=>{

// }
function App({
  history,
  login,
  isAuthenticated,
  logout,
  user,
  getAccessToken,
  getUserProfile,
  loggedIn,
}) {
  let authenticated = true;
  // if (loggedIn === true || isAuthenticated === true) {
  //   authenticated = true;
  // }
  return (
    <div>
      <Helmet titleTemplate="%s - TVS Logistics" defaultTitle="EPOD Dashboard">
        <meta name="description" content="TVS Logistics React Applications" />
      </Helmet>

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <LoginPage
              {...props}
              login={login}
              logout={logout}
              isAuthenticated={isAuthenticated}
              // getAccessToken={getAccessToken}
            />
          )}
        />
        <Route
          exact
          path="/podDashboard"
          render={(props) =>
            authenticated ? (
              <PodDashboard
                {...props}
                logout={logout}
                login={login}
                isAuthenticated={isAuthenticated}
                user={user}
                getAccessToken={getAccessToken}
                getUserProfile={getUserProfile}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route exact path="/test" component={TestPage} />
        <Route
          exact
          path="/courierManagement"
          render={(props) =>
            authenticated ? (
              <CourierManagement {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/dwmApplication"
          render={(props) =>
            authenticated ? (
              <DwmApplication {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLogin(),
});

export default connect(mapStateToProps)(withAuthProvider(App));
