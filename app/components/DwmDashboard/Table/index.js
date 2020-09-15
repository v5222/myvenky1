import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./DwmdashboardTable.scss";
// import { apiURLCourier } from "../../containers/App/services";
// import Empty from "antd/lib/empty";


function DwmdashboardTable() {

  const columns = React.useMemo(
    () => [
      {
        Header: "Capability",
        accessor: "Capability",
      },
      {
        Header: "Project",
        accessor: "Project",
      },
      {
        Header: "User",
        accessor: "User",
      },

      {
        Header: "Today Target",
        accessor: "TodayTarget",
      },
      {
        Header: "Today Achievement",
        accessor: "TodayAchievement",
      },
      {
        Header: "Monthly Target",
        accessor: "MonthlyTarget",
      },
      {
        Header: "Monthly Achievement",
        accessor: "MonthlyAchievement",
      },
      
    ],
    []
  );

  const data = [
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 212,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,
      
    },
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 312,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,
     

    },
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 312,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,
      

    },
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 312,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,
      
    },
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 312,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,


    },
    {
      Capability: "AMW",
      Project: "ASHOK LEYLAND",
      User: 312,
      TodayTarget: 22,
      TodayAchievement: 4,
      MonthlyTarget: 4,
      MonthlyAchievement: 0,

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
