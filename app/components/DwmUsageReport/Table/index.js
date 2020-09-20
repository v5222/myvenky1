import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./DwmusagereportTable.scss";
// import { apiURLCourier } from "../../containers/App/services";
// import Empty from "antd/lib/empty";


function DwmdashboardTable() {

  const columns = React.useMemo(
    () => [
      {
        Header: "Report Date",
        accessor: "ReportDate",
      },
      {
        Header: "User Name",
        accessor: "UserName",
      },
      {
        Header: "Activity Name",
        accessor: "ActivityName",
      },

      {
        Header: "Target Value",
        accessor: "TargetValue",
      },
      {
        Header: "Actual",
        accessor: "Actual",
      },
      {
        Header: "Comments",
        accessor: "Comments",
      } 
    ],
    []
  );

  const data = [
    {
      ReportDate: "07/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'TAT Adherence/Window Time Adherenece',
      TargetValue: 12345,
      Actual: 11245,
      Comments: 'More then capacity material Received'
      
    },
    {
      ReportDate: "10/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'GRN Error',
      TargetValue: 200,
      Actual: 11245,
      Comments: 'Vehicle Reporting Delay'
     

    },
    {
      ReportDate: "14/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'GRN Error',
      TargetValue: 185,
      Actual: 11245,
      Comments: 'Target Archieved'
      

    },
    {
      ReportDate: "19/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'GRN Error',
      TargetValue: 4,
      Actual: 11245,
      Comments: 'Target Archieved'
      
    },
    {
      ReportDate: "21/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'TAT Adherence/Window Time Adherenece',
      TargetValue: 200,
      Actual: 11245,
      Comments: 'More then capacity material Received'


    },
    {
      ReportDate: "24/06/2020",
      UserName: "Subash Aravind K",
      ActivityName: 'TAT Adherence/Window Time Adherenece',
      TargetValue: 89,
      Actual: 11245,
      Comments: 'Target Archieved'

    },
    
  ];

  return (
    <div className="tvsit-dwmdashboard_table">
    <div className='tabel_scroll'>
    <Table columns={columns} data={data} />
    </div>
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
    
    <table {...getTableProps()}>
      <thead >
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} >{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}  >
        <div >
          <FixedSizeList
            height={300}
            itemCount={rows.length}
            itemSize={50}
            width={totalColumnsWidth}
            className={styles.FixedList}
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

export default DwmdashboardTable;
