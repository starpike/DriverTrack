import Header from "./Header";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-5xl mx-auto bg-gray-100">
      <Header></Header>
      <div className="flex flex-col md:flex-row">
        <NavBar></NavBar>
        <main className="flex-1 bg-gray-100 p-4">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Layout;
