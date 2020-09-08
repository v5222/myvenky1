import React, { useState, useEffect } from "react";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import CMdashboardTable from "../Table";
import { apiURLCourier } from "../../../containers/App/services";

function ViewDetails({ customer }) {
  const [visible, setVisible] = useState(false);
  const [delivered, setDelivered] = useState([]);
  const [undelivered, setUndelivered] = useState([]);
  const [intransit, setIntransit] = useState([]);
  const showModal = () => {
    setVisible(true);
  };
  const fetchData = (type) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let bodyoption = {
      method: "POST",
      body: JSON.stringify({
        body: {
          ecode: "KARSHA01",
          type: "FILTER-2",
          customer: customer,
          location: "All",
          status: type,
          filterdate: "DATE",
          sdate: "2020-06-02",
          edate: "2020-08-31",
        },
      }),
      headers: myHeaders,
      redirect: "follow",
    };
    console.log(bodyoption);
    fetch(apiURLCourier, bodyoption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { bodymsg } = data.body;
        const { statuscode } = data.body;
        if (statuscode == 200) {
          type === "DELIVERED"
            ? setDelivered(bodymsg)
            : type === "UNDELIVERED"
            ? setUndelivered(bodymsg)
            : setIntransit(bodymsg);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData("DELIVERED");
    fetchData("UNDELIVERED");
    fetchData("IN TRANSIT");
  }, [customer]);
  return (
    <div>
      <div className="tvsit_cmdashboard-viewDetails" onClick={showModal}>
        View Details
      </div>
      <Modal
        title={customer}
        visible={visible}
        width={1000}
        closable={true}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <div className="tvsit_cmdashboard-viewDetails-title">Delivered</div>
        <CMdashboardTable columnData={cloumns1} data={delivered} />
        <div className="tvsit_cmdashboard-viewDetails-title">UnDelivered</div>
        <CMdashboardTable columnData={cloumns1} data={undelivered} />
        <div className="tvsit_cmdashboard-viewDetails-title">In Transit</div>
        <CMdashboardTable columnData={cloumns1} data={intransit} />
      </Modal>
    </div>
  );
}

export default ViewDetails;
const cloumns1 = [
  {
    Header: "Invoice No",
    accessor: "invoiceno",
  },
  {
    Header: "Customer",
    accessor: "consignor",
  },
  {
    Header: "Location",
    accessor: "origin",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Consignee",
    accessor: "consignee",
  },
  {
    Header: "Date",
    accessor: "date",
  },
];
