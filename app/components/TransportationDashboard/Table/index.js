import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styles from "./TransportationDashboardTable.scss";
// import { apiURLCourier } from "../../containers/App/services";
// import Empty from "antd/lib/empty";

function TransportationDashboardTable({ tableData, column, updateMyData }) {
  return (
    <div className="tvsit-dwmdashboard_table">
      <div className="tabel_scroll">
        <Table columns={column} data={tableData} updateMyData={updateMyData} />
      </div>
    </div>
  );
}

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <>{id === 'CUSTOMER_NAME' ? <input value={value} onChange={onChange} onBlur={onBlur} /> : `${value ? value : ''}`}</>

  )
}

//table
function Table({ columns, data ,updateMyData}) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = {
    width: "100%",
    Cell: EditableCell
  }

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
      updateMyData
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
        <FixedSizeList
          height={300}
          itemCount={rows.length}
          itemSize={100}
          width={totalColumnsWidth}
          className={styles.FixedList}

        >
          {RenderRow}
        </FixedSizeList>

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

export default TransportationDashboardTable;
