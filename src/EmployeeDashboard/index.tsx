import { useMemo } from "react"
import { employeeData, type Employee } from "./employeeData"
import type { ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { getColumnDefs } from "./service"

const EmployeeDashboard = () => {
  const rowData = useMemo<Employee[]>(() => employeeData, [])
  const colDefs = useMemo<ColDef<Employee>[]>(() => getColumnDefs(), [])

  return (
    <div className="ag-theme-alpine dashboard-container">
      <AgGridReact<Employee>
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
        }}
        pagination={true}
        paginationPageSize={15}
        animateRows={true}
        enableRangeSelection={true}
        suppressMenuHide={false}
        sideBar={{
          toolPanels: [
            {
              id: "columns",
              labelDefault: "Columns",
              labelKey: "columns",
              iconKey: "columns",
              toolPanel: "agColumnsToolPanel",
            },
            {
              id: "filters",
              labelDefault: "Filters",
              labelKey: "filters",
              iconKey: "filter",
              toolPanel: "agFiltersToolPanel",
            },
          ],
        }}
      />
    </div>
  )
}

export default EmployeeDashboard
