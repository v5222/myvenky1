import produce from "immer";
import { SET_LOGIN } from "./constants";
let login = localStorage.getItem("loggedIn")
export const initialState = {
  loggedIn: login?true:false
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGIN:
        draft.loggedIn = action.loggedIn;
        break;
    }
  });

export default appReducer;
