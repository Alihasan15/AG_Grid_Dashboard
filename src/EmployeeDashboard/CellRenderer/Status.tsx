import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Status = (params: ICellRendererParams<Employee>) => {
  return params.value ? (
    <span className="status-active">Active</span>
  ) : (
    <span className="status-inactive">Inactive</span>
  )
}
export default Status
