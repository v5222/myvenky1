import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./CmdashboardTable.scss";
import Empty from "antd/lib/empty";
import ViewDetails from "./ViewDetails";

function CMdashboardTable({ columnData, data, dates }) {
  const columns = React.useMemo(() => columnData, []);

  return (
    <div className="tvsit-cmdashboard_table">
      <Table columns={columnData} data={data} dates={dates} />
      {data.length < 1 ? (
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
  );
}

//table
function Table({ columns, data, dates }) {
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
            if (cell.column.Header === "Actions") {
              let customerValue = cell.row.values.consignor;
              return (
                <td {...cell.getCellProps()}>
                  <ViewDetails customer={customerValue} dates={dates} />
                </td>
              );
            } else {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            }
          })}
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
            itemSize={50}
            width={totalColumnsWidth}
            className={styles.FixedList}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </tbody>
    </table>
  );
}

export default CMdashboardTable;
