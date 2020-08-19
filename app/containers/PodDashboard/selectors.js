import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectPodDashboard = state => state.podDashboard || initialState;

const selectRouter = state => state.router;

console.log(selectPodDashboard, "podState");
const makeSelecttotalTripsCount = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.totalTripsCount
  );

const makeSelectcompletedCount = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.completedCount
  );

const makeSelectcompletedData = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.completedData
  );

const makeSelectpodCount = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.podCount
  );

const makeSelectpodData = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.podData
  );
const makeSelectpod24hrsCount = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.pod24hrsCount
  );
const makeSelectpod24hrsData = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.pod24hrsData
  );
const makeSelectselected = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.selected
  );
const makeSelectloading = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.loading
  );
const makeSelectTableData = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.tableData
  );
const makeSelectEta = () =>
  createSelector(
    selectPodDashboard,
    podState => podState.etaCount
  );

export {
  makeSelecttotalTripsCount,
  makeSelectcompletedCount,
  makeSelectcompletedData,
  makeSelectpodCount,
  makeSelectpodData,
  makeSelectpod24hrsCount,
  makeSelectpod24hrsData,
  makeSelectselected,
  makeSelectloading,
  makeSelectTableData,
  makeSelectEta
};
