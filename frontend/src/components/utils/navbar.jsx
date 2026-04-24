import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userid"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userid"));
    };

    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, []);

  // Filter links based on authentication
  const allLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/mytasks" },
    { name: "Friends", path: "/friends" },
    { name: "Profile", path: "/profile" },
  ];

  const links = isAuthenticated ? allLinks : [{ name: "Home", path: "/landing" }];

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md text-gray-800 shadow-sm border-b border-gray-200 z-50 h-16 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to={isAuthenticated ? "/" : "/landing"} className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/newlogo.png"
            alt="Siksha Connect Logo"
            className="h-12 w-auto object-contain mix-blend-multiply"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/friends' && location.pathname.includes('friend'));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-lg
                  ${isActive ? "text-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pl-4 ml-2 border-l border-gray-200">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/profile"
                className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Dashboard
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-4">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600"
            >
              Login
            </Link>
          ) : null}
          <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
