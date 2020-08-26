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
  makeSelectOTPval,
} from "./selector";
import LoginSVg1 from "../../images/SVG/loginSvg1.svg";
import LoginSvg2 from "../../images/SVG/loginSvg2.svg";
import LoginSvg3 from "../../images/SVG/loginSvg3.svg";
import logo from "../../images/TVS-SCS-Logo-Tagline-Color.png";
import UserOutlined from "@ant-design/icons/UserOutlined";
import {
  GET_OTP,
  CHECK_OTP,
  SET_LOADING,
  SET_USER_DATA,
  SET_OTP_STATUS,
  SET_OTP_VAL,
  ADFS_LOGIN,
} from "./constants";
import { SET_LOGIN } from "../App/constants";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { compose } from "redux";
import saga from "./saga";
import reducer from "./reducer";
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
    type: "OTPGEN",
  });
  const [otpval, setOtpval] = useState({
    type: "OTPVAL",
    otp: "",
  });

  const [error, setError] = useState(false);
  useEffect(() => {
    console.log(otpStatus, "from checking");
  }, [otpStatus]);
  const handleChange = (event) => {
    setEcode(event.target.value);
  };
  const handleChangeOtp = (event) => {
    setOtpval({ ...otpval, ["otp"]: event.target.value });
  };
  useEffect(() => {
    if (props.location.search !== "") {
      console.log(props.location.search);
      setLoggedIn();
      localStorage.setItem("loggedIn", true);
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
    <main>
      <div className="tvsit-loginPage_svg">
        <img src={LoginSVg1} alt="svg" className="tvsit-loginPage_svg-1" />
        <img src={LoginSvg2} alt="svg" className="tvsit-loginPage_svg-2" />
        <img src={LoginSvg3} alt="svg" className="tvsit-loginPage_svg-3" />
      </div>
      <div className="tvsit-loginPage_content-wrapper">
        <div className="tvsit-loginPage_content">
          <img src={logo} alt="logo" className="tvsit-loginPage_content-img" />
          <div className="tvsit-loginPage_content-title">SIGN IN</div>
          <Button
            className="tvsit-loginPage_content-btn"
            size="large"
            onClick={checkAdfs}
          >
            Login with ADFS
          </Button>
          <div className="tvsit-loginPage_content-title">OR</div>
          {otpStatus.status === false ? (
            <>
              <Input
                placeholder="Enter your Emplyoee code"
                size="large"
                onChange={(e) => handleChange(e)}
                prefix={<UserOutlined style={{ color: "#00A5E6" }} />}
              />
              <Button
                className="tvsit-loginPage_content-btn"
                style={{ marginTop: "10px" }}
                size="large"
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
              <div className="d-flex justify-between">
                <Input
                  size="large"
                  disabled
                  defaultValue={ecode}
                  style={{ marginRight: "10px" }}
                />
                <Input
                  size="large"
                  placeholder="Enter OTP"
                  style={{ marginRight: "10px" }}
                  onChange={(e) => handleChangeOtp(e)}
                />
                <Button
                  size="large"
                  className="tvsit-loginPage_content-btn"
                  onClick={() => {
                    setLoading(true);
                    verifyOtp({ ...otpval, ["ecode"]: ecode });
                  }}
                  loading={loading}
                >
                  Login
                </Button>
              </div>
            </>
          ) : (
            ""
          )}

          {error && (
            <div style={{ color: "red" }}>Please Enter Emplyoee code</div>
          )}

          {otpStatus.status && (
            <>
              {" "}
              <div
                className="tvsit-login_feedback"
                style={{ fontSize: "14px", color: "black" }}
              >
                {otpStatus.message}
              </div>
              <a
                className="tvsit-loginPage_resend"
                onClick={() => getOtp({ ...otpgen, ["ecode"]: ecode })}
              >
                Resend OTP
              </a>
            </>
          )}
        </div>
        <div className="tvsit-loginPage_copyrights">
          &#169; copy rights reserverd 2020
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectloggedIn(),
  loading: makeSelectloading(),
  otpStatus: makeSelectOTPstatus(),
  otpVal: makeSelectOTPval(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getOtp: (value) => {
      dispatch({
        type: GET_OTP,
        payload: {
          values: value,
        },
      });
    },
    verifyOtp: (value) => {
      dispatch({
        type: CHECK_OTP,
        payload: {
          values: value,
          history: history,
        },
      });
    },
    checkAdfs: () => {
      dispatch({ type: ADFS_LOGIN });
    },
    setLoading: (value) => {
      dispatch({ type: SET_LOADING, loading: value });
    },
    setLoggedIn: () =>
      dispatch({
        type: SET_LOGIN,
        loggedIn: true,
      }),
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
