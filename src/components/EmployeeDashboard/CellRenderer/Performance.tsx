import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Performance = (params: ICellRendererParams<Employee>) => {
  const rating = params.value
  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))

  const getPerformanceClass = (rating: number): string => {
    if (rating >= 4.5) return "performance-excellent"
    if (rating >= 4.0) return "performance-good"
    return "performance-needs-improvement"
  }

  const performanceClass = getPerformanceClass(rating)

  return (
    <span className={performanceClass}>
      {stars} {rating}
    </span>
  )
}

export default Performance
