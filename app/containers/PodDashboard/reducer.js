import produce from "immer";
import {
  SET_COMPLETED_TRIPS,
  SET_POD_VERIFIED,
  SET_POD_24HRS,
  SET_TABLE_DATA,
  SET_SELECTED,
  SET_LOADING,
  SET_CHART_COUNTS,
  SET_ETA,
  SET_FILTERS,
} from "./constants";

// The initial state of the PodDashboard
export const initialState = {
  totalTripsCount: "",
  completedCount: "",
  tableData: [],
  podCount: "",
  pod24hrsCount: "",
  etaCount: "",
  selected: "iscompleted",
  loading: false,
  customer: [],
  customertype: [],
  divisioncode: [],
};

/* eslint-disable default-case, no-param-reassign */
const podReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CHART_COUNTS:
        draft.totalTripsCount = action.totalTripsCount;

        draft.completedCount = action.completedCount;
        draft.podCount = action.podCount;
        draft.pod24hrsCount = action.pod24hrsCount;

        break;
      case SET_TABLE_DATA:
        draft.tableData = [...action.tableData];
        break;
      case SET_ETA:
        draft.etaCount = action.etaCount;
        break;
      case SET_SELECTED:
        draft.selected = action.selected;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
      // case SET_FILTERS:
      //   return {
      //     ...state,
      //     customer: action.customer,
      //     customertype: action.customertype,
      //     divisioncode: action.divisioncode,
      //   };
    }
  });

export default podReducer;
