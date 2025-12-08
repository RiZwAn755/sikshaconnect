
const Footer = () => {
    return (
        <footer className="w-full bg-black text-white mt-12">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">© {new Date().getFullYear()} SikshaConnect</div>
                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:text-red-500">Privacy</a>
                    <a href="#" className="hover:text-red-500">Terms</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;