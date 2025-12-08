// import components to be shown on home page
// start / stop (timer)
// top friends
// chat bot

const Home = () => {
    return (
        <main className="min-h-screen bg-white text-black">
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="bg-black text-white rounded-lg p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl sm:text-4xl font-bold text-red-500">Welcome to SikshaConnect</h1>
                        <p className="mt-4 text-sm sm:text-base text-gray-200">Connect with classmates, send friend requests and share updates — all in a lightweight interface.</p>
                        <div className="mt-6 flex gap-3">
                            <a href="/signup" className="px-4 py-2 bg-red-500 text-black rounded-sm font-medium">Get Started</a>
                            <a href="/login" className="px-4 py-2 border border-white text-white rounded-sm">Sign in</a>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="w-full h-48 sm:h-56 bg-white text-black rounded-md flex items-center justify-center">
                            <span className="font-semibold">App preview / image</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;