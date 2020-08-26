import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";

const PodTable = ({ data, loading, selected }) => {
  const [poddata, setPoddata] = useState([]);
  const [load, setLoading] = useState(loading);
  // useEffect(() => {
  //   setPoddata(data);
  //   console.log(data, "from table");
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [data]);

  const columns = [
    {
      title: "BOOKINGID",
      dataIndex: "bookingid",
      key: "bookingid",
      align: "left",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
      align: "left",
    },
    {
      title: "CUSTOMER TYPE",
      dataIndex: "customertype",
      key: "customertype",
      align: "left",
    },
    {
      title: "DIVISION CODE",
      dataIndex: "divisioncode",
      key: "divisioncode",
      align: "left",
    },
    ,
    {
      title: "TRIP ENDED",
      dataIndex: "tripstartedtimestamp",
      sorter: {
        compare: (a, b) => a.tripstartedtimestamp - b.tripstartedtimestamp,
        multiple: 1,
      },
      key: "tripstartedtimestamp",
      align: "left",
      render: (text, podverified, index) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    {
      title: "POD VERIFIED",
      dataIndex: "podverified",
      sorter: (a, b) => moment(a.podverified) - moment(b.podverified),
      sortDirections: ["descend", "ascend"],
      key: "podverified",
      align: "left",
      render: (text, podverified, index) => {
        if (text === null) {
          return "Not Updated";
        } else {
          return moment(text).format("DD-MM-YYYY");
        }
      },
    },
    {
      title: "ETA",
      dataIndex: "eta",
      key: "eta",
      align: "left",
      render: (text, eta, index) => {
        if (text === null) {
          return "Null";
        } else {
          return moment(text).format("DD-MM-YYYY");
        }
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("sorted called");
    // setLoading(true);
  };

  return (
    <div className="tvsit-podTable_wrapper">
      <Table
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        size="middle"
        tableLayout="auto"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        loading={loading}
        className="tvsit-pod_table"
        onHeaderCell={(column) => {
          return {
            onClick: () => {
              console.log(column);
            },
          };
        }}
      />
    </div>
  );
};

export default PodTable;
