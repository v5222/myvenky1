import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectLoginPage = state => state.loginPage || initialState;

const selectRouter = state => state.router;

console.log(selectLoginPage, "loginState");
const makeSelectloggedIn = () =>
  createSelector(
    selectLoginPage,
    loginState => loginState.loggedIn
  );

const makeSelectUserData = () =>
  createSelector(
    selectLoginPage,
    loginState => loginState.userData
  );
const makeSelectloading = () =>
  createSelector(
    selectLoginPage,
    loginState => loginState.loading
  );
const makeSelectOTPstatus = () =>
  createSelector(
    selectLoginPage,
    loginState => loginState.otpStatus
  );
const makeSelectOTPval = () =>
  createSelector(
    selectLoginPage,
    loginState => loginState.otpVal
  );
export {
  makeSelectloggedIn,
  makeSelectUserData,
  makeSelectloading,
  makeSelectOTPstatus,
  makeSelectOTPval
};
