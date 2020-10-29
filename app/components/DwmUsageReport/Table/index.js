import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./DwmusagereportTable.scss";
import Spin from "antd/lib/spin";
import Empty from "antd/lib/empty";
import moment from "moment";
// import { apiURLCourier } from "../../containers/App/services";
// import Empty from "antd/lib/empty";

function DwmdashboardTable({ tableData, column, loading }) {
  return (
    <Spin spinning={loading}>
      <div className="tvsit-dwmdashboard_table">
        <div className="tabel_scroll">
          <Table columns={column} data={tableData} />
          {tableData.length < 1 ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "22px",
                color: "black",
                margin: "0 auto",
              }}
            >
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Spin>
  );
}

//table
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  let height = data.length < 1 ? 10 : 300;
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
          className={index % 2 ? "ListItemOdd" : "ListItemEven"}
        >
          {row.cells.map((cell) => {
            
              if (cell.column.Header === "Report Date") {
                let date = cell.row.values.reportdate;
                return (
                  <td {...cell.getCellProps()}>
                    {moment(date).format("YYYY-MM-DD")}
                  </td>
                );
              } else {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              }
            }
          )}
        </tr>
      );
    },
    [prepareRow, rows]
  );

  // Render the UI for your table
  return (
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
            height={height}
            itemCount={rows.length}
            itemSize={100}
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
