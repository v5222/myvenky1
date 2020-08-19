/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect, memo } from "react";
// import { FormattedMessage } from "react-intl";
// import messages from "./messages";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import {
  makeSelectloggedIn,
  makeSelectUserData,
  makeSelectloading,
  makeSelectOTPstatus,
  makeSelectOTPval
} from "./selector";
import {
  GET_OTP,
  CHECK_OTP,
  SET_LOADING,
  SET_USER_DATA,
  SET_OTP_STATUS,
  SET_OTP_VAL,
  ADFS_LOGIN
} from "./constants";
import { SET_LOGIN } from "../App/constants";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { compose } from "redux";
import saga from "./saga";
import reducer from "./reducer";
import Logo from "../../images/TVS-SCS-Logo-Tagline-Color.png";
// import { Link } from "react-router-dom";
import history from "utils/history";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
const key = "loginPage";
function LoginPage({
  getOtp,
  verifyOtp,
  loggedIn,
  loading,
  otpVal,
  otpStatus,
  checkAdfs,
  history,
  setLoading,
  setLoggedIn,
  ...props
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [ecode, setEcode] = useState("");
  const [otpgen, setOtpgen] = useState({
    type: "OTPGEN"
  });
  const [otpval, setOtpval] = useState({
    type: "OTPVAL",
    otp: ""
  });

  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(otpStatus, "from checking");
  }, [otpStatus]);
  const handleChange = event => {
    setEcode(event.target.value);
  };
  const handleChangeOtp = event => {
    setOtpval({ ...otpval, ["otp"]: event.target.value });
  };
  useEffect(() => {
    if (props.location.search !== "") {
      console.log(props.location.search);
      setLoggedIn();
       localStorage.setItem("loggedIn",true)
      history.push("/podDashboard");
    }
  }, []);
  const handleOTPgen = () => {
    setLoading(true);
    if (ecode === "") {
      setError(true);
      setLoading(false);
    } else {
      setError(false);

      getOtp({ ...otpgen, ["ecode"]: ecode });
    }
  };

  return (
    <div className="tvsit-login">
      <main className="tvsit-login_wrapper">
        <img className="tvsit-login_img" src={Logo} />
        <div className="tvsit-login_title">SIGN IN</div>
        <Button
          type="primary"
          block
          className="tvsit-login_adfs"
          size="large"
          onClick={checkAdfs}
        >
          LOGIN WITH ADFS
        </Button>
        <div style={{ fontSize: "18px", margin: "10px 0" }}>OR</div>
        <div className="tvsit-login_input-wrapper">
          {otpStatus.status === false ? (
            <>
              <Input
                size="large"
                placeholder="Enter Employee Code"
                onChange={e => handleChange(e)}
              />
              <Button
                size="large"
                type="primary"
                onClick={handleOTPgen}
                loading={loading}
              >
                Generate OTP
              </Button>
            </>
          ) : (
            ""
          )}

          {otpStatus.status === true ? (
            <>
              <Input size="large" defaultValue={ecode} disabled={true} />
              <Input
                size="large"
                placeholder="Enter OTP"
                onChange={e => handleChangeOtp(e)}
              />
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setLoading(true);
                  verifyOtp({ ...otpval, ["ecode"]: ecode });
                }}
                loading={loading}
              >
                Login
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
        {error && (
          <div style={{ color: "red" }}>Please Enter Emplyoee code</div>
        )}
        {!otpVal.status && <div style={{ color: "red" }}>{otpVal.message}</div>}
        {otpStatus.status && (
          <>
            {" "}
            <div
              className="tvsit-login_feedback"
              style={{ fontSize: "14px", color: "black" }}
            >
              {otpStatus.message}
            </div>
            <a className="tvsit-login_resend" onClick={() => getOtp(otpgen)}>
              Resend
            </a>
          </>
        )}
      </main>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectloggedIn(),
  loading: makeSelectloading(),
  otpStatus: makeSelectOTPstatus(),
  otpVal: makeSelectOTPval()
});

export function mapDispatchToProps(dispatch) {
  return {
    getOtp: value => {
      dispatch({
        type: GET_OTP,
        payload: {
          values: value
        }
      });
    },
    verifyOtp: value => {
      dispatch({
        type: CHECK_OTP,
        payload: {
          values: value,
          history: history
        }
      });
    },
    checkAdfs: () => {
      dispatch({ type: ADFS_LOGIN });
    },
    setLoading: value => {
      dispatch({ type: SET_LOADING, loading: value });
    },
    setLoggedIn: () =>
      dispatch({
        type: SET_LOGIN,
        loggedIn: true
      })
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(LoginPage);
