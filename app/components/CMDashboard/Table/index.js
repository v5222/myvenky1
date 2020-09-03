import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./CmdashboardTable.scss";

function CMdashboardTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Customer",
        accessor: "customer",
      },
      {
        Header: "Location",
        accessor: "locations",
      },
      {
        Header: "Total Invoices",
        accessor: "invoices",
      },

      {
        Header: "Delivered",
        accessor: "delivered",
      },
      {
        Header: "Not Delivered",
        accessor: "notdelivered",
      },
      {
        Header: "Intransit",
        accessor: "intransit",
      },
      {
        Header: "CWB",
        accessor: "cwb",
      },
      {
        Header: "Percentage",
        accessor: "percentage",
      },
    ],
    []
  );
  const data = [
    {
      customer: "Modicare",
      locations: 10,
      invoices: 212,
      delivered: 23,
      notdelivered: 11,
      intransit: 13,
      cwb: 60,
      percentage: "45%",
    },
    {
      customer: "Sony",
      locations: 24,
      invoices: 312,
      delivered: 89,
      notdelivered: 36,
      intransit: 13,
      cwb: 60,
      percentage: "68%",
    },
    {
      customer: "BOSCH",
      locations: 24,
      invoices: 312,
      delivered: 89,
      notdelivered: 36,
      intransit: 13,
      cwb: 60,
      percentage: "68%",
    },
    {
      customer: "JCH",
      locations: 24,
      invoices: 312,
      delivered: 89,
      notdelivered: 36,
      intransit: 13,
      cwb: 60,
      percentage: "68%",
    },
    {
      customer: "EFL",
      locations: 24,
      invoices: 312,
      delivered: 89,
      notdelivered: 36,
      intransit: 13,
      cwb: 60,
      percentage: "68%",
    },
    {
      customer: "WonderCheif",
      locations: 24,
      invoices: 312,
      delivered: 89,
      notdelivered: 36,
      intransit: 13,
      cwb: 60,
      percentage: "68%",
    },
  ];

  return (
    <div className="tvsit-cmdashboard_table">
      <Table columns={columns} data={data} />
    </div>
  );
}

//table
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(
    () => ({
      width: "100%",
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <tr
          {...row.getRowProps({
            style,
          })}
        >
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    },
    [prepareRow, rows]
  );

  // Render the UI for your table
  return (
    // <div {...getTableProps()} className="table">
    //   <div>
    //     {headerGroups.map((headerGroup) => (
    //       <div {...headerGroup.getHeaderGroupProps()} className="tr">
    //         {headerGroup.headers.map((column) => (
    //           <div {...column.getHeaderProps()} className="th">
    //             {column.render("Header")}
    //           </div>
    //         ))}
    //       </div>
    //     ))}
    //   </div>

    //   <div {...getTableBodyProps()}>
    //     <FixedSizeList
    //       height={400}
    //       itemCount={rows.length}
    //       itemSize={35}
    //       width={totalColumnsWidth}
    //     >
    //       {RenderRow}
    //     </FixedSizeList>
    //   </div>
    // </div>

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        <div>
          <FixedSizeList
            height={300}
            itemCount={rows.length}
            itemSize={50}
            width={totalColumnsWidth}
            className="fixedList"
          >
            {RenderRow}
          </FixedSizeList>
        </div>
        {/* {rows.map((row, i) => {
    prepareRow(row)
    return (
      <tr   {...row.getRowProps({
        style,
      })}>
        {row.cells.map(cell => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
    )
  })} */}
      </tbody>
    </table>
  );
}

export default CMdashboardTable;
