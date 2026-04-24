import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-white to-blue-50/40 text-gray-900 font-sans flex flex-col relative overflow-hidden">
      
      {/* Decorative Micro Elements */}
      <div className="absolute top-24 left-12 w-48 h-48 opacity-[0.15] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-blue-100 rounded-full blur-xl opacity-60 pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col justify-center flex-1 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left: Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
              Connect. Collaborate. <br className="hidden sm:block" />
              <span className="relative inline-block text-blue-600 mt-2 sm:mt-0">
                Grow.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,25 100,5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
              A simple platform to manage tasks, connect with classmates, and stay productive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 items-center relative">
              <Link
                to="/signup"
                className="px-8 py-3.5 bg-gradient-to-b from-blue-500 to-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.03] text-white font-semibold rounded-xl shadow-md hover:shadow-lg text-base"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-8 py-3.5 bg-transparent hover:bg-gray-100 transition-all text-gray-600 hover:text-gray-900 font-semibold rounded-xl text-base"
              >
                Sign In
              </Link>

              {/* Curved arrow near CTA */}
              <div className="hidden lg:block absolute -right-12 top-4 opacity-40 text-gray-400 rotate-[15deg]">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M5 9c0 4 4 8 10 8m0 0l-3-3m3 3l-3 3" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Right: Illustration/Preview */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none mx-auto relative z-10">
            
            {/* Soft gradient blob behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-300/30 blur-[60px] rounded-full z-0 pointer-events-none mix-blend-multiply"></div>

            {/* Main Abstract Dashboard UI Preview */}
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 p-6 flex flex-col gap-4 transform rotate-2 hover:rotate-1 transition-transform duration-500 z-10">
              
              {/* Fake Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
                </div>
                <div className="h-6 w-16 bg-slate-50 rounded-full"></div>
              </div>

              {/* Fake Content Area */}
              <div className="flex gap-4 flex-1">
                {/* Fake Sidebar */}
                <div className="w-1/3 flex flex-col gap-3">
                  <div className="h-8 bg-gray-50 rounded-lg w-full"></div>
                  <div className="h-8 bg-gray-50 rounded-lg w-3/4"></div>
                  <div className="h-8 bg-gray-50 rounded-lg w-5/6"></div>
                </div>
                {/* Fake Main Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-24 bg-blue-50/50 rounded-xl border border-blue-100/30 w-full"></div>
                  <div className="flex gap-4">
                    <div className="h-20 bg-emerald-50/50 rounded-xl border border-emerald-100/30 flex-1"></div>
                    <div className="h-20 bg-orange-50/50 rounded-xl border border-orange-100/30 flex-1"></div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card 1 */}
              <div className="absolute -left-6 top-12 bg-white p-3 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center gap-3 transform -rotate-3 z-20 hover:scale-105 transition-transform">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</div>
                <div className="text-xs font-bold text-gray-700">Project finished</div>
              </div>

              {/* Floating Mini Card 2 */}
              <div className="absolute -right-5 bottom-12 bg-white p-3 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-center gap-3 transform rotate-3 z-20 hover:scale-105 transition-transform">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">M</div>
                <div>
                  <div className="text-xs font-bold text-gray-700">New message</div>
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mt-1"></div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative z-10 pb-8 pt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-center">
          <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-600">10,000+ students connected</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-gray-500 text-lg">Powerful features wrapped in a simple, intuitive interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-50/50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white text-blue-600 rounded-xl shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Task Management</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Manage tasks efficiently with clear deadlines and simple tracking tools.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50/50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Connect with Peers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Build your network, send friend requests, and study together.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50/50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white text-amber-500 rounded-xl shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Collab</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Work on group tasks and see updates instantly as your team progresses.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50/50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-white text-violet-600 rounded-xl shadow-sm flex items-center justify-center mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Clean Dashboard</h3>
              <p className="text-gray-500 text-sm leading-relaxed">A minimal, distraction-free environment designed to keep you focused.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">Three simple steps to boost your productivity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gray-200 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-md ring-8 ring-slate-50">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create account</h3>
              <p className="text-gray-500 text-sm max-w-xs">Sign up in seconds and set up your personal profile.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-md ring-8 ring-slate-50">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Add friends & tasks</h3>
              <p className="text-gray-500 text-sm max-w-xs">Connect with peers and organize your study schedule.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-md ring-8 ring-slate-50">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborate easily</h3>
              <p className="text-gray-500 text-sm max-w-xs">Track progress together and maintain your study streak.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
