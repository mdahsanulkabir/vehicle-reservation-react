import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <div className="layout ">
      <header>
        <NavBar />
      </header>
        <hr />
      <main>
        <Outlet />
      </main>
      <footer>
        <hr />
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
