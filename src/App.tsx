import "./App.css"
import EmployeeDashboard from "./components/EmployeeDashboard"
import DashboardHeader from "./components/DashboardHeader"

function App() {
  return (
    <div className="app-container">
      <DashboardHeader />
      <div className="dashboard-layout">
        <div className="main-content">
          <EmployeeDashboard />
        </div>
      </div>
    </div>
  )
}

export default App
