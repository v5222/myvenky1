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
      dataIndex: "tripendtimestamp",
      sorter: {
        compare: (a, b) => a.tripendtimestamp - b.tripendtimestamp,
        multiple: 1,
      },
      key: "tripendtimestamp",
      align: "left",
      render: (text, podverified, index) => {
        if (text === null) {
          return "NA";
        } else {
          return moment(text).format("DD-MM-YYYY");
        }
      },
    },
    {
      title: "POD VERIFIED",
      dataIndex: "podverifiedtimestamp",
      sorter: (a, b) =>
        moment(a.podverifiedtimestamp) - moment(b.podverifiedtimestamp),
      sortDirections: ["descend", "ascend"],
      key: "podverifiedtimestamp",
      align: "left",
      render: (text, podverified, index) => {
        if (text === null) {
          return "NA";
        } else {
          return moment(text).format("DD-MM-YYYY");
        }
      },
    },
    {
      title: "ETA",
      dataIndex: selected !== "ETA" ? "eta" : "etatimestamp",
      key: selected !== "ETA" ? "eta" : "etatimestamp",
      align: "left",
      render: (text, eta, index) => {
        if (text === null) {
          return "NA";
        } else {
          return moment(text).format("DD-MM-YYYY");
        }
      },
    },
  ];
  const [columnData, setColumnData] = useState(columns);
  const vehicleData = {
    title: "VEHICLE NO",
    dataIndex: "vehicleno",
    key: "vehicleno",
    align: "left",
    render: (text, eta, index) => {
      if (text === null) {
        return "";
      } else {
        return text;
      }
    },
  };
  useEffect(() => {
    console.log(columnData, "coulmn data");
  }, [columnData]);
  useEffect(() => {
    if (selected === "ETA") {
      setColumnData((prev) => {
        let newData = [...prev, vehicleData];
        return newData.filter((i) => i !== undefined);
      });
    } else {
      setColumnData(columns);
    }
    // console.log(selected, "from selected hook");
  }, [selected]);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("sorted called");
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
        columns={columnData}
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
