const apiURL =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/epod";
const apiURLCourier =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/courierportal";
const apiURLDwm =
  "https://bgen0op6q9.execute-api.ap-south-1.amazonaws.com/PROD/dwm";

const dwmBody = {
  body: {
    type: "DWMDB",
    ecode: "9999",
  },
};

export { apiURL, apiURLCourier, apiURLDwm, dwmBody };
