import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { SolarSystemLoading } from 'react-loadingg';
// import 'react-notifications/lib/notifications.css';
import Swal from 'sweetalert2';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

class BarcodeAutomate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodeText: "",
      flag: false,
      loader: false,
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        document.getElementById("hdnLatt").value = position.coords.latitude;
        document.getElementById("hdnLong").value = position.coords.longitude;
      });
    }
    else {
      console.log("Not Available");
    }
  }

  bindBarcodeDetails = () => {
    
    var latt = document.getElementById("hdnLatt").value;
    var long = document.getElementById("hdnLong").value;
    if (this.state.flag === true) {
      if (this.state.barcodeText !== "" && this.state.barcodeText !== null) {
        this.setState({
          flag: false,
          loader: true,
        });
        let barCodeVal = this.state.barcodeText;
        this.setState({
          barcodeText: "",
        });
        var oData = {
          "body": {
            "type": "BARCODESCAN1",
            "Latitude": latt,
            "Longitude": long,
            "barcodeno": barCodeVal,
            "ecode": "058643"
          }
        }
        console.log(oData);
        fetch("https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/cl-attendance", {
          method: 'post',
          body: JSON.stringify(oData)
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result.body.statuscode === 200) {
                var BarCodeVal = result.body.bodymsg[0].barcode;
                var EmpNameVal = result.body.bodymsg[0].empname;
                var DepartmVal = result.body.bodymsg[0].department;
                var ScanDteVal = result.body.bodymsg[0].date;
                var ScanTmeVal = result.body.bodymsg[0].time;
                var str = "";
                str += "<div class='col-md-3' style='width:25%;float:left;'>";
                str += "<div>";
                str += "<div class='col-md-6' style='width:50%;float:left;'>";
                str += "<table>";
                str += "<tr>";
                str += "<td style='width:40%;text-align:left;'>Barcode</td>";
                str += "<td style='width:10%;'>:</td>";
                str += "<td style='width:50%;text-align:left;'>" + BarCodeVal + "</td>";
                str += "</tr>";
                str += "<tr>";
                str += "<td style='width:30%;text-align:left;'>Emp Name</td>";
                str += "<td style='width:10%;'>:</td>";
                str += "<td style='width:50%;text-align:left;'>" + EmpNameVal + "</td>";
                str += "</tr>";
                str += "<tr>";
                str += "<td style='width:30%;text-align:left;'>Department</td>";
                str += "<td style='width:10%;'>:</td>";
                str += "<td style='width:50%;text-align:left;'>" + DepartmVal + "</td>";
                str += "</tr>";
                str += "<tr>";
                str += "<td style='width:30%;text-align:left;'>Date</td>";
                str += "<td style='width:10%;'>:</td>";
                str += "<td style='width:50%;text-align:left;'>" + ScanDteVal + "</td>";
                str += "</tr>";
                str += "<tr>";
                str += "<td style='width:30%;text-align:left;'>Time</td>";
                str += "<td style='width:10%;'>:</td>";
                str += "<td style='width:50%;text-align:left;'>" + ScanTmeVal + "</td>";
                str += "</tr>";
                str += "</table>";
                str += "<div>";
                str += "<div class='col-md-3' style='width:25%;float:left;'>";
                str += "<div>";
                Swal.fire({
                  title: 'Success',
                  html: str,
                  icon: 'success',
                  showCancelButton: false,
                  confirmButtonText: 'Ok!',
                  timer: 3000,
                  timerProgressBar: true,
                  onClose: () => {
                    this.setState({
                      loader: false,
                    });
                  }
                }).then((result) => {
                  if (result.value) {
                    this.setState({
                      loader: false,
                    });
                  }
                  else if (result.dismiss === Swal.DismissReason.cancel) {
                    this.setState({
                      loader: false,
                    });
                  }
                })
                // this.setState({
                //   loader: false,
                // });

              }
              else if (result.body.statuscode === 201) {
                Swal.fire({
                  title: 'Info',
                  text: result.body.bodymsg,
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Ok!',
                  timer: 3000,
                  timerProgressBar: true,
                  onClose: () => {
                    this.setState({
                      loader: false,
                    });
                  }
                }).then((result) => {
                  if (result.value) {
                    this.setState({
                      loader: false,
                    });
                  }
                  else if (result.dismiss === Swal.DismissReason.cancel) {
                    this.setState({
                      loader: false,
                    });
                  }
                })


              }
              else{
                Swal.fire({
                  title: 'Info',
                  text: result.body.bodymsg,
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Ok!',
                  timer: 3000,
                  timerProgressBar: true,
                  onClose: () => {
                    this.setState({
                      loader: false,
                    });
                  }
                }).then((result) => {
                  if (result.value) {
                    this.setState({
                      loader: false,
                    });
                  }
                  else if (result.dismiss === Swal.DismissReason.cancel) {
                    this.setState({
                      loader: false,
                    });
                  }
                })
              }
              console.log(result);
            },
            (error) => {
              console.log(error);
            }
          )
      }
      else {

      }
    }
  }
  
  render() {
    return (
      <div className="animated fadeIn text-center mt-1">
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card>
              <CardHeader>
                Attendance
              </CardHeader>
              <CardBody>
                <form action="">
                  {this.state.loader === true ?
                    <div className="row" id="divLoader" style={{ margin: '0 auto' }}>
                      <div className="col-md-12 col-sm-12 col-xs-12" style={{ zIndex: '9999', top: '100px' }}>
                        <SolarSystemLoading />
                      </div>
                    </div>
                    :
                    <div className="row d-flex justify-content-center">
                      <input type="hidden" id="hdnLatt" value="" />
                      <input type="hidden" id="hdnLong" value="" />
                      <button id="btnGeo" type="button" onClick={this.bindBarcodeDetails} style={{ display: "none" }}></button>

                      <>

                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                          <BarcodeScannerComponent
                            width={370}
                            height={370}
                            onUpdate={(err, result) => {
                              if (result) {
                                if (result.text !== "") {
                                  this.state = {
                                    barcodeText: result.text,
                                    flag: true,
                                    loader: true,
                                  };
                                  document.getElementById('btnGeo').click();
                                }
                              }
                              else {
                                this.state = {
                                  barcodeText: "",
                                  flag: false,
                                  loader: false,
                                };
                              }
                            }}
                          />
                        </div>
                       
                      </>

                    </div>

                  }
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BarcodeAutomate;