/**
 * Get Corresponding Data's
 */

import { call, put, takeLatest } from "redux-saga/effects";
import { GET_EPOD, GET_COMPLETED, GET_EPOD24HRS } from "./constants";
// import { reposLoaded, repoLoadingError } from 'containers/App/actions';
import {
  SET_POD_VERIFIED,
  SET_POD_24HRS,
  SET_TOTAL_TRIPS,
  SET_LOADING,
  SET_CHART_COUNTS,
  SET_TABLE_DATA,
  GET_ETA,
  SET_ETA,
  GET_FILTERS,
  SET_FILTERS,
} from "./constants";
import request from "utils/request";
import { apiURL } from "./services";
/**
 * Get Data handler based on selected mertic one of  iscompleted , podverified , podverifiedDays, ETA
 */
export function* getCompleted(action) {
  console.log(action.payload);
  const values = action.payload;
  // Select username from store
  //   const username = yield select(makeSelectUsername());
  const requestURL = apiURL;
  const options = {
    method: "POST",
    body: JSON.stringify({
      body: values,
    }),
  };
  console.log(options, "options from getcompleted");
  const data = yield call(request, requestURL, options);
  const bodymsg = data.body.bodymsg;
  console.log(data, "data from getcompleted");
  try {
    // Call our request helper (see 'utils/request')

    if (values.type !== "ETA") {
      yield put({
        type: SET_CHART_COUNTS,
        totalTripsCount: bodymsg.chart[0].totaltrip,
        completedCount: bodymsg.chart[0].completedtrip,
        podCount: bodymsg.chart[0].podverified,
        pod24hrsCount: bodymsg.chart[0].podlessthan24hrs,
      });
    }

    yield put({
      type: SET_TABLE_DATA,
      tableData: bodymsg.table,
    });
    yield put({
      type: SET_LOADING,
      loading: false,
    });
  } catch (err) {
    console.log(err);
  }
}

/*
ETA Count API handler
*/

export function* getEta(action) {
  const requestURL = apiURL;
  const options = {
    method: "POST",
    body: JSON.stringify({
      body: {
        type: "ETA",
        metrics: "iscompleted",
        ecode: "9999",
        customer: "All",
        customertype: "All",
        divisioncode: "All",
        filterdate: "MTD",
        sdate: "2020-08-08",
        edate: "2020-08-11",
      },
    }),
  };
  const data = yield call(request, requestURL, options);
  const bodymsg = data.body.bodymsg;
  console.log(data, "data from eta");
  try {
    // Call our request helper (see 'utils/request')

    yield put({
      type: SET_ETA,
      etaCount: bodymsg.etacount,
    });

    yield put({
      type: SET_LOADING,
      loading: false,
    });
  } catch (err) {
    console.log(err);
  }
}

/*
Filter DropDown Data handler
*/

function* getFilters(action) {
  const values = action.payload;
  console.log(action.payload, "from saga filters");
  const requestURL = apiURL;
  const options = {
    method: "POST",
    body: JSON.stringify({
      body: values,
    }),
  };
  const data = yield call(request, requestURL, options);
  // console.log(data, "data of filters");
  const bodymsg = data.body.bodymsg;

  try {
    console.log("trycat", bodymsg.customer);
    yield put({
      type: SET_FILTERS,

      customer: bodymsg.customer,
      customertype: bodymsg.customertype,
      divisioncode: bodymsg.divisioncode,
    });
  } catch (error) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getChartData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_COMPLETED, getCompleted);
  yield takeLatest(GET_FILTERS, getFilters);
  yield takeLatest(GET_ETA, getEta);
}
