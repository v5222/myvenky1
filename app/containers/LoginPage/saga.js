import {
  GET_OTP,
  CHECK_OTP,
  SET_LOADING,
  SET_USER_DATA,
  SET_OTP_STATUS,
  SET_OTP_VAL,
  ADFS_LOGIN,
} from "./constants";
import { SET_LOGIN } from "containers/App/constants";
import history from "utils/history";
import { apiURL } from "../../containers/App/services";
import request from "utils/request";
import { call, put, takeLatest } from "redux-saga/effects";

export function* OtpValidation(action) {
  const { values } = action.payload;

  const requestURL = apiURL;
  const options = {
    method: "POST",
    body: JSON.stringify({
      body: values,
    }),
  };
  // console.log(options, "options");
  try {
    const data = yield call(request, requestURL, options);
    // console.log(data, "from saga");
    if (values.type === "OTPGEN") {
      if (data.body.statuscode !== 200) {
        yield put({
          type: SET_OTP_STATUS,
          payload: {
            status: false,
            message: data.body.bodymsg,
          },
        });
      } else {
        yield put({
          type: SET_OTP_STATUS,
          payload: {
            status: true,
            message: data.body.bodymsg,
          },
        });
      }
      yield put({
        type: SET_LOADING,
        loading: false,
      });
    }
    if (values.type === "OTPVAL") {
      if (data.body.statuscode !== 200) {
        yield put({
          type: SET_OTP_VAL,
          payload: {
            status: false,
            message: data.body.bodymsg,
          },
        });
      } else {
        yield put({
          type: SET_OTP_VAL,
          payload: {
            status: true,
            message: data.body.bodymsg,
          },
        });
        yield put({
          type: SET_LOGIN,
          loggedIn: true,
        });
        // localStorage.setItem("loggedIn", true);
        history.push("/podDashboard");
      }
    }
    yield put({
      type: SET_LOADING,
      loading: false,
    });
  } catch (error) {
    console.log(error);
  }
}
function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loginWorkflow() {
  var result = "https://adfs.tvslsl.com/adfs/ls/IdpInitiatedSignOn.aspx";
  // sessionStorage.setItem("activelogin", "inProgress");
  window.location = result;
  // var activelogin = sessionStorage.getItem("activelogin");
  // if (activelogin == "inProgress") {
  //   //ADFS login redirect from API Gateway
  //   var samlResponse = getParameterByName("SAMLResponse");
  //   sessionStorage.removeItem("activelogin");
  //   if (samlResponse != null) {
  //     getSamlCredentials(samlResponse.replace(/\s/g, ""));
  //   }
  // } else if (activelogin === null) {
  //   //First page visit. Redirect to ADFS login.
  //   var RPID = encodeURIComponent("urn:amazon:webservices");
  //   var result = "https://adfs.tvslsl.com/adfs/ls/IdpInitiatedSignOn.aspx";
  //   // sessionStorage.setItem("activelogin", "inProgress");
  //   window.location = result;
  // } else {
  //   //Credentials exist, page refresh, etc.
  //   console.log(
  //     "activelogin already exists in session and the value is " + activelogin
  //   );
  // }
}
function* checkAdfs(action) {
  loginWorkflow();
}

export default function* getUserData() {
  yield takeLatest(GET_OTP, OtpValidation);
  yield takeLatest(CHECK_OTP, OtpValidation);
  yield takeLatest(ADFS_LOGIN, checkAdfs);
}
