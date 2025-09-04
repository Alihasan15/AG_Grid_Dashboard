import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Manager = (params: ICellRendererParams<Employee>) => {
  return (
    <span className={params.value ? "manager-text" : "no-manager"}>
      {params.value || "-"}
    </span>
  )
}

export default Manager
