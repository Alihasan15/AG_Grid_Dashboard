import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Email = (params: ICellRendererParams<Employee>) => {
  return (
    <a href={`mailto:${params.value}`} className="email-link">
      {params.value}
    </a>
  )
}

export default Email
