import type { ICellRendererParams } from "ag-grid-community"
import type { Employee } from "../employeeData"

const Skills = (params: ICellRendererParams<Employee>) => {
  const skills = params.value as string[]
  if (!Array.isArray(skills)) return <span></span>

  return (
    <div className="skills-container">
      {skills.map((skill, index) => (
        <span key={index} className="skill-badge">
          {skill}
        </span>
      ))}
    </div>
  )
}
export default Skills
