import produce from "immer";
import { SET_LOGIN } from "./constants";
// let login = localStorage.getItem("loggedIn")
export const initialState = {
  loggedIn: false,
  userRole :[],
  otpLogIn:false
};

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.loggedIn = action.loggedIn;
        draft.userRole  = action.userRole;
        draft.otpLogIn = action.otpLogIn
        break;
    }
  });

export default appReducer;
