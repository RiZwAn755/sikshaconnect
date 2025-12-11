const Home = () => {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-4 py-20">

        <div className="bg-black text-white rounded-2xl p-10 sm:p-16 shadow-[0_6px_25px_rgba(0,0,0,0.14)] flex flex-col sm:flex-row items-center gap-12">

         
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              Welcome to <span className="text-red-500">SikshaConnect</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed">
              A modern platform to connect with classmates, grow your network, and share updates —
              built with a clean and lightweight experience.
            </p>

           
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-all text-white font-medium rounded-xl shadow-md hover:shadow-lg active:scale-95"
              >
                Get Started
              </a>

              <a
                href="/login"
                className="px-6 py-3 border border-gray-300 hover:border-red-500 hover:text-red-500 transition-all text-white font-medium rounded-xl"
              >
                Sign in
              </a>
            </div>
          </div>

        
          <div className="flex-1 w-full">
            <div className="w-full h-56 sm:h-72 rounded-xl bg-white text-black shadow-[0_4px_18px_rgba(0,0,0,0.10)] flex items-center justify-center">
              <span className="font-semibold text-gray-700 text-lg">
                App Preview / Future Screenshot
              </span>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default Home;
