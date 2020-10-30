import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { SolarSystemLoading } from 'react-loadingg';
// import 'react-notifications/lib/notifications.css';
// import '../../../assets/css/grnprint.css';
import Swal from 'sweetalert2';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";


class BarcodeManual extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      ApbarcodeText: "",
      Apflag: false,
      Aploader: false,
      Apiptext: "",
    };
  }

  componentDidMount() {

  }

  bindBarcodeDetailss = () => {
    let barcodeText = "";
    if (this.state.Apflag === true) {
      if (this.state.ApbarcodeText !== "" && this.state.ApbarcodeText !== null) {
        this.setState({
          Apflag: false,
          Aploader: true,
        });
        barcodeText = this.state.ApbarcodeText;
        fetch("https://api.ipify.org/?format=json", {
          method: 'get',
        })
          .then(res => res.json())
          .then(
            (results) => {
              console.log(results.ip);
              this.setState({
                Apiptext: results.ip,
                ApbarcodeText: barcodeText
              });
              this.bindBarCodeApi();
            },
            (error) => {
              console.log(error);
            }
          )
      }
      else {
        this.setState({
          loader: false,
        });
      }
    }
  }

  bindBarCodeApi = () => {
    let barcodeText = "";
    barcodeText = this.state.ApbarcodeText;
    this.setState({
      Apflag: false,
      Aploader: true,
    });
    let barCodeVal = barcodeText;
    let ipaddrtext = this.state.Apiptext;
    if (barCodeVal !== "") {
      this.setState({
        barcodeText: "",
      });
      var oData = {
        "body": {
          "type": "INSERTIP",
          "ipaddress": ipaddrtext,
          "barcode": barCodeVal,
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
            console.log(result);
            if (result.body.statuscode === 200) {
              Swal.fire({
                title: 'Success',
                html: "",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                timer: 3000,
                timerProgressBar: true,
                onClose: () => {
                  this.setState({
                    Aploader: false,
                  });
                }
              }).then((result) => {
                if (result.value) {
                  this.setState({
                    Aploader: false,
                  });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.setState({
                    Aploader: false,
                  });
                }
              })
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
                    Aploader: false,
                  });
                }
              }).then((result) => {
                if (result.value) {
                  this.setState({
                    Aploader: false,
                  });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.setState({
                    Aploader: false,
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
                    Aploader: false,
                  });
                }
              }).then((result) => {
                if (result.value) {
                  this.setState({
                    Aploader: false,
                  });
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.setState({
                    Aploader: false,
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

  render() {
    return (
      <div className="animated fadeIn text-center mt-1">
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card>
              <CardHeader>
                Card Issue
              </CardHeader>
              <CardBody>
                <form action="">
                {this.state.Aploader === true ?
                  <div className="row" id="divLoader" style={{ margin: '0 auto' }}>
                  <div className="col-md-12 col-sm-12 col-xs-12" style={{ zIndex: '9999', top: '100px' }}>
                    <SolarSystemLoading />
                  </div>
                </div>
                  :
                  <div className="row d-flex justify-content-center">
                    <input type="hidden" id="hdnIP" value="" />
                    <button id="btnGeos" type="button" onClick={this.bindBarcodeDetailss} style={{ display: "none" }}></button>

                    <>

                      <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                        <BarcodeScannerComponent
                          width={350}
                          height={350}
                          onUpdate={(err, result) => {
                            if (result) {
                              if (result.text !== "") {                               
                                this.state = {
                                  ApbarcodeText: result.text,
                                  Apflag: true,
                                  Aploader: true,
                                  Apiptext: "",
                                };
                                document.getElementById('btnGeos').click();
                              }
                            }
                            else {
                              this.state = {
                                ApbarcodeText: "",
                                Apflag: false,
                                Aploader: false,
                                Apiptext: "",
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

export default BarcodeManual;
