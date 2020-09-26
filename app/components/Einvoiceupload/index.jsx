import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import $ from "jquery";

class InvoiceUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUploads = () => {
    this.setState({
      uploading: false,
      fileList: [],
    });
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();

    // fileList.forEach((file) => {
    //   formData.append("files[]", file);
    // });
    // console.log(fileList[0]);
    formData.append("file", fileList[0]);
    console.log(formData, "from formdata");
    this.setState({
      uploading: true,
    });
    const options = {
      method: "POST",
      processData: false,
      body: JSON.stringify({
        body: {
          type: "FTP",
          filename: fileList[0].name,
        },
      }),
    };
    // You can use any AJAX library you like
    fetch(
      "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        // this.setState({
        //   fileList: [],
        //   uploading: false,
        // });

        var fileURL = data.body.bodymsg.url;

        $.ajax({
          type: "PUT",
          url: fileURL,
          contentType: "application/vnd.ms-excel",
          processData: false,
          data: fileList[0],
          success: function(response) {
            console.log();
            fetch(
              "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing",
              {
                method: "POST",
                body: JSON.stringify({
                  body: {
                    type: "DATABASE",
                    username: "057566",
                    useremailid: "shanmugamr@tvslsl.com",
                  },
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                message.success("upload successfully.");
                $("#btnAlternate").click();
              });
          },
          error: function(error) {
            console.log();
          },
        });
      });
  };
  //   console.log(data.body.bodymsg.url, "from URL");
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/vnd.ms-excel");
  //   // myHeaders.append(
  //   //   "Content-Type",
  //   //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   // );
  //   fetch(data.body.bodymsg.url, {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: formData,
  //   })
  //     .then((data) => {
  //       fetch(
  //         "https://2bb6d5jv76.execute-api.ap-south-1.amazonaws.com/DEV/einvoicing",
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             body: {
  //               type: "DATABASE",
  //               username: "057566",
  //               useremailid: "shanmugamr@tvslsl.com",
  //             },
  //           }),
  //         }
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           message.success("upload successfully.");
  //           this.setState({
  //             uploading: false,
  //             fileList: [],
  //           });
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err, "from error");
  //       this.setState({
  //         uploading: false,
  //       });
  //       console.log(err);
  //       message.error("upload failed.");
  //     });
  // })
  // .catch((err) => {
  //   this.setState({
  //     uploading: false,
  //   });
  //   console.log(err);
  //   message.error("upload failed.");
  // });

  // reqwest({
  //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   method: 'post',
  //   processData: false,
  //   data: formData,
  //   success: () => {
  //     this.setState({
  //       fileList: [],
  //       uploading: false,
  //     });
  //     message.success('upload successfully.');
  //   },
  //   error: () => {
  //     this.setState({
  //       uploading: false,
  //     });
  //     message.error('upload failed.');
  //   },
  // });
  //};

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file);
        let ext = file.name.split(".");
        console.log(ext);
        const extarr = ["xls", "xlsx"];
        if (!extarr.includes(ext[1])) {
          message.error(`${file.name} is not a MS Excel file`);
        } else {
          this.setState((state) => ({
            fileList: [...state.fileList, file],
          }));
        }

        return false;
      },
      fileList,
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginLeft: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
        <Button
          id="btnAlternate"
          type="primary"
          onClick={this.handleUploads}
          style={{ display: "none" }}
        >
          {" "}
          Upload
        </Button>
      </div>
    );
  }
}

export default InvoiceUpload;
