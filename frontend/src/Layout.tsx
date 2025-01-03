import { Outlet } from "react-router";
import Appbar from "./components/appbar/Appbar";

const Layout = () => {
  return (
    <>
      <div className="h-6">
        <Appbar />
      </div>
      <Outlet />
    </>
  );
}

export default Layout;  