import produce from "immer";
import {
  SET_LOGIN,
  SET_USER_DATA,
  SET_LOADING,
  SET_OTP_STATUS,
  SET_OTP_VAL
} from "./constants";

// The initial state of the App
export const initialState = {
  loading: false,
  // loggedIn: false,
  userData: [],
  otpStatus: {
    status: false,
    message: ""
  },
  otpVal: {
    status: false,
    message: ""
  }
};

/* eslint-disable default-case, no-param-reassign */
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    case SET_LOADING:
      // draft.loading = action.loading;
      return {
        ...state,
        loading: action.loading
      };
    case SET_OTP_STATUS:
      return {
        ...state,

        otpStatus: {
          status: action.payload.status,
          message: action.payload.message
        }
      };
    // draft.otpStatus = {
    //   status: action.payload.status,
    //   message: action.payload.message
    // };
    case SET_OTP_VAL:
      return {
        ...state,
        otpVal: {
          status: action.payload.status,
          message: action.payload.message
        }
      };
    // draft.otpVal.status = action.payload.status;
    // draft.otpVal.message = action.payload.message;
    default:
      return state;
  }
};

export default LoginReducer;
