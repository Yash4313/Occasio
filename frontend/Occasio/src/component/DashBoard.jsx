import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const DashBoard = () => {
  return (
    <div className="d-flex">
      <Sidebar /> 
      <div className="flex-grow-1 p-4">
        <Outlet /> {/* renders the selected sub-component */}
      </div>
    </div>
  )
}

export default DashBoard
