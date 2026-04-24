import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import gif from "/suspense.gif";
import Nav from "../utils/navbar.jsx";
import Footer from "../utils/footer.jsx";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Nav />
      <main className="flex-grow flex flex-col mt-16">
        <Suspense
          fallback={
            <div className="flex-grow flex items-center justify-center">
              <img src={gif} alt="Loading..." className="w-16 h-16 opacity-50" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
