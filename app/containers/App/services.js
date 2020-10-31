const apiURL =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/epod";
const apiURLCourier =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/courierportal";
const apiURLDwm =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/dwm";
const apiURLEinvoice =
  "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing";


const apiURLTransportation =
  "https://testapi.tvslsl.in/CloudInterface/API/CLI"



//Einvoice url
//https://bgen0op6q9.execute-api.ap-south-1.amazonaws.com/PROD/einvoicing

// https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing

//dwm dev URL
//https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/dwm
//dwm prod URL
// "https://bgen0op6q9.execute-api.ap-south-1.amazonaws.com/PROD/dwm";

const dwmBody = {
  body: {
    type: "DWMDB",
    ecode: "9999",
  },
};

export { apiURL, apiURLCourier, apiURLDwm, apiURLEinvoice, dwmBody };
