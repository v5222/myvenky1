const apiURL =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/epod";
const apiURLCourier =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/courierportal";
const apiURLDwm =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/dwm";

const dwmBody = {
  body: {
    type: "DWMDB",
    ecode: "9999",
  },
};

export { apiURL, apiURLCourier, apiURLDwm, dwmBody };
