import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./CmdashboardTable.scss";

function CMdashboardTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Row Index",
        accessor: (row, i) => i,
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },

      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Visits",
        accessor: "visits",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Profile Progress",
        accessor: "progress",
      },
    ],
    []
  );
  const data = [
    {
      firstName: "hashim",
      lastName: "aslam",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "asdc",
      lastName: "asdcbd",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "klaspm",
      lastName: "twirybc",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "hashim",
      lastName: "aslam",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "asdc",
      lastName: "asdcbd",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "klaspm",
      lastName: "twirybc",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "hashim",
      lastName: "aslam",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "asdc",
      lastName: "asdcbd",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "klaspm",
      lastName: "twirybc",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "hashim",
      lastName: "aslam",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "asdc",
      lastName: "asdcbd",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
    },
    {
      firstName: "klaspm",
      lastName: "twirybc",
      age: 12,
      visits: 23,
      progress: 123,
      status: "single",
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
            itemSize={35}
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
