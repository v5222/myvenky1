import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectRouter = state => state.router;
const selectGlobal = state => state.global || initialState;
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location
  );
const makeSelectLogin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loggedIn
  );

export { makeSelectLocation, makeSelectLogin };
