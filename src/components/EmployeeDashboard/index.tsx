import { useMemo, useState, useCallback, useRef } from "react"
import { employeeData, type Employee } from "./employeeData"
import type { ColDef, GridReadyEvent } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import { getColumnDefs } from "./service"

const EmployeeDashboard = () => {
  const gridRef = useRef<AgGridReact<Employee>>(null)
  const [rowData] = useState<Employee[]>(employeeData)
  const [quickFilterText, setQuickFilterText] = useState<string>("")

  const colDefs = useMemo<ColDef<Employee>[]>(() => getColumnDefs(), [])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
      enableCellChangeFlash: true,
      filterParams: {
        buttons: ["reset", "apply"],
      },
    }),
    []
  )

  const onGridReady = useCallback((params: GridReadyEvent<Employee>) => {
    params.api.sizeColumnsToFit()
  }, [])

  const onQuickFilterChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setQuickFilterText(value)
      if (gridRef.current) {
        gridRef.current.api?.setGridOption("quickFilterText", value)
      }
    },
    []
  )

  const onBtnExport = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api?.exportDataAsCsv({
        fileName: `employee-data-${new Date().toISOString().split("T")[0]}.csv`,
        allColumns: true,
      })
    }
  }, [])

  const onClearFilters = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api?.setFilterModel(null)
      setQuickFilterText("")
      gridRef.current.api?.setGridOption("quickFilterText", "")
    }
  }, [])

  const onAutoSizeAll = useCallback(() => {
    if (gridRef.current) {
      gridRef.current.api?.autoSizeAllColumns()
    }
  }, [])

  return (
    <div className="employee-dashboard">
      <div className="dashboard-controls">
        <div className="controls-left">
          <h2>Employee Data Grid</h2>
          <p className="data-info">Showing {rowData.length} employees</p>
        </div>

        <div className="controls-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Quick search across all columns..."
              value={quickFilterText}
              onChange={onQuickFilterChanged}
              className="quick-filter-input"
            />
          </div>

          <div className="action-buttons">
            <button onClick={onClearFilters} className="btn-primary">
              Clear Filters
            </button>
            <button onClick={onAutoSizeAll} className="btn-primary">
              Auto Size
            </button>
            <button onClick={onBtnExport} className="btn-primary">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="ag-theme-alpine dashboard-container">
        <AgGridReact<Employee>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          animateRows={true}
          enableCellTextSelection={true}
          ensureDomOrder={true}
          suppressDragLeaveHidesColumns={true}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          rowSelection="multiple"
          includeHiddenColumnsInQuickFilter={false}
          rowGroupPanelShow="always"
          pivotPanelShow="always"
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                  suppressRowGroups: false,
                  suppressValues: false,
                  suppressPivots: false,
                  suppressPivotMode: false,
                  suppressColumnFilter: false,
                  suppressColumnSelectAll: false,
                  suppressColumnExpandAll: false,
                },
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
            ],
            defaultToolPanel: "columns",
            hiddenByDefault: false,
          }}
          // Status bar
          statusBar={{
            statusPanels: [
              { statusPanel: "agTotalAndFilteredRowCountComponent" },
              { statusPanel: "agTotalRowCountComponent" },
              { statusPanel: "agFilteredRowCountComponent" },
              { statusPanel: "agSelectedRowCountComponent" },
              { statusPanel: "agAggregationComponent" },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default EmployeeDashboard
