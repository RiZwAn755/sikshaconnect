const Footer = () => {
    return (
        <footer className="w-full bg-white text-gray-600 border-t border-gray-200 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">© {new Date().getFullYear()} SikshaConnect. All rights reserved.</div>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;