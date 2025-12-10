import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <header className="w-full bg-black text-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-red-500" />
                    <span className="font-bold text-lg">Siksha Connect</span>
                </div>

                <nav className="hidden sm:flex gap-6 text-sm">
                    <Link to = '/' >Home</Link>
                    <Link to = '/friends' >Friends</Link>
                    <Link to = '/profile' >Profile</Link>
                </nav>

                <div className="sm:hidden">
                    <button className="py-2 px-3 bg-red-500 text-black rounded-sm">Menu</button>
                </div>
            </div>
        </header>
    )
}

export default Nav;