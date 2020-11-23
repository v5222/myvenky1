/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginPage from "containers/LoginPage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import PodDashboard from "containers/PodDashboard/Loadable";
import Einvoice from "containers/Einvoice/Loadable";
import CourierManagement from "containers/CourierManagement/Loadable";
import DwmApplication from "containers/DwmApplication/Loadable";
import DwmUsageReportApplication from "containers/DwmUsageReportApplication/Loadable";
import Transportation from "containers/Transportation/Loadable";
import TransportationMaster from "containers/TransportationMaster/Loadable";
import BarcodeAutomate from "containers/ClAttendance/BarcodeAutomate/Loadable";
import BarcodePrint from "containers/ClAttendance/BarcodePrint/Loadable";
import GlobalStyle from "../../global-styles";
import VehicleTrackingSystem from "containers/VehicleTrackingSystem/Loadable";
import VehicleTrackingSystemDetails from "../VehicleTrackingSystemDetails/Loadable";
import VisibilityInbound from "../VisibilityInbound/Loadable";
import TestPage from "../Testing/TestPage";
import CWB from "containers/CWB/Loadable";
import withAuthProvider from "containers/app/AuthProvider";
import { connect } from "react-redux";
import { makeSelectLogin } from "./selectors";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useClearCache } from "react-clear-cache";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { SET_LOGIN } from "./constants";
import TransportationBilling from "../TransportationBilling/Loadable";
// import "bootstrap/dist/css/bootstrap.min.css";

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
  setLogin,
}) {
  const [authenticated, setAuthenticated] = useState(true);
  let timer;

  useEffect(() => {
    if (loggedIn === true || isAuthenticated === true) {
      setAuthenticated(true);
    }
  }, [loggedIn, isAuthenticated]);

  useEffect(() => {
    if (authenticated) {
      timer = setTimeout(() => {
        // setAuthenticated(false);
        // setLogin(false);
        window.location.reload();
        sessionStorage.clear();
      }, 15 * 60 * 1000);
    }
  }, [authenticated]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  if (!isLatestVersion) {
    emptyCacheStorage();
  }
  //  emptyCacheStorage();
  const queryCache = new QueryCache();
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Helmet titleTemplate="%s - TVS Logistics" defaultTitle="My Applications">
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
              user={user}
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
        {/* <Redirect from="/" to="/poDashboard" /> */}
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
          path="/einvoice"
          render={(props) =>
            authenticated ? (
              <Einvoice {...props} logout={logout} user={user} />
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
        <Route
          exact
          path="/dwmUsageReportApplication"
          render={(props) =>
            authenticated ? (
              <DwmUsageReportApplication
                {...props}
                logout={logout}
                user={user}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/transportation"
          render={(props) =>
            authenticated ? (
              <Transportation {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/trbilling"
          render={(props) =>
            authenticated ? (
              <TransportationBilling {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/transportationmaster"
          render={(props) =>
            authenticated ? (
              <TransportationMaster {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route exact path="/clbarcodeautomate" component={BarcodeAutomate} />
        <Route exact path="/clbarcodeprint" component={BarcodePrint} />
        <Route
          exact
          path="/vehicletrackingsystem"
          render={(props) =>
            authenticated ? (
              <VehicleTrackingSystem {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/vehicletrackingsystem/:id"
          render={(props) =>
            authenticated ? (
              <VehicleTrackingSystemDetails
                {...props}
                logout={logout}
                user={user}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/cwb"
          render={(props) =>
            authenticated ? (
              <CWB {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
         <Route
          exact
          path="/visibilityinbound"
          render={(props) =>
            authenticated ? (
              <VisibilityInbound {...props} logout={logout} user={user} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ReactQueryCacheProvider>
  );
}
const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLogin(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (value) => {
      dispatch({
        type: SET_LOGIN,
        loggedIn: value,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthProvider(App));
