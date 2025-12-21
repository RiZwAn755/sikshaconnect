import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import gif from "/suspense.gif";
import Nav from "../utils/navbar.jsx";
import Footer from "../utils/footer.jsx";


const Layout = () => {
  return (
    <>
    <Nav/>
    <Suspense fallback={<img src={gif} alt="Loading..." style={{ display: "block", margin: "auto" }} />}>
      <Outlet />
    </Suspense>
    <Footer/>
    
    </>
  );
};

export default Layout;
