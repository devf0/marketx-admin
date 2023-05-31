import "./ListUsers.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { userColumns, userRows } from "../../datatablesource";

const ListUsers = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable collumns={userColumns} rows={userRows} newTitle={"Add New User"} newUrl={"/users/new"}/>
      </div>
    </div>
)
}

export default ListUsers
