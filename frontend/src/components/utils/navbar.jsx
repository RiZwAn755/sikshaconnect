import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header className="w-full bg-black text-white shadow-[0_1px_8px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

       
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"  
            alt="Siksha Connect Logo"
            className="w-10 h-10 object-cover rounded-md"
          />
          <span className="font-semibold text-lg tracking-tight">
            Siksha Connect
          </span>
        </div>

        
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/friends"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Friends
          </Link>

          <Link
            to="/profile"
            className="hover:text-red-500 transition-colors duration-200"
          >
            Profile
          </Link>
        </nav>

      
        <div className="sm:hidden">
          <button className="py-2 px-3 bg-red-600 hover:bg-red-700 transition-all text-white font-medium rounded-lg shadow-sm active:scale-95">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
