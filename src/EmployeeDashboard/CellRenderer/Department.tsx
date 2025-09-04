import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Department = (params: ICellRendererParams<Employee>) => {
  const getDepartmentClass = (department: string): string => {
    const departmentClasses: Record<string, string> = {
      Engineering: "department-engineering",
      Marketing: "department-marketing",
      Sales: "department-sales",
      HR: "department-hr",
      Finance: "department-finance",
    }
    return departmentClasses[department] || "department-default"
  }

  const departmentClass = getDepartmentClass(params.value)

  return (
    <span className={`department-badge ${departmentClass}`}>
      {params.value}
    </span>
  )
}

export default Department
